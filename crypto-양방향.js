const crypto = require('crypto');

const cipher = crypto.createCipher('aes-256-cbc', 'key');
let result = cipher.update('암호', 'utf-8', 'base64');
result += cipher.final('base64');
console.log('얌호',result);

const decipher = crypto.createDecipher('aes-256-cbc', 'key');
let result2 = decipher.update(result, 'base64', 'utf-8');
result2 += decipher.final('utf-8');
console.log('평문', result2); 