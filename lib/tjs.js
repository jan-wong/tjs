const fs = require('fs');
const filters = exports.filters = require('./filters');
const escap = require('./utils').escape;
const filtered = function (str) {
  return str.replace(/\s*/g, '').split('|').reduce((pre, next) => {
    return 'filters.' + next + '(' + pre + ')';
  })
}

const parse = function (str, options) {
  options = options || {};
  const open = options.open || exports.open || '<%';
  const close = options.close || exports.close || '%>';
  const jsReg = new RegExp(open + '\\s*([A-z0-9\\.\\_\\-\\=()\\s|\\{\\}\\,]+)\\s*' + close, 'g');
  const filterReg = /[^|]|[^|]/g;
  let match;
  let start = 0, end;
  let index, tpl, js;

  let buff = 'var buf = [];\n';
  buff += 'with(this || {}){\n';
  buff += 'buf.push(';

  while(match = jsReg.exec(str)) {
    index = match.index;
    tpl = match[0];
    js = match[1];

    let prefix = '', suffix = '', jsc;
    buff += '\'' + str.slice(start, index) + '\', ';
    start = index + tpl.length;
    switch(js[0]) {
      case '=':
        prefix = 'escap(';
        jsc = js.slice(1);
        suffix = '),'
        break;
      case '-':
        jsc = js.slice(1);
        break;
      default:
        prefix = ');\n';
        jsc = js.trim();
        suffix = '\nbuf.push(';
    }

    if (filterReg.test(js))
      jsc = 'filtered(' + jsc + ')';
    if (jsc.indexOf('include') === 0) {

    }

    buff += prefix;
    buff += jsc;
    buff += suffix;
  }

  buff += '\'' + str.slice(start) + '\' ,';
  buff += ');\n';
  buff +='}\n';
  buff += 'return buf.join(\'\')';

  return buff;
}

const compile = exports.compile = function (str, options) {
  str = JSON.stringify(str).slice(1, -1);
  let fn = new Function(parse(str));
  return function (data) {
    return fn.call(data);
  }
}

const render = exports.render = function (str, data, options) {
  return exports.compile(str,options)(data);
}

const renderFile = exports.renderFile = function(path, data, options) {
  const str = fs.readFileSync(path);
  return exports.render(str, data, options);
}