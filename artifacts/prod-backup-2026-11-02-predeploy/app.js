// ============ Калейд: калории, БЖУ, рацион на неделю ============
// База продуктов (на 100 г): kcal, protein, fat, carb
const FOODS = {
  "Овсянка сухая":       [379, 12.0, 6.5, 66.9],
  "Гречка сухая":        [343, 12.6, 3.3, 62.1],
  "Рис белый сухой":     [349,  6.7, 0.7, 78.9],
  "Макароны сухие":      [344, 10.4, 1.4, 71.5],
  "Хлеб ржаной":         [201,  6.6, 1.2, 33.4],
  "Картофель":           [ 82,  2.0, 0.4, 18.1],
  "Куриная грудка сырая":[120, 23.0, 1.5,  0.0],
  "Филе индейки":        [130, 24.0, 2.0,  0.0],
  "Говядина постная":    [187, 18.9, 9.9,  0.0],
  "Минтай":              [ 79, 15.9, 0.9,  0.0],
  "Скумбрия":            [181, 18.0, 13.0, 0.0],
  "Кальмар":             [ 75, 18.0, 0.3,  0.0],
  "Яйцо куриное":        [157, 12.7,11.5,  0.7],
  "Творог 5%":           [121, 17.2, 5.0,  1.8],
  "Йогурт классический": [ 60,  3.5, 2.0,  6.0],
  "Кефир 1%":            [ 40,  3.0, 1.0,  4.0],
  "Молоко 2.5%":         [ 52,  2.9, 2.5,  4.7],
  "Сыр полутвёрдый":     [360, 24.0,28.0,  0.3],
  "Масло сливочное":     [734,  0.5,82.5,  0.6],
  "Масло растительное":  [899,  0.0,99.9,  0.0],
  "Орехи грецкие":       [654, 15.2,65.2, 13.7],
  "Чечевица сухая":      [340, 24.0, 1.1, 60.1],
  "Фасоль сухая":        [310, 21.0, 2.0, 47.0],
  "Горошек зелёный":     [ 79,  5.0, 0.2, 13.8],
  "Капуста":             [ 25,  1.8, 0.1,  5.4],
  "Морковь":             [ 41,  0.9, 0.2,  9.6],
  "Свёкла":              [ 43,  1.5, 0.1,  9.0],
  "Лук репчатый":        [ 40,  1.4, 0.0, 10.4],
  "Огурцы":              [ 15,  0.8, 0.1,  3.6],
  "Помидоры":            [ 20,  0.8, 0.2,  3.9],
  "Перец болгарский":    [ 27,  1.3, 0.0,  5.7],
  "Зелень (укроп, петрушка)": [36, 2.6, 0.4, 6.3],
  "Яблоки":              [ 47,  0.4, 0.4,  9.8],
  "Банан":               [ 96,  1.5, 0.5, 21.8],
  "Апельсин":            [ 43,  0.9, 0.2,  8.1],
  "Ягоды замороженные":  [ 50,  0.7, 0.4, 10.5],
  "Изюм":                [264,  2.9, 0.6, 66.0],
  "Мёд":                 [329,  0.8, 0.0, 81.5],
  "Сахар":               [387,  0.0, 0.0, 99.7],
  "Томатная паста":      [102,  5.6, 1.5, 21.4],
  "Горький шоколад":     [539,  6.2,35.4, 48.2],
};

