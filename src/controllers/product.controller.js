const axios = require("axios");
const searchApi = (query, limit = 4) =>
  `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}`;
const sellerApi = (id) => `https://api.mercadolibre.com/users/${id}`;
const itemApi = (id) => `https://api.mercadolibre.com/items/${id}`;
const itemDescriptionApi = (id) => `https://api.mercadolibre.com/items/${id}/description`;

const prodcutsCtrl = {};

prodcutsCtrl.searchProducts = async (req, res) => {
  const { q, limit } = req.query;

  try {
    const { data, status, message } = await axios.get(searchApi(q, limit));

    if (status === 200) {
      const { results, available_filters } = data;

      let info = {
        categories: [],
        items: [],
      };

      info.items = results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: parseInt(item.price),
            decimals: item.price % 1 !== 0 ? parseFloat((item.price % 1).toFixed(2)) : 0,
          },
          picture: `https://http2.mlstatic.com/D_NQ_NP_2X_${item.thumbnail_id}-F.jpg`,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          author: {
            name: item.seller.nickname,
            lastname: "",
          },
        };
      });

      available_filters.map((filter) => {
        if (filter.id === "category") {
          info.categories = filter.values.map((category) => category.name).slice(0, 10);
        }
      });

      res.status(status).json(info);
    } else {
      res.status(status).json({ message, status });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message, status: 500 });
  }
};

prodcutsCtrl.getProduct = async (req, res) => {
  const params = req.params;

  try {
    const description = await axios.get(itemDescriptionApi(params.id));
    const { data, status, message } = await axios.get(itemApi(params.id));

    if (status === 200) {
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
      let info = {
        author: {
          name: seller.data.nickname,
          lastname: "",
        },
        item: {
          id,
          title,
          price: {
            currency: currency_id,
            amount: parseInt(price),
            decimals: price % 1 !== 0 ? parseFloat((price % 1).toFixed(2)) : 0,
          },
          picture: `https://http2.mlstatic.com/D_NQ_NP_2X_${thumbnail_id}-F.jpg`,
          condition: condition,
          free_shipping: shipping.free_shipping,
          sold_quantity: initial_quantity,
          description: description.data.plain_text,
        },
      };

      res.status(status).json(info);
    } else {
      res.status(status).json({ message, status });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message, status: 500 });
  }
};

module.exports = prodcutsCtrl;
