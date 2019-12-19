const url = require('url');

const myurl = new url.URL ('http://ssl.yes24.com/Cart/Cart?PCode=014')
console.log(myurl.searchParams.get('PCode'))
console.log(myurl.searchParams.has('PCode'))
console.log(myurl.searchParams.keys(''))
console.log(myurl.searchParams.values(''))
console.log(myurl.searchParams.append('filter', '30'))
console.log(myurl.searchParams.getAll('filter'))
console.log(myurl.searchParams.set('filter', '30'))
console.log(myurl.searchParams.getAll('filter'))
console.log(myurl.searchParams.delete('PCode'))
console.log(myurl.searchParams.toString())

const querystring = require('querystring');
const aa = url.parse('http://ssl.yes24.com/Cart/Cart?PCode=014');
const bb = querystring.parse(aa.query);
const cc = querystring.stringify(aa);
console.log(cc)