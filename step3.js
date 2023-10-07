const fs = require('fs');
const axios = require('axios');

function cat(path, outputFilename) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err);
    } else {
      if (outputFilename) {
        fs.writeFile(outputFilename, data, (err) => {
          if (err) {
            console.error(`Couldn't write ${outputFilename}:`);
            console.error(err);
          } else {
            console.log(`${path} content written to ${outputFilename}`);
          }
        });
      } else {
        console.log(data);
      }
    }
  });
}

function webCat(url, outputFilename) {
  axios.get(url)
    .then((response) => {
      const content = response.data;
      if (outputFilename) {
        fs.writeFile(outputFilename, content, (err) => {
          if (err) {
            console.error(`Couldn't write ${outputFilename}:`);
            console.error(err);
          } else {
            console.log(`${url} content written to ${outputFilename}`);
          }
        });
      } else {
        console.log(content);
      }
    })
    .catch((error) => {
      console.error(`Error fetching ${url}:`);
      console.error(error);
    });
}

const input = process.argv[2];

if (!input) {
  console.error('Please provide a file path or URL as an argument.');
} else if (input === '--out') {
  const outputFilename = process.argv[3];
  const sourcePath = process.argv[4];
  
  if (!sourcePath) {
    console.error('Please provide a valid source path.');
  } else if (sourcePath.startsWith('http://') || sourcePath.startsWith('https://')) {
    webCat(sourcePath, outputFilename);
  } else {
    cat(sourcePath, outputFilename);
  }
} else if (input.startsWith('http://') || input.startsWith('https://')) {
  webCat(input);
} else {
  cat(input);
}
