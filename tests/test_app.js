// Юнит-тесты Калейда (node, plain .js с моками DOM/localStorage). Запуск: node tests/test_app.js
const fs = require("fs"), vm = require("vm");

// ---- моки ----
const storeMap = {};
const localStorage = { getItem:k=>storeMap[k]??null, setItem:(k,v)=>{storeMap[k]=String(v);}, removeItem:k=>{delete storeMap[k];} };
function makeEl(id){
  const el = { id, children:[], style:{}, dataset:{}, textContent:"", _innerHTML:"", value:"", disabled:false,
    classList:{ add(){}, remove(){}, toggle(){}, contains(){return false;} },
    appendChild(c){ this.children.push(c); return c; },
    querySelector(){ return makeEl("q"); }, querySelectorAll(){ return []; },
    addEventListener(){}, closest(){ return null; }, focus(){},
    set innerHTML(v){ this._innerHTML=v; }, get innerHTML(){ return this._innerHTML; } };
  return el;
}
const documentMock = { getElementById:id=>makeEl(id), createElement:()=>makeEl("new"),
  querySelectorAll:()=>[], addEventListener(){} };
let alerts=[];
const sandbox = { localStorage, document:documentMock, window:{scrollTo(){}}, navigator:{},
  alert:m=>alerts.push(m), setTimeout:(f)=>{}, console, JSON, Math, Object, Array, String, Number, Date, isNaN, RegExp };
sandbox.globalThis = sandbox;
const code = fs.readFileSync(__dirname + "/../app.js", "utf8")
  // экспорт для тестов: const-объявления не попадают в sandbox глобал через vm — пробрасываем их на globalThis
  + "\n;globalThis.__X={RECIPES,FOODS,SHOP,EXTRA_FOODS,state,genWeek,recipeHasForbidden,buildMeal,swapMeal,priceOf,storeSearchUrl,buildShoppingList,normFood,calcTargets,searchFoods,migrateState,balanceDayMacros,recomputeDayTot,sumNut,FAT_UP,PROT_UP};";
vm.createContext(sandbox);
try { vm.runInContext(code, sandbox, {filename:"app.js"}); } catch(e){ console.error("LOAD FAIL:", e.message); process.exit(1); }
Object.assign(sandbox, sandbox.__X);

let pass=0, fail=0;
function T(name, cond){ if(cond){pass++; console.log("ok  —", name);} else {fail++; console.log("FAIL—", name);} }

const S = sandbox;

// ---------- базовые данные ----------
T("FOODS содержит все ингредиенты рецептов",
  S.RECIPES.every(r=>r.s.every(([n])=>S.FOODS[n])));
T("у всех рецептов заданы portions>=1",
  S.RECIPES.every(r=>r.portions>=1));
T("SHOP покрывает все рецептурные продукты",
  Object.keys(S.FOODS).every(n=>S.SHOP[n]));
T("EXTRA_FOODS >= 40 позиций", Object.keys(S.EXTRA_FOODS).length>=40);

// ---------- генерация недели ----------
const targets = {kcal:2500};
S.state.forbidden=[];
const plan = S.genWeek(targets, 4, 12345);
T("неделя: 7 дней", plan.length===7);
T("неделя: 4 приёма в дне", plan.every(d=>d.meals.length===4));
T("день близко к цели ±12%", plan.every(d=>Math.abs(d.tot.k-2500)/2500 < 0.12));
T("каждому блюду проставлены portions", plan.every(d=>d.meals.every(m=>m.portions>=1)));

// ---------- замена блюда точечно ----------
const before = JSON.parse(JSON.stringify(plan));
S.state.plan = plan; S.state.params={meals:4}; S.state.targets=targets; S.state.seed=12345;
S.state.diary={}; S.state.swapN=0;
// заглушим save/renderPlan, которые дергает swapMeal
S.save = ()=>{}; S.renderPlan = ()=>{};
const swappedName = plan[0].meals[1].name;
S.swapMeal(0,1);
T("swap: заменился только обед Пн", plan[0].meals[1].name !== swappedName || plan[0].meals[1].ing.join()!==before[0].meals[1].ing.join());
T("swap: другие приёмы того же дня не тронуты",
  [0,2,3].every(mi=>JSON.stringify(plan[0].meals[mi])===JSON.stringify(before[0].meals[mi])));
T("swap: другие дни не тронуты",
  [1,2,3,4,5,6].every(di=>JSON.stringify(plan[di].meals)===JSON.stringify(before[di].meals)));
