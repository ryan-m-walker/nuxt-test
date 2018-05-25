const fs = require('fs-extra');
const path = require('path');

const postsPath = path.join(__dirname, './posts');
const outputPath = path.join(__dirname, './pages/posts');

// Clear output path to keep snyced with posts dir
fs.emptyDirSync(outputPath);

const postsData = [];

const parsePostsFolder = (post) => {
  const folderPath = path.join(postsPath, post);
  const postObj = {};

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
}


fs.readdirSync(postsPath).forEach((post) => {
  parsePostsFolder(post);
  fs.writeFileSync(path.join(__dirname, 'data', 'data.json'), JSON.stringify(postsData));
});
