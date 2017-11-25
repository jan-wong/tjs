const ejs = require('./ejs');
const tjs = require('./lib/tjs');
const escapeHtml = require('./ejs/utils').escape;
// var __stack = { lineno: 1, input: "<p>Today: <%= date %></p>\n<a href=\"<%= user.id %>\"><%= user.company %></a>", filename: undefined };
// let htl = escapeHtml((__stack.lineno=1,  123132 ));
// console.log(htl);

const tpl = 
`<p>Today: <%= date %></p>
<a href="<%= user.id %>"><%= user.company %></a>
<ul>
  <% posts.forEach(function(post, index) { %>
    <li><%= post %></li>
  <% }) %>
</ul>`;

// const str2 = ejs.render(tpl, {
//   date: 20150316,
//   user: {
//     id: 'A-000&001',
//     company: 'AT&T'
//   },
//   posts: [
//     'hell',
//     'fafd',
//     'dfa'
//   ]
// });
// console.log(str2);

const html = `<p>Today: <%= date %></p>
<a href="<%= user.id %>"><%= user.company %></a>
<ul>
  <% company.forEach(function(val, index) {%>
    <li><%= val %></li>
  <%})%>
</ul>
`;
const data = {
  date: 20150316,
  user: {
    id: 'A-000&001',
    company: 'AT&T'
  },
  company: ['google, facebook'],
}


// console.log(ejs.render(html,data));

const compile = tjs.compile(html);
console.log(compile(data));


// '<p>Today:','this.date','</p>\n','a href="','this.user.id','">','this.user.company','</a>'