// ---------- рецепты: порция => список [продукт, граммы] + шаги ----------
// meal-теги: b(завтрак) l(обед) d(ужин) s(полдник/перекус); base — доля дня; scale — множитель размера порции
const RECIPES = [
 // ===== ЗАВТРАКИ =====
 {n:"Овсяная каша с бананом и мёдом", tags:"b", base:.26, s:[["Овсянка сухая",70],["Молоко 2.5%",200],["Банан",100],["Мёд",10]],
  steps:["Залейте овсянку молоком, варите 5–7 минут на слабом огне.","Добавьте нарезанный банан и мёд, перемешайте."]},
 {n:"Омлет из трёх яиц с сыром и овощами", tags:"b", base:.26, s:[["Яйцо куриное",150],["Сыр полутвёрдый",30],["Помидоры",100],["Масло растительное",5]],
  steps:["Взбейте яйца с щепоткой соли.","Обжарьте помидоры 2 минуты, залейте яйцами.","Посыпьте тертым сыром, накройте крышкой на 3 минуты."]},
 {n:"Творожная тарелка с ягодами и орехами", tags:"b", base:.26, s:[["Творог 5%",200],["Ягоды замороженные",100],["Орехи грецкие",15],["Мёд",10]],
  steps:["Ягоды разморозьте (можно в микроволновке 1 минуту).","Смешайте творог с ягодами, сверху орехи и мёд."]},
 {n:"Гречневая каша с яйцом и маслом", tags:"b", base:.26, s:[["Гречка сухая",70],["Яйцо куриное",55],["Масло сливочное",10]],
  steps:["Гречку залейте водой 1:2, варите 15 минут под крышкой.","Яйцо сварите вкрутую (10 минут), нарежьте поверх каши.","Добавьте сливочное масло."]},
 {n:"Бутерброды с творожным сыром и рыбой", tags:"b", base:.26, s:[["Хлеб ржаной",70],["Творог 5%",80],["Скумбрия",60],["Огурцы",50]],
  steps:["Творог посолите, разминайте вилкой — это намазка.","Намажьте хлеб, выложите огурцы и кусочки скумбрии."]},
 {n:"Сырники с йогуртом", tags:"b", base:.26, s:[["Творог 5%",200],["Яйцо куриное",50],["Рис белый сухой",30],["Масло растительное",8],["Йогурт классический",100]],
  steps:["Смешайте творог, яйцо и рисовую муку (смолотый рис).","Сформируйте шайбы, обжарьте по 3 минуты с каждой стороны.","Подавайте с йогуртом."]},
 {n:"Каша «дружба» с изюмом", tags:"b", base:.26, s:[["Овсянка сухая",40],["Гречка сухая",35],["Молоко 2.5%",200],["Изюм",20],["Масло сливочное",7]],
  steps:["Крупы залейте молоком, варите 15 минут.","Изюм запарьте кипятком на 5 минут, добавьте в кашу со сливочным маслом."]},

 // ===== ОБЕДЫ =====
 {n:"Борщ с говядиной и сметаной", tags:"l", base:.40, s:[["Говядина постная",120],["Свёкла",100],["Капуста",100],["Морковь",60],["Лук репчатый",40],["Картофель",150],["Томатная паста",20],["Масло растительное",8],["Хлеб ржаной",30]],
  steps:["Сварите бульон из говядины ~1 часа, мясо достаньте и нарежьте.","Обжарьте тёртую свёклу с морковью и луком 7 минут, добавьте томатную пасту.","В бульон положьте картофель кубиками и капусту, варите 15 минут.","Добавьте зажарку, варите ещё 10 минут. Настой 20 мин. Со сметаной или без."]},
 {n:"Куриная грудка с гречкой и салатом", tags:"l", base:.40, s:[["Куриная грудка сырая",150],["Гречка сухая",70],["Огурцы",100],["Помидоры",100],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Грудку посолите, запекайте в фольге 25 минут при 200°C (или тушите 20 мин).","Гречку варите 15 минут.","Огурцы и помидоры нарежьте, заправьте маслом, посыпьте зеленью."]},
 {n:"Плов с курицей", tags:"l", base:.40, s:[["Куриная грудка сырая",130],["Рис белый сухой",90],["Морковь",80],["Лук репчатый",50],["Масло растительное",10],["Чеснок (по желанию)",5]],
  steps:["Обжарьте лук и морковь в казане 7 минут, добавьте курицу — ещё 5 минут.","Засыпьте рис, залейте кипятком 1:1.5, посолите.","Томите под крышкой 25 минут на слабом огне, не перемешивая."]},
 {n:"Щи из свежей капусты с говядиной", tags:"l", base:.40, s:[["Говядина постная",110],["Капуста",150],["Картофель",150],["Морковь",50],["Лук репчатый",40],["Томатная паста",15],["Масло растительное",7],["Хлеб ржаной",30]],
  steps:["Сварите бульон из говядины 1 час.","Добавьте картофель, через 10 минут — капусту.","Зажарьте лук с морковью и томатом, отправьте в щи, варите 10 минут."]},
 {n:"Запечённая рыба с рисом и овощами", tags:"l", base:.40, s:[["Минтай",180],["Рис белый сухой",80],["Перец болгарский",100],["Морковь",60],["Масло растительное",8]],
  steps:["Рис варите 15 минут.","Рыбу посолите, вокругlayout овощи дольками, сбрызните маслом.","Запекайте 25 минут при 190°C."]},
 {n:"Суп-пюре чечевичный", tags:"l", base:.40, s:[["Чечевица сухая",80],["Морковь",60],["Лук репчатый",40],["Картофель",100],["Масло растительное",8],["Хлеб ржаной",40]],
  steps:["Обжарьте лук и морковь 5 минут.","Залейте чечевицу 700 мл воды, добавьте овощи и картофель, варите 25 минут.","Пюрируйте блендером. Подавайте с хлебом."]},
 {n:"Индейка тушёная с макаронами", tags:"l", base:.40, s:[["Филе индейки",150],["Макароны сухие",80],["Томатная паста",25],["Лук репчатый",40],["Масло растительное",8],["Сыр полутвёрдый",20]],
  steps:["Макароны отварите по инструкции (7–9 минут).","Индейку кубиками обжарьте с луком, добавьте пасту и 200 мл воды, тушите 15 минут.","Смешайте с макаронами, посыпьте сыром."]},
 {n:"Печёночные оладьи с картофельным пюре", tags:"l", base:.40, s:[["Куриная печень (или говяд.)",150],["Картофель",250],["Лук репчатый",60],["Молоко 2.5%",50],["Масло сливочное",10],["Масло растительное",8]],
  steps:["Печень прокрутите через мясорубку с луком, добавьте соль и перец.","Жарьте ложкой как оладьи по 3 минуты с каждой стороны.","Картофель отварите, разомните с молоком и сливочным маслом."]},

 // ===== УЖИНЫ =====
 {n:"Куриная грудка с овощами на сковороде", tags:"d", base:.34, s:[["Куриная грудка сырая",160],["Перец болгарский",100],["Капуста",120],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Грудку нарежьте полосками, обжарьте на сильном огне 6 минут.","Добавьте перец и капусту, тушите под крышкой 10 минут.","Посыпьте зеленью."]},
 {n:"Треска (минтай) под морковной шубой", tags:"d", base:.34, s:[["Минтай",180],["Морковь",80],["Лук репчатый",40],["Сметана (или йогурт)",50],["Сыр полутвёрдый",25]],
  steps:["Рыбу выложите в форму, сверху пассерованные морковь и лук.","Смажьте сметаной, посыпьте сыром.","Запекайте 25 минут при 190°C."]},
 {n:"Салат с тунцом и яйцом", tags:"d", base:.34, s:[["Кальмар",130],["Яйцо куриное",110],["Огурцы",100],["Помидоры",100],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Кальмар варите 3 минуты в кипящей воде (не больше — будет резиновый).","Яйца сварите вкрутую (10 мин), нарежьте кубиком.","Смешайте с овощами, заправьте маслом."]},
 {n:"Тушёная капуста с курицей и грибами", tags:"d", base:.34, s:[["Куриная грудка сырая",140],["Капуста",200],["Морковь",50],["Масло растительное",8],["Хлеб ржаной",30]],
  steps:["Курицу кубиками обжарьте 5 минут.","Добавьте капусту и морковь, тушите под крышкой 20 минут на слабом огне."]},
 {n:"Творожная запеканка", tags:"d", base:.34, s:[["Творог 5%",250],["Яйцо куриное",100],["Рис белый сухой",30],["Сметана (или йогурт)",50],["Изюм",20]],
  steps:["Смешайте творог, яйца, рис (или манку), половину сметаны.","Выложите в форму, смажьте остатками сметаны, сверху изюм.","Запекайте 35 минут при 180°C."]},
 {n:"Омлет с овощами и курицей", tags:"d", base:.34, s:[["Яйцо куриное",150],["Куриная грудка сырая",100],["Помидоры",100],["Зелень (укроп, петрушка)",15],["Масло растительное",6]],
  steps:["Отварную или жареную курицу нарежьте, обжарьте с помидорами 3 минуты.","Залейте взбитыми яйцами, под крышкой 5 минут."]},
 {n:"Говядина тушёная с фасолью", tags:"d", base:.34, s:[["Говядина постная",130],["Фасоль сухая",60],["Томатная паста",20],["Лук репчатый",40],["Морковь",50],["Масло растительное",8]],
  steps:["Фасоль замочите на ночь, сварите 40 минут.","Говядину кубиками обжарьте, добавьте овощи и томат, тушите 40 минут под крышкой с водой.","Соедините с фасолью, прогрейте 10 минут."]},
 {n:"Рыбные котлеты с кабачком (в духовке)", tags:"d", base:.34, s:[["Минтай",180],["Картофель",80],["Лук репчатый",30],["Яйцо куриное",50],["Масло растительное",5]],
  steps:["Прокрутите рыбу с луком и картофелем через мясорубку (или блендером).","Добавьте яйцо, соль, сформируйте котлеты.","Запекайте на пергаменте 25 минут при 190°C."]},

 // ===== ПОЛДНИКИ / ПЕРЕКУСЫ =====
 {n:"Йогурт с яблоком и орехами", tags:"s", base:.14, s:[["Йогурт классический",150],["Яблоки",120],["Орехи грецкие",12]],
  steps:["Яблоко нарежьте дольками.","Смешайте с йогуртом, сверху рубленые орехи."]},
 {n:"Творог с кефиром и бананом", tags:"s", base:.14, s:[["Творог 5%",120],["Кефир 1%",100],["Банан",100]],
  steps:["Банан разомните с творогом, залейте кефиром."]},
 {n:"Бутерброд с сыром и яйцом", tags:"s", base:.14, s:[["Хлеб ржаной",60],["Сыр полутвёрдый",30],["Яйцо куриное",55],["Масло сливочное",5]],
  steps:["Яйцо сварите (8 мин), нарежьте кружками.","Хлеб смажьте маслом, layered сыр и яйцо — можно под горячий пресс 2 минуты."]},
 {n:"Фруктовая тарелка с мёдом", tags:"s", base:.14, s:[["Яблоки",100],["Апельсин",100],["Банан",80],["Мёд",15]],
  steps:["Нарежьте фрукты дольками, полейте мёдом."]},
 {n:"Орехи и сухофрукты", tags:"s", base:.14, s:[["Орехи грецкие",25],["Изюм",25],["Яблоки",100]],
  steps:["Просто смешайте — перекус в контейнер, который берут с собой."] },
];

// добавить недостающие продукты (сметана, печень, чеснок) — упрощённые данные
Object.assign(FOODS, {
  "Сметана (или йогурт)": [210, 2.8, 20.0, 3.2],
  "Куриная печень (или говяд.)": [140, 20.5, 5.5, 0.0],
  "Чеснок (по желанию)": [143, 6.4, 0.2, 29.9],
});

// ---------- расчёт калорий (Mifflin-St Jeor) ----------
function calcTargets(p){
  const bmr = p.sex==="f" ? 10*p.weight + 6.25*p.height - 5*p.age - 161
                      : 10*p.weight + 6.25*p.height - 5*p.age + 5;
  const tdee = bmr * p.act;
  let kcal = tdee * (1 + p.goalDelta);
  // безопасный коридор
  const floor = p.sex==="f" ? 1200 : 1500;
  let note = "";
  if (kcal < floor){ note = `Поднято до безопасного минимума ${floor} ккал — сильнее урезать нельзя.`; kcal = floor; }
  // макронутриенты: белок 2 г/кг целевого веса (при похудении — на идеальную массу), жиры 1 г/кг
  const idealW = Math.max(50, 22 * (p.height/100)**2);
  const refW = p.weight > idealW ? idealW + (p.weight-idealW)*0.3 : p.weight;
  let prot = Math.round(2.0 * refW);
  let fat  = Math.round(1.0 * refW);
  let carbs = Math.round((kcal - prot*4 - fat*9) / 4);
  if (carbs < 80){ carbs = 80; const rest = kcal - carbs*4 - prot*4; fat = Math.max(40, Math.round(rest/9));
    note += (note?" ":"")+`Углеводы подняты до 80 г (мозгу нужно минимум), жиры скорректированы.`; }
  const bmi = p.weight / (p.height/100)**2;
  return {kcal:Math.round(kcal/5)*5, prot, fat, carbs, bmi, note};
}

// ---------- генератор недели ----------
function pick(arr, rng){ return arr[Math.floor(rng()*arr.length)]; }
function mulberry(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

function recipeNut(r){
  let k=0,p=0,f=0,c=0;
  for(const [name,g] of r.s){ const fd=FOODS[name]; if(!fd) continue; k+=fd[0]*g/100; p+=fd[1]*g/100; f+=fd[2]*g/100; c+=fd[3]*g/100; }
  return {k,p,f,c};
}

function genWeek(targets, mealsCount, seed){
  const rng = mulberry(seed);
  const byTag = t => RECIPES.filter(r=>r.tags.includes(t));
  const slots = mealsCount===4 ? [["b",.26],["l",.34],["s",.12],["d",.28]] : [["b",.30],["l",.42],["d",.38]];
  const days=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
  const plan = [];
  for(let d=0; d<7; d++){
    const day=[]; let dk=0,dp=0,df=0,dc=0;
    for(const [tag,share] of slots){
      const wantK = targets.kcal*share;
      // сортируем рецепты этого приёма по близости калорий к нужному, берём из топ-5 случайно,
      // масштабируем ингредиенты на желаемую калорийность (×0.8–1.25 допустимо)
      const cand = byTag(tag).map(r=>({r, n:recipeNut(r)}))
                    .sort((a,b)=>Math.abs(a.n.k-wantK)-Math.abs(b.n.k-wantK)).slice(0,5);
      const ch = pick(cand,rng);
      const scale = Math.min(1.6, Math.max(0.6, wantK/ch.n.k));
      const ing = ch.r.s.map(([name,g])=>[name, Math.round(g*scale/5)*5]);
      const n = ing.reduce((acc,[name,g])=>{const fd=FOODS[name]||[0,0,0,0]; acc.k+=fd[0]*g/100; acc.p+=fd[1]*g/100; acc.f+=fd[2]*g/100; acc.c+=fd[3]*g/100; return acc;},{k:0,p:0,f:0,c:0});
      day.push({name:ch.r.n, steps:ch.r.steps, ing, ...n});
      dk+=n.k; dp+=n.p; df+=n.f; dc+=n.c;
    }
    // коррекция: если день выбивается из цели >8%, масштабируем ужин к остатку калорий
    const diff = targets.kcal - dk;
    if(Math.abs(diff)/targets.kcal > 0.08 && day.length){
      const last = day[day.length-1];
      const kOld = last.k, pOld = last.p, fOld = last.f, cOld = last.c;
      const s2 = Math.min(1.7, Math.max(0.6, (kOld + diff)/kOld));
      last.ing = last.ing.map(([n,g])=>[n, Math.max(10, Math.round(g*s2/5)*5)]);
      const sum=(ings)=>ings.reduce((acc,[name,g])=>{const fd=FOODS[name]||[0,0,0,0]; acc.k+=fd[0]*g/100; acc.p+=fd[1]*g/100; acc.f+=fd[2]*g/100; acc.c+=fd[3]*g/100; return acc;},{k:0,p:0,f:0,c:0});
      // пересчитываем БЖУ дня по фактическим порциям (без двойного учёта)
      dk=dp=df=dc=0; day.forEach(m=>{dk+=m.k;dp+=m.p;df+=m.f;dc+=m.c;});
      const n2 = sum(last.ing);
      Object.assign(last, n2);
      dk += n2.k-kOld; dp += n2.p-pOld; df += n2.f-fOld; dc += n2.c-cOld;
    }
    plan.push({day:days[d], meals:day, tot:{k:dk,p:dp,f:df,c:dc}});
  }
  return plan;
}

// ---------- состояние ----------
const LS = "caleidoscope_v1";
let state = JSON.parse(localStorage.getItem(LS)||"null") || {params:null, seed:Date.now()%100000, plan:null, diary:{}, view:"setup", day:0};
function save(){ localStorage.setItem(LS, JSON.stringify(state)); }

// ---------- UI ----------
const $ = id => document.getElementById(String(id).replace(/^#/,""));
const MEAL_NAMES = {b:"Завтрак", l:"Обед", s:"Полдник", d:"Ужин"};
let ui = {sex:"m", meals:4};

$("#sexSeg").addEventListener("click", e=>{ const b=e.target.closest("button"); if(!b)return;
  [...e.currentTarget.children].forEach(x=>x.classList.remove("on")); b.classList.add("on"); ui.sex=b.dataset.v; });
$("#mealsSeg").addEventListener("click", e=>{ const b=e.target.closest("button"); if(!b)return;
  [...e.currentTarget.children].forEach(x=>x.classList.remove("on")); b.classList.add("on"); ui.meals=+b.dataset.v; });

$("#calcBtn").addEventListener("click", ()=>{
  const params = { sex:ui.sex, age:+$("age").value, height:+$("height").value, weight:+$("weight").value,
                   act:+$("activity").value, goalDelta:+$("goal").value, meals:ui.meals };
  if(!(params.age&&params.height&&params.weight)){ alert("Заполните возраст, рост и вес"); return; }
  state.params = params; state.seed = Date.now()%100000; state.diary={};
  buildPlan(); go("plan"); save();
});
$("#regenBtn").addEventListener("click", ()=>{ state.seed=(state.seed+1)%100000; state.diary={}; buildPlan(); save(); });

function buildPlan(){
  const t = calcTargets(state.params);
  state.targets = t;
  state.plan = genWeek(t, state.params.meals, state.seed);
  renderPlan(0);
}

function renderPlan(dayIdx){
  state.day=dayIdx; save();
  const t=state.targets, plan=state.plan;
  $("rKcal").textContent=t.kcal; $("rP").textContent=t.prot; $("rF").textContent=t.fat; $("rC").textContent=t.carbs;
  const cat = t.bmi<18.5?["недостаток веса"]:t.bmi<25?["нормальный вес"]:t.bmi<30?["избыточный вес"]:["ожирение"];
  $("rBmi").innerHTML=`ИМТ: <b>${t.bmi.toFixed(1)}</b> — ${cat}`;
  $("rNote").textContent = t.note||"";
  const bar=$("daysBar"); bar.innerHTML="";
  plan.forEach((d,i)=>{ const b=document.createElement("button"); b.textContent=d.day;
    if(i===dayIdx)b.classList.add("on"); b.onclick=()=>renderPlan(i); bar.appendChild(b); });
  const box=$("mealsBox"); box.innerHTML="";
  const d=plan[dayIdx];
  $("dayTotal").textContent=`Всего за день: ${Math.round(d.tot.k)} ккал · Б ${Math.round(d.tot.p)} · Ж ${Math.round(d.tot.f)} · У ${Math.round(d.tot.c)} (план: ${t.kcal})`;
  d.meals.forEach((m,mi)=>{
    const key=`${dayIdx}-${mi}`;
    const el=document.createElement("div"); el.className="meal";
    const done = !!state.diary[key];
    el.innerHTML=`
      <div class="meal-head">
        <div><span class="t">${m.name}</span><span class="badge">${MEAL_TAG(mi,state.params.meals)}</span></div>
        <div class="k">${Math.round(m.k)} ккал</div>
      </div>
      <div class="meal-body">
        <ul class="ing">${m.ing.map(([n,g])=>`<li><span>${n}</span><span>${g} г</span></li>`).join("")}</ul>
        <ol class="steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
        <div class="mm">Б ${Math.round(m.p)} г · Ж ${Math.round(m.f)} г · У ${Math.round(m.c)} г</div>
        <button class="small-btn" data-done style="margin-top:8px">${done?"✅ Приготовлено":"Отметить: приготовил"}</button>
      </div>`;
    el.querySelector(".meal-head").onclick=()=>el.classList.toggle("open");
    el.querySelector("[data-done]").onclick=(ev)=>{ ev.stopPropagation();
      if(state.diary[key]) delete state.diary[key]; else state.diary[key]=true;
      save(); renderPlan(dayIdx); };
    box.appendChild(el);
  });
}
function MEAL_TAG(mi,total){ return total===4 ? ["Завтрак","Обед","Полдник","Ужин"][mi] : ["Завтрак","Обед","Ужин"][mi]; }

// ---------- список покупок ----------
function buildShoppingList(){
  const agg={}; // название -> {g, meals:[блюда]}
  state.plan.forEach(d=>d.meals.forEach(m=>m.ing.forEach(([n,g])=>{
    if(!agg[n]) agg[n]={g:0, dishes:new Set()};
    agg[n].g += g; agg[n].dishes.add(m.name);
  })));
  return Object.entries(agg)
    .map(([n,v])=>({n, g:v.g, dishes:[...v.dishes]}))
    .sort((a,b)=>b.g-a.g);
}
function renderShopping(){
  const list=buildShoppingList();
  const el=$("shopList");
  if(!list.length){ el.innerHTML='<p class="hint">Сначала сгенерируйте меню.</p>'; return; }
  el.innerHTML='<ul class="ing">'+list.map(({n,g})=>
    `<li><span>▢ ${n}</span><span>${g} г</span></li>`).join("")+'</ul>'+
    '<p class="hint" style="margin-top:8px">Товары отсортированы по весу. Нажимайте на строку, чтобы отмечать купленное.</p>';
  el.querySelectorAll("li").forEach(li=>li.addEventListener("click",()=>{
    li.style.textDecoration = li.style.textDecoration ? "" : "line-through";
    li.style.opacity = li.style.opacity==="0.5" ? "1" : "0.5";
  }));
  // копирование текстом в мессенджер
  $("shopCopy").onclick=()=>{
    const txt = list.map(({n,g})=>`▢ ${n} — ${g} г`).join("\n");
    navigator.clipboard?.writeText("🛒 Список покупок на неделю:\n"+txt)
      .then(()=>{ $("shopCopy").textContent="✅ Скопировано"; setTimeout(()=>$("shopCopy").textContent="📋 Скопировать список",1500); });
  };
}
$("#shopBtn").addEventListener("click", ()=>{ renderShopping(); go("shop"); });

// ---------- дневник ----------
function renderDiary(){
  const box=$("diaryList"); box.innerHTML="";
  const keys=Object.keys(state.diary);
  if(!keys.length){ box.innerHTML='<p class="hint">Пока пусто. Отмечайте блюда во вкладке «Меню».</p>'; return; }
  // группировка по дням плана
  let tot=0;
  state.plan.forEach((d,di)=>{
    d.meals.forEach((m,mi)=>{
      if(state.diary[`${di}-${mi}`]){
        tot+=m.k;
        const row=document.createElement("div"); row.className="log-item";
        row.innerHTML=`<span>${d.day}: ${m.name}</span><b>${Math.round(m.k)} ккал</b>`;
        box.appendChild(row);
      }
    });
  });
  const sum=document.createElement("div"); sum.className="log-item"; sum.style.fontWeight="700";
  sum.innerHTML=`<span>Итого отмечено</span><b>${Math.round(tot)} ккал</b>`;
  box.appendChild(sum);
}
$("#resetDiary").addEventListener("click", ()=>{ state.diary={}; save(); renderDiary(); });

// ---------- навигация ----------
function go(v){
  state.view=v; save();
  ["setup","plan","diary","shop"].forEach(x=>$("view-"+x).classList.toggle("hidden", x!==v));
  document.querySelectorAll("footer button").forEach(b=>b.classList.toggle("on", b.dataset.go===v));
  if(v==="plan"){ if(!state.plan){go("setup");return;} renderPlan(state.day||0); }
  if(v==="shop" && !state.plan){ go("setup"); return; }
  if(v==="diary"){ if(!state.plan){go("setup");return;} renderDiary(); }
  window.scrollTo(0,0);
}
document.querySelectorAll("footer button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

// восстановление
if(state.params){
  const p=state.params;
  $("age").value=p.age; $("height").value=p.height; $("weight").value=p.weight;
  $("activity").value=p.act; $("goal").value=String(p.goalDelta);
  ui.sex=p.sex; ui.meals=p.meals||4;
  [...$("sexSeg").children].forEach(x=>x.classList.toggle("on", x.dataset.v===p.sex));
  [...$("mealsSeg").children].forEach(x=>x.classList.toggle("on", +x.dataset.v===(p.meals||4)));
  if(p.meals){ const tt=calcTargets(p); state.targets=tt; state.plan = genWeek(tt, p.meals, state.seed); }
}
go(state.view||"setup");
