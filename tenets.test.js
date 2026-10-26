const a=require('assert'),{encode4,decode4,decode8}=require('./tenets');
a.strictEqual(decode4('0000').status,'AI online');a.strictEqual(decode4('1111').status,'fully dark');
a.strictEqual(decode4('1000').cost,'dark');a.strictEqual(decode4('0001').theory,'dark');
a.strictEqual(encode4({cost:1}),'1000');
const d=decode8(0x12);a.strictEqual(d.bridge,'low');a.strictEqual(d.theory,'high');a.strictEqual(d.code4,'0001');
a.strictEqual(decode8(0xff).code4,'1111');console.log('all tests lit');
