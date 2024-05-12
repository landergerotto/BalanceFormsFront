import axios from 'axios';

// ta assim pq eu n consegui upar ;--;
// mas era pra ser um link do vercel
const baseURL = 'http://localhost:8080'; // Replace this with your API's base URL

const ApiService = {
  // Function to make a GET request
  get: async (url, config = {}) => {
    try {
      const response = await axios.get(`${baseURL}/${url}`, config);
      return response.data; // Return the data from the response
    } catch (error) {
      throw error; // Throw any errors that occur during the request
    }
  },

  // Function to make a POST request
  post: async (url, data, config = {}) => {
    try {
      const response = await axios.post(`${baseURL}/${url}`, data, config);
      return response.data; // Return the data from the response
    } catch (error) {
      throw error; // Throw any errors that occur during the request
    }
  },

  // Function to make a DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(`${baseURL}/${url}`, config);
      return response.data; // Return the data from the response
    } catch (error) {
      throw error; // Throw any errors that occur during the request
    }
  }
};

export default ApiService;