T("swap: калорийность приёма держится ±25%",
  Math.abs(plan[0].meals[1].k - before[0].meals[1].k)/before[0].meals[1].k < 0.25);
// повторный своп даёт другое блюдо или хотя бы не падает
const n2 = plan[0].meals[1].name;
S.swapMeal(0,1);
T("swap: повторный своп не ломает план", plan[0].meals.length===4 && Math.abs(plan[0].meals[1].k-before[0].meals[1].k)/before[0].meals[1].k < 0.3);

// ---------- аллергии фильтруют генератор (матчится ИНГРЕДИЕНТ, не название блюда) ----------
S.state.forbidden=["скумбрия"];
const mackarel = S.RECIPES.filter(r=>S.recipeHasForbidden(r,["скумбрия"])).map(r=>r.n);
T("фильтр: 'скумбрия' ловит бутерброды со скумбрией", mackarel.includes("Бутерброды с творожным сыром и рыбой"));
S.state.forbidden=["рыба"];
const pFish = S.genWeek({kcal:2500}, 4, 777);
const fishRecipes = new Set(S.RECIPES.filter(r=>S.recipeHasForbidden(r,["рыба"])).map(r=>r.n));
T("фильтр: ни одного блюда с рыбным ингредиентом в плане",
  pFish.every(d=>d.meals.every(m=>m.empty || !fishRecipes.has(m.name))));
// «рыба» должна ловить рыбные ингредиенты через алиасы (пользователь пишет по-человечески)
const fishIng = ["Минтай","Скумбрия","Кальмар"].every(f=>S.RECIPES.some(r=>r.s.some(([n])=>n===f)) && S.recipeHasForbidden({s:[[f,10]],tags:"x"},["рыба"]));
T("фильтр: 'рыба' матчит минтай/скумбрия/кальмар (алиасы)", fishIng);
S.state.forbidden=["сметана"];
const smetanaHits = S.RECIPES.filter(r=>S.recipeHasForbidden(r,["сметана"])).length;
T("фильтр: нормализация матчит 'Сметана (или йогурт)' по 'сметана'", smetanaHits>0);
S.state.forbidden=["сыр"];
const cheeseHits = S.RECIPES.filter(r=>S.recipeHasForbidden(r,["сыр"])).map(r=>r.n);
T("фильтр: 'сыр' ловит блюда со сыром-ингредиентом",
  cheeseHits.includes("Омлет из трёх яиц с сыром и овощами") && cheeseHits.includes("Бутерброд с сыром и яйцом"));
S.state.forbidden=["ихтиознесущее"]; // несуществующее
T("фильтр: неизвестное слово ничего не убирает",
  JSON.stringify(S.genWeek({kcal:2500},4,12345).map(d=>d.meals.map(m=>m.name))) ===
  JSON.stringify((()=>{S.state.forbidden=[]; return S.genWeek({kcal:2500},4,12345).map(d=>d.meals.map(m=>m.name));})()));


