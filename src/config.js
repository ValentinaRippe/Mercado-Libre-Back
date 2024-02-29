const api = 'https://api.mercadolibre.com/'

module.exports = {
    searchApi: (query, limit = 4) =>
        `${api}sites/MLA/search?q=${query}&limit=${limit}`,
    sellerApi: (id) => `${api}users/${id}`,
    itemApi: (id) => `${api}items/${id}`,
    itemDescriptionApi: (id) => `${api}items/${id}/description`,
    PORT: 4000
}