const fs = require('fs-extra');
const path = require('path');
const markdown = require('markdown').markdown;

const kebabCase = require('./utils/kebabCase');

const postsPath = path.join(__dirname, './posts');
const outputPath = path.join(__dirname, './pages/posts');

// Clear output path to keep snyced with posts dir
fs.emptyDirSync(outputPath);

const postsData = [];


const postTemplate = (content) => `
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


const parsePostsFolder = (post) => {
  const folderPath = path.join(postsPath, post);

  const meta = JSON.parse(fs.readFileSync(path.join(folderPath, 'meta.json')));
  const postObj = {
    ...meta
  };

  const content = fs.readFileSync(path.join(folderPath, 'content.md')).toString();
  const contentMarkdown = markdown.toHTML(content);
  fs.writeFileSync(path.join(outputPath, kebabCase(postObj.title)) + '.vue', postTemplate(contentMarkdown));

  postObj['postUrl'] = kebabCase(postObj.title);

  fs.readdirSync(folderPath).forEach((file) => {
    // Add pdf file name to data. Move file to static docs folder
    if (file.match(/\.(jpg|png|jpeg|gif)$/)) {
      postObj['image'] = file;
      fs.copyFileSync(path.join(folderPath, file), path.join(__dirname, 'static/images', file));
    }

  });

  postsData.push(postObj);
}


fs.readdirSync(postsPath).forEach(parsePostsFolder);

fs.writeFileSync(path.join(__dirname, 'data', 'posts.json'), JSON.stringify(postsData));
