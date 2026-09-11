export function getSub(){
  try{ return JSON.parse(localStorage.getItem('sub')||'null') || {plan:'free', count:0} }catch{ return {plan:'free',count:0}}
}
export function setSub(plan){ localStorage.setItem('sub', JSON.stringify({plan, count: getSub().count, since: new Date().toISOString()})) }
export function incCount(){
  const s=getSub(); s.count=(s.count||0)+1; localStorage.setItem('sub', JSON.stringify(s)); return s
}
export function canUseFree(){ const s=getSub(); return s.plan!=='free' || (s.count||0) < 5 }
