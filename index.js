const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');


const app = express();

const url = 'https://www.eater.com/maps/best-restaurants-tokyo-japan';
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const restaurants = [];
    $('.c-mapstack__card', html).each(function() {
      const title = $(this).find('h1').text();
      const shopURL = $(this).find('a').attr('href');
      restaurants.push({
        title,
        shopURL
      })
    })
    console.log(restaurants);
  }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
