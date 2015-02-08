
var fs = require('fs');
var path = require('path');
var marked = require('marked');

var data = require('../package.json');
var readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
data.readme = marked(readme);

module.exports = data;

