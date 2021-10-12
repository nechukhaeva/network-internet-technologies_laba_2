const axios = require("axios");

module.exports = axios.create({
  baseURL: "http://157.245.16.40:3000/", 
  headers: { 
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*',
  }
})