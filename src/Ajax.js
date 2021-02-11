const API_HOST = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(API_HOST + '/api/deals');
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDealDetails(dealId) {
    try {
      const response = await fetch(API_HOST + '/api/deals/' + dealId);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
  async fetchDealsSearchResults(searchTerm) {
    try {
      const response = await fetch(API_HOST + '/api/deals?searchTerm=' + searchTerm);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
