const axios = require("axios");
const { searchApi, sellerApi, itemApi, itemDescriptionApi } = require('../config')

const prodcutsCtrl = {
  searchProducts: async (req, res) => {
    const { q, limit } = req.query;

    try {
      const { data, status } = await axios.get(searchApi(q, limit));

      if (data) {
        const { results, available_filters } = data;

        let info = {
          categories: [],
          items: [],
        };

        info.items = results.map((item) => {
          const [name, lastname] = item.seller.nickname.split(/[\W_]+/)
          return {
            id: item.id ?? null,
            title: item.title ?? null,
            price: {
              currency: item.currency_id ?? null,
              amount: parseInt(item.price),
              decimals: item.price % 1 !== 0 ? parseFloat((item.price % 1).toFixed(2)) : 0,
            },
            picture: `https://http2.mlstatic.com/D_NQ_NP_2X_${item.thumbnail_id}-F.jpg`,
            condition: item.condition ?? null,
            free_shipping: item.shipping.free_shipping ?? null,
            author: {
              name: name ?? null,
              lastname: lastname ?? null,
            },
          };
        });

        const categoryFilter = available_filters.find((filter) => filter.id === "category");

        if (categoryFilter) {
          info.categories = categoryFilter.values.map((category) => category.name);
        }

        res.status(status).json(info);
      }
    } catch (err) {
      const { status } = err.data
      res.status(status).json({ msg: err.message, status });
    }
  },

  getProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const description = await axios.get(itemDescriptionApi(id));
      const { data, status } = await axios.get(itemApi(id));

      if (data) {
        const {
          id,
          title,
          price,
          currency_id,
          thumbnail_id,
          condition,
          shipping,
          seller_id,
          initial_quantity,
        } = data;

        const seller = await axios.get(sellerApi(seller_id));
        const [name, lastname] = seller.data.nickname.split(/[\W_]+/)

        let info = {
          author: {
            name: name ?? null,
            lastname: lastname ?? null,
          },
          item: {
            id: id ?? null,
            title: title ?? null,
            price: {
              currency: currency_id ?? null,
              amount: isNaN(parseInt(price)) ? null : parseInt(price),
              decimals: price % 1 !== 0 ? parseFloat((price % 1).toFixed(2)) : 0,
            },
            picture: `https://http2.mlstatic.com/D_NQ_NP_2X_${thumbnail_id}-F.jpg`,
            condition: condition ?? null,
            free_shipping: shipping.free_shipping ?? null,
            sold_quantity: initial_quantity ?? null,
            description: description?.data?.plain_text ?? null,
          },
        };

        res.status(status).json(info);
      }
    } catch (err) {
      const { status, message } = err.response.data
      res.status(status).json({ msg: message, status });
    }
  }
};

module.exports = prodcutsCtrl;
