const fs = require('fs-extra');
const path = require('path');
const markdown = require('markdown').markdown;

const kebabCase = require('./utils/kebabCase');

const docsPath = path.join(__dirname, './docs');
const articlesPath = path.join(__dirname, './pages/document');

fs.emptyDirSync(path.join(__dirname, 'static/docs'));
fs.emptyDirSync(articlesPath);

const docsData = [];

console.log('[docs] Building docs');

const articleTemplate = (content) => `
  <template>
    <section>
    ${ content }
    </section>
  </template>

  <style scoped>
    h2 {
      color: teal;
    }
  </style>
`;

const parseDocFolder = (folder) => {
  const folderPath = path.join(docsPath, folder);

  const meta = JSON.parse(fs.readFileSync(path.join(folderPath, 'meta.json')));
  const docObj = {
    ...meta
  };

  fs.readdirSync(folderPath).forEach((file) => {
    // Add pdf file name to data. Move file to static docs folder
    if (file.match(/\.pdf$/)) {
      docObj['file'] = file;
      fs.copyFileSync(path.join(folderPath, file), path.join(__dirname, 'static/docs', file));
    }

  });

  if (fs.existsSync(path.join(folderPath, 'article.md'))) {
    docObj['articleUrl'] = kebabCase(docObj.title);
    fs.writeFileSync(path.join(articlesPath, docObj.articleUrl) + '.vue', articleTemplate(docObj.article));
  }

  docsData.push(docObj);
};

fs.readdirSync(docsPath).forEach(parseDocFolder);
fs.writeFileSync(path.join(__dirname, 'data', 'docs.json'), JSON.stringify(docsData));

console.log('[docs] Finished building docs');
