const ejs = require('../ejs');
const tjs = require('../lib/tjs');
const path = require('path');
const log = console.log;

const data = {
  page: {
    header: 'hello header',
    content: 'hello content',
    footer: 'hello footer',
  }
}

// ejs.renderFile(path.resolve(__dirname, './index.tjs'), function (err, str) {
// console.log(str)
// }); 
const html = tjs.render(`<div class="content">
  <%= page.content %>
</div>`, {locals: data})
log(html)