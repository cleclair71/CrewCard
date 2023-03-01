const axios = require('axios');

const api = {
  async getUser(username) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching GitHub data for ${username}: ${error.message}`);
    }
  }
};

module.exports = api;