// Reference decoder for the Four Tenets binary encoding. MIT (c) 2026 Joshua Almeida
const T=['cost','bridge','work','theory'],L=['none','low','high','over limit'];
function encode4(s){return T.map(t=>s[t]?'1':'0').join('')}
function decode4(c){c=String(c).padStart(4,'0');const r={};T.forEach((t,i)=>r[t]=c[i]==='1'?'dark':'lit');r.status=c==='0000'?'AI online':c==='1111'?'fully dark':'dark: '+T.filter((t,i)=>c[i]==='1').join(', ');return r}
function decode8(b){b=typeof b==='string'?parseInt(b.replace(/^0x/,''),b.startsWith('0x')?16:2):b;const r={};T.forEach((t,i)=>r[t]=L[(b>>(6-2*i))&3]);r.code4=T.map((t,i)=>((b>>(6-2*i))&3)>=2?'1':'0').join('');return r}
if(typeof module!=='undefined')module.exports={encode4,decode4,decode8};
// Meter (parity with Python tenets_meter): levels 00 none, 01 within limit, 10 over, 11 over 2x.
function level(v,l){if(!v)return 0;if(l==null||v<=l)return 1;return v<=2*l?2:3}
class Meter{constructor(limits={}){this.limits=Object.assign({cost:1,tokens:null,bridge:3,work:10,theory:0},limits);this.reset()}
reset(){this.usd=0;this.tokens=0;this.hops=0;this.steps=0;this.unverified=0;this.verified=0}
cost(usd=0,tokens=0){this.usd+=usd;this.tokens+=tokens}hop(n=1){this.hops+=n}step(n=1){this.steps+=n}claim(verified=false){verified?this.verified++:this.unverified++}
levels(){const u=this.unverified,t=this.limits.theory;return{cost:Math.max(level(this.usd,this.limits.cost),level(this.tokens,this.limits.tokens)),bridge:level(this.hops,this.limits.bridge),work:level(this.steps,this.limits.work),theory:!u?0:u<=t?1:u>2*Math.max(t,1)?3:2}}
get byte(){const l=this.levels();return T.reduce((b,t)=>(b<<2)|l[t],0)}get code(){return decode8(this.byte).code4}get status(){return decode4(this.code).status}}
if(typeof module!=='undefined')Object.assign(module.exports,{Meter,level});
