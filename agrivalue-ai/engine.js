/* AgriValue AI — deterministic demo engine. All market inputs are simulated. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AgriEngine=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const crops={Onion:{price:20,direct:24,storage:27,export:30,process:13,waste:2,days:30,cap:400},Tomato:{price:16,direct:20,storage:22,export:25,process:10,waste:1.5,days:4,cap:400},Potato:{price:18,direct:22,storage:24,export:28,process:12,waste:2,days:21,cap:350},Banana:{price:25,direct:30,storage:33,export:38,process:16,waste:2,days:5,cap:300}};
 const num=(x,d=0)=>Number.isFinite(Number(x))?Number(x):d;
 function plan(input={}){
  const crop=crops[input.crop]||crops.Onion, kg=Math.max(0,Math.floor(num(input.kg))), cash=Math.max(0,num(input.cash)), shelf=Math.max(0,num(input.shelf,crop.days));
  const waste=Math.round(kg*Math.min(100,Math.max(0,num(input.waste)))/100), low=Math.min(kg-waste,Math.round(kg*Math.min(100,Math.max(0,num(input.low)))/100)), edible=kg-waste-low;
  const scenario=input.scenario||'normal', factor=scenario==='downturn'?.78:scenario==='high'?1.10:1;
  const routes=[]; const add=(key,label,q,price,cost,day)=>{if(q>0)routes.push({key,label,kg:q,price,cost,day,net:Math.round(q*(price-cost)*100)/100})};
  const now= Math.min(edible,Math.ceil(cash/crop.price));add('now','Sell today · local buyer',now,crop.price,0,0);
  let remaining=edible-now;
  const choices=[{key:'direct',label:'Direct commercial buyer',price:crop.direct,cost:2,cap:crop.cap,day:1,ok:shelf>=1},{key:'store',label:'Store and sell later',price:Math.round(crop.storage*factor*100)/100,cost:4,cap:300,day:7,ok:shelf>=7},{key:'export',label:'Export packhouse',price:crop.export,cost:5,cap:400,day:3,ok:!!input.exportEligible&&shelf>=3},{key:'local',label:'Local buyer · remaining',price:crop.price,cost:0,cap:kg,day:0,ok:true}];
  choices.filter(c=>c.ok&&c.price>c.cost).sort((a,b)=>(b.price-b.cost)-(a.price-a.cost)||a.day-b.day).forEach(c=>{let q=Math.min(remaining,c.cap);add(c.key,c.label,q,c.price,c.cost,c.day);remaining-=q});
  // Lower-grade but edible produce only goes to non-premium food processing; unsafe produce never enters food routes.
  if(low&&shelf>=1)add('process','Food processor · edible grade B',low,crop.process,1,1);else if(low)add('unsold','Hold / inspect grade B',low,0,0,0);
  const wasteCost=num(input.wasteCost,1);if(waste&&crop.waste>wasteCost)add('waste','Biogas / compost facility',waste,crop.waste,wasteCost,1);else if(waste)add('unsold','Waste · safe disposal / hold',waste,0,0,0);
  if(remaining)add('unsold','Unallocated · hold',remaining,0,0,0);
  const total=routes.reduce((a,r)=>a+r.net,0),today=routes.filter(r=>r.day===0&&r.key!=='unsold').reduce((a,r)=>a+r.net,0),baseline=edible*crop.price+low*Math.max(0,crop.process-1), uplift=baseline?100*(total-baseline)/baseline:0;
  // Illustrative +/- 10% price uncertainty only on the future storage route.
  const exposure=routes.filter(r=>r.key==='store').reduce((a,r)=>a+r.kg*r.price*.10,0);
  return {crop:input.crop||'Onion',kg,cash,waste,low,edible,routes,total,today,baseline,uplift,shortfall:Math.max(0,cash-today),range:[Math.round(total-exposure),Math.round(total+exposure)],allocated:routes.reduce((a,r)=>a+r.kg,0)};
 }
 return {crops,plan};
});