// ---------- стадия 3.3: подгонка БЖУ дня под норму ----------
const T33 = {kcal:2500, prot:150, fat:80, carbs:300};
S.state.forbidden=[];
// дефицит жиров: синтетический день из постных блюд (~1550 ккал, ~26 г жиров при норме 80);
// балансировка должна заметно подтянуть жиры и не раздуть калории выше потолка
(function(){
  S.state.forbidden=[];
  const mkMeal = (name, ing)=>{ const m={name, steps:[], ing, portions:1}; Object.assign(m, S.sumNut(ing)); return m; };
  const day = {day:"Пн", meals:[
    mkMeal("Грудка с гречкой",   [["Куриная грудка сырая",150],["Гречка сухая",70]]),
    mkMeal("Минтай с рисом",     [["Минтай",180],["Рис белый сухой",80]]),
    mkMeal("Грудка с картофелем",[["Куриная грудка сырая",150],["Картофель",250]]),
    mkMeal("Творог с яйцом",     [["Творог 5%",200],["Яйцо куриное",55]]),
  ]};
  S.recomputeDayTot(day);
  const fBefore = day.tot.f, kBefore = day.tot.k;
  const note = S.balanceDayMacros(day, T33, new Set());
  T("балансировка: жиры заметно выросли к норме", day.tot.f > fBefore + 8 && Math.abs(day.tot.f-T33.fat) < Math.abs(fBefore-T33.fat));
  T("балансировка: есть подсказка в note", typeof note === "string" && /жиры \+\d+ г/.test(note));
  T("балансировка: калории не раздуты выше потолка", day.tot.k <= Math.max(kBefore, T33.kcal*1.021));
})();
// переизбыток жиров: добавим масла сверх меры
(function(){
  const plan = S.genWeek(T33, 4, 777, null);
  const day = JSON.parse(JSON.stringify(plan[0]));
  const last = day.meals[day.meals.length-1];
  last.ing.push(["Масло сливочное", 60]);
  Object.assign(last, {k:last.k+734*0.6, f:last.f+82.5*0.6});
  S.recomputeDayTot(day);
  const fBefore = day.tot.f;
  if(fBefore - T33.fat > 12){
    const note = S.balanceDayMacros(day, T33, new Set());
    T("балансировка: избыток жиров срезан", day.tot.f < fBefore - 3);
  } else console.log("(избыток не достигнут в этом дне — пропускаю проверку срезки)");
})();
// калории дня не раздуваются выше +8% нормы
(function(){
  let worst = 0;
  for(const seed of [1,7,42,99,123]){
    const plan = S.genWeek(T33, 4, seed, T33);
    plan.forEach(d=>{ worst = Math.max(worst, Math.abs(d.tot.k-T33.kcal)/T33.kcal); });
  }
  T("после балансировки ккал дня в коридоре ±8%", worst <= 0.081);
})();
// аллергии соблюдаются и при балансировке: корректор не должен быть запрещён
// («молоко» ловит алиасом масло/сыр/творог — ни один корректор не проходит фильтр)
(function(){
  S.state.forbidden=["молоко"];
  // молочное (в т.ч. масло сливочное через алиас) не должно появиться/вырасти;
  // орехи/грудка/яйцо — не молочные, балансировка вправе их добавлять
  const forb = ["Масло сливочное","Сыр полутвёрдый","Творог 5%","Молоко 2.5%","Сметана (или йогурт)","Кефир 1%","Йогурт классический"];
  let addedForbidden = false;
  for(const seed of [1,7,42,99,123]){
    const base = S.genWeek(T33, 4, seed, null);   // план без балансировки
    const bal  = S.genWeek(T33, 4, seed, T33);    // с балансировкой
    for(let d=0;d<7;d++){
      const cnt = (plan,name)=>plan[d].meals.reduce((s,m)=>s+(m.empty?0:m.ing.filter(([n])=>n===name).reduce((a,[,g])=>a+g,0)),0);
      for(const name of forb)
        if(cnt(bal,name) > cnt(base,name)+0.001) addedForbidden = true;
    }
  }
  T("балансировка не добавляет запрещённое молокопродукты/корректоры", !addedForbidden);
  S.state.forbidden=[];
})();
// корректор приоритетно берётся из продуктов, уже лежащих в дне (не плодит новых покупок)
(function(){
  const plan = S.genWeek(T33, 4, 42, null);
  const day = JSON.parse(JSON.stringify(plan[6])); // Вс: часто нехватка жиров
  const namesBefore = new Set();
  day.meals.forEach(m=>{ if(!m.empty) m.ing.forEach(([n])=>namesBefore.add(n)); });
  S.balanceDayMacros(day, T33, new Set());
  const added = [];
  day.meals.forEach(m=>{ if(!m.empty) m.ing.forEach(([n])=>{ if(!namesBefore.has(n)) added.push(n); }); });
  T("балансировка не добавляет новых продуктов в покупки", added.length===0);
})();
// swapMeal после замены тоже балансирует (если день в коридоре ккал)
(function(){
  S.state.params={meals:4}; S.state.targets=T33; S.state.seed=12345; S.state.diary={}; S.state.swapN=0;
  S.state.plan = S.genWeek(T33, 4, 12345, T33);
  const okSwap = S.swapMeal(0,1);
  const d0 = S.state.plan[0];
  T("swap: план остался валидным после замены+балансировки",
    okSwap && d0.meals.length===4 && d0.tot.k>0 && isFinite(d0.tot.f));
})();

