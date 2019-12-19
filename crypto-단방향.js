const crypto = require('crypto');
console.log(crypto.createHash('sha512').update('1234').digest('base64'));

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('비밀번호', salt, 101020, 64, 'sha512',(err,key) =>{
        console.timeEnd('암호화');
       console.log('비번',key.toString('base64'));
    })
})