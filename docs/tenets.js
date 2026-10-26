// Reference decoder for the Four Tenets binary encoding. MIT (c) 2026 Joshua Almeida
const T=['cost','bridge','work','theory'],L=['none','low','high','over limit'];
function encode4(s){return T.map(t=>s[t]?'1':'0').join('')}
function decode4(c){c=String(c).padStart(4,'0');const r={};T.forEach((t,i)=>r[t]=c[i]==='1'?'dark':'lit');r.status=c==='0000'?'AI online':c==='1111'?'fully dark':'dark: '+T.filter((t,i)=>c[i]==='1').join(', ');return r}
function decode8(b){b=typeof b==='string'?parseInt(b.replace(/^0x/,''),b.startsWith('0x')?16:2):b;const r={};T.forEach((t,i)=>r[t]=L[(b>>(6-2*i))&3]);r.code4=T.map((t,i)=>((b>>(6-2*i))&3)>=2?'1':'0').join('');return r}
if(typeof module!=='undefined')module.exports={encode4,decode4,decode8};