// ---------- покупки: цены ----------
S.state.forbidden=[];
S.state.plan = S.genWeek({kcal:2500},4,999);
const shop5 = S.buildShoppingList();
const ovs = shop5.find(x=>x.n==="Овсянка сухая");
if(ovs){
  const pr = S.priceOf({n:"Овсянка сухая"}, "5ka");
  T("цена Пятёрочка = SHOP[1]", pr.price===S.SHOP["Овсянка сухая"][1]);
  const prm = S.priceOf({n:"Овсянка сухая"}, "magnit");
  T("цена Магнит = SHOP[2]", prm.price===S.SHOP["Овсянка сухая"][2]);
} else console.log("(в этом плане нет овсянки — пропускаю ценовые проверки частично)");
T("ссылка Пятёрочка формата 5ka.ru/search/?text=", S.storeSearchUrl("5ka","Молоко 2.5%").startsWith("https://5ka.ru/search/?text="));
T("ссылка Магнит формата magnit.ru/search/?query=", S.storeSearchUrl("magnit","Молоко 2.5%").startsWith("https://magnit.ru/search/?query="));

// ---------- поиск продуктов в «+ Я поел» ----------
T("searchFoods('багет с маком') → пустой массив", S.searchFoods('багет с маком').length===0);
T("searchFoods('ябл') содержит 'Яблоки'", S.searchFoods('ябл').some(h=>h==='Яблоки'));
T("searchFoods('молок') не пустой", S.searchFoods('молок').length>0);
T("searchFoods('чай с сах') содержит 'Чай с сахаром'", S.searchFoods('чай с сах').some(h=>h==='Чай с сахаром'));

// ---------- миграция сохранений ----------
const oldState = {
  params: {meals: 4},
  seed: 123,
  plan: [
    {day: "Пн", meals: [{name: "Овсяная каша с бананом и мёдом", k: 500}, {name: "Борщ с говядиной и сметаной", k: 800}, {name: "Йогурт с яблоком и орехами", k: 300}, {name: "Куриная грудка с овощами на сковороде", k: 600}]},
    {day: "Вт", meals: [{name: "Омлет из трёх яиц с сыром и овощами", k: 500}, {name: "Плов с курицей", k: 800}, {name: "Творог с кефиром и бананом", k: 300}, {name: "Треска (минтай) под морковной шубой", k: 600}]},
    {day: "Ср", meals: [{name: "Творожная тарелка с ягодами и орехами", k: 500}, {name: "Щи из свежей капусты с говядиной", k: 800}, {name: "Бутерброд с сыром и яйцом", k: 300}, {name: "Тушёная капуста с курицей и грибами", k: 600}]},
    {day: "Чт", meals: [{name: "Гречневая каша с яйцом и маслом", k: 500}, {name: "Запечённая рыба с рисом и овощами", k: 800}, {name: "Фруктовая тарелка с мёдом", k: 300}, {name: "Творожная запеканка", k: 600}]},
    {day: "Пт", meals: [{name: "Сырники с йогуртом", k: 500}, {name: "Суп-пюре чечевичный", k: 800}, {name: "Орехи и сухофрукты", k: 300}, {name: "Омлет с овощами и курицей", k: 600}]},
    {day: "Сб", meals: [{name: "Каша «дружба» с изюмом", k: 500}, {name: "Индейка тушёная с макаронами", k: 800}, {name: "Йогурт с яблоком и орехами", k: 300}, {name: "Говядина тушёная с фасолью", k: 600}]},
    {day: "Вс", meals: [{name: "Овсяная каша с бананом и мёдом", k: 500}, {name: "Печёночные оладьи с картофельным пюре", k: 800}, {name: "Творог с кефиром и бананом", k: 300}, {name: "Рыбные котлеты с кабачком (в духовке)", k: 600}]},
  ],
  diary: "broken",
  view: undefined,
  day: undefined
};
const migrated = S.migrateState(JSON.parse(JSON.stringify(oldState)));
T("migrateState: проставила portions >= 1", migrated.plan.every(d=>d.meals.every(m=>m.portions>=1)));
T("migrateState: восстановила diary", typeof migrated.diary === "object");
T("migrateState: дефолты view/day", migrated.view === "setup" && migrated.day === 0);
T("migrateState: версия v=2", migrated.v === 2);

const brokenPlan = { plan: "мусор" };
const migratedBroken = S.migrateState(JSON.parse(JSON.stringify(brokenPlan)));
T("migrateState: битый план -> null", migratedBroken.plan === null);

const newState = { v: 2, plan: [], diary: {}, view: "plan", day: 1 };
const migratedNew = S.migrateState(JSON.parse(JSON.stringify(newState)));
T("migrateState: идемпотентно", JSON.stringify(migratedNew) === JSON.stringify(S.migrateState(JSON.parse(JSON.stringify(migratedNew)))));
process.exit(fail?1:0);
