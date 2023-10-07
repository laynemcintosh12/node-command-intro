const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

function webCat(url) {
  axios.get(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(`Error fetching ${url}:`);
      console.error(error);
    });
}

const input = process.argv[2];
if (!input) {
  console.error('Please provide a file path or URL as an argument.');
} else if (input.startsWith('http://') || input.startsWith('https://')) {
  webCat(input);
} else {
  cat(input);
}
