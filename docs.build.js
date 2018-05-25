const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, './docs');

const docsData = [];


const parseDocFolder = (folder) => {
  const folderPath = path.join(docsPath, folder);
  const docObj = {};

  fs.readdirSync(folderPath).forEach((file) => {
    if (file.match(/\.pdf$/)) {
      docObj['file'] = file;
      fs.copyFileSync(path.join(folderPath, file), path.join(__dirname, 'static/docs', file));
    }

    if (file === 'meta.json') {
      const meta = require(path.join(folderPath, file));
      docObj['meta'] = meta;
    }

    if (file === 'article.md') {
      const article = fs.readFileSync(path.join(folderPath, file)).toString();
      docObj['article'] = article;
    }
  });

  docsData.push(docObj);
};

fs.readdirSync(docsPath).forEach((doc) => {
  parseDocFolder(doc);
  fs.writeFileSync(path.join(__dirname, 'data', 'data.json'), JSON.stringify(docsData));
});
