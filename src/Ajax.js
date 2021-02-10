const API_HOST = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      let response = await fetch(API_HOST + '/api/deals');
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
