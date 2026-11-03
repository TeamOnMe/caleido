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
 {n:"Овсяная каша с бананом и мёдом", tags:"b", base:.26, portions:1, s:[["Овсянка сухая",70],["Молоко 2.5%",200],["Банан",100],["Мёд",10]],
  steps:["Залейте овсянку молоком, варите 5–7 минут на слабом огне.","Добавьте нарезанный банан и мёд, перемешайте."]},
 {n:"Омлет из трёх яиц с сыром и овощами", tags:"b", base:.26, portions:1, s:[["Яйцо куриное",150],["Сыр полутвёрдый",30],["Помидоры",100],["Масло растительное",5]],
  steps:["Взбейте яйца с щепоткой соли.","Обжарьте помидоры 2 минуты, залейте яйцами.","Посыпьте тертым сыром, накройте крышкой на 3 минуты."]},
 {n:"Творожная тарелка с ягодами и орехами", tags:"b", base:.26, portions:1, s:[["Творог 5%",200],["Ягоды замороженные",100],["Орехи грецкие",15],["Мёд",10]],
  steps:["Ягоды разморозьте (можно в микроволновке 1 минуту).","Смешайте творог с ягодами, сверху орехи и мёд."]},
 {n:"Гречневая каша с яйцом и маслом", tags:"b", base:.26, portions:1, s:[["Гречка сухая",70],["Яйцо куриное",55],["Масло сливочное",10]],
  steps:["Гречку залейте водой 1:2, варите 15 минут под крышкой.","Яйцо сварите вкрутую (10 минут), нарежьте поверх каши.","Добавьте сливочное масло."]},
 {n:"Бутерброды с творожным сыром и рыбой", tags:"b", base:.26, portions:1, s:[["Хлеб ржаной",70],["Творог 5%",80],["Скумбрия",60],["Огурцы",50]],
  steps:["Творог посолите, разминайте вилкой — это намазка.","Намажьте хлеб, выложите огурцы и кусочки скумбрии."]},
 {n:"Сырники с йогуртом", tags:"b", base:.26, portions:1, s:[["Творог 5%",200],["Яйцо куриное",50],["Рис белый сухой",30],["Масло растительное",8],["Йогурт классический",100]],
  steps:["Смешайте творог, яйцо и рисовую муку (смолотый рис).","Сформируйте шайбы, обжарьте по 3 минуты с каждой стороны.","Подавайте с йогуртом."]},
 {n:"Каша «дружба» с изюмом", tags:"b", base:.26, portions:1, s:[["Овсянка сухая",40],["Гречка сухая",35],["Молоко 2.5%",200],["Изюм",20],["Масло сливочное",7]],
  steps:["Крупы залейте молоком, варите 15 минут.","Изюм запарьте кипятком на 5 минут, добавьте в кашу со сливочным маслом."]},

 // ===== ОБЕДЫ =====
 {n:"Борщ с говядиной и сметаной", tags:"l", base:.40, portions:2, s:[["Говядина постная",120],["Свёкла",100],["Капуста",100],["Морковь",60],["Лук репчатый",40],["Картофель",150],["Томатная паста",20],["Масло растительное",8],["Хлеб ржаной",30]],
  steps:["Сварите бульон из говядины ~1 часа, мясо достаньте и нарежьте.","Обжарьте тёртую свёклу с морковью и луком 7 минут, добавьте томатную пасту.","В бульон положьте картофель кубиками и капусту, варите 15 минут.","Добавьте зажарку, варите ещё 10 минут. Настой 20 мин. Со сметаной или без."]},
 {n:"Куриная грудка с гречкой и салатом", tags:"l", base:.40, portions:1, s:[["Куриная грудка сырая",150],["Гречка сухая",70],["Огурцы",100],["Помидоры",100],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Грудку посолите, запекайте в фольге 25 минут при 200°C (или тушите 20 мин).","Гречку варите 15 минут.","Огурцы и помидоры нарежьте, заправьте маслом, посыпьте зеленью."]},
 {n:"Плов с курицей", tags:"l", base:.40, portions:2, s:[["Куриная грудка сырая",130],["Рис белый сухой",90],["Морковь",80],["Лук репчатый",50],["Масло растительное",10],["Чеснок (по желанию)",5]],
  steps:["Обжарьте лук и морковь в казане 7 минут, добавьте курицу — ещё 5 минут.","Засыпьте рис, залейте кипятком 1:1.5, посолите.","Томите под крышкой 25 минут на слабом огне, не перемешивая."]},
 {n:"Щи из свежей капусты с говядиной", tags:"l", base:.40, portions:2, s:[["Говядина постная",110],["Капуста",150],["Картофель",150],["Морковь",50],["Лук репчатый",40],["Томатная паста",15],["Масло растительное",7],["Хлеб ржаной",30]],
  steps:["Сварите бульон из говядины 1 час.","Добавьте картофель, через 10 минут — капусту.","Зажарьте лук с морковью и томатом, отправьте в щи, варите 10 минут."]},
 {n:"Запечённая рыба с рисом и овощами", tags:"l", base:.40, portions:1, s:[["Минтай",180],["Рис белый сухой",80],["Перец болгарский",100],["Морковь",60],["Масло растительное",8]],
  steps:["Рис варите 15 минут.","Рыбу посолите, вокругlayout овощи дольками, сбрызните маслом.","Запекайте 25 минут при 190°C."]},
 {n:"Суп-пюре чечевичный", tags:"l", base:.40, portions:2, s:[["Чечевица сухая",80],["Морковь",60],["Лук репчатый",40],["Картофель",100],["Масло растительное",8],["Хлеб ржаной",40]],
  steps:["Обжарьте лук и морковь 5 минут.","Залейте чечевицу 700 мл воды, добавьте овощи и картофель, варите 25 минут.","Пюрируйте блендером. Подавайте с хлебом."]},
 {n:"Индейка тушёная с макаронами", tags:"l", base:.40, portions:1, s:[["Филе индейки",150],["Макароны сухие",80],["Томатная паста",25],["Лук репчатый",40],["Масло растительное",8],["Сыр полутвёрдый",20]],
  steps:["Макароны отварите по инструкции (7–9 минут).","Индейку кубиками обжарьте с луком, добавьте пасту и 200 мл воды, тушите 15 минут.","Смешайте с макаронами, посыпьте сыром."]},
 {n:"Печёночные оладьи с картофельным пюре", tags:"l", base:.40, portions:1, s:[["Куриная печень (или говяд.)",150],["Картофель",250],["Лук репчатый",60],["Молоко 2.5%",50],["Масло сливочное",10],["Масло растительное",8]],
  steps:["Печень прокрутите через мясорубку с луком, добавьте соль и перец.","Жарьте ложкой как оладьи по 3 минуты с каждой стороны.","Картофель отварите, разомните с молоком и сливочным маслом."]},

 // ===== УЖИНЫ =====
 {n:"Куриная грудка с овощами на сковороде", tags:"d", base:.34, portions:1, s:[["Куриная грудка сырая",160],["Перец болгарский",100],["Капуста",120],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Грудку нарежьте полосками, обжарьте на сильном огне 6 минут.","Добавьте перец и капусту, тушите под крышкой 10 минут.","Посыпьте зеленью."]},
 {n:"Треска (минтай) под морковной шубой", tags:"d", base:.34, portions:1, s:[["Минтай",180],["Морковь",80],["Лук репчатый",40],["Сметана (или йогурт)",50],["Сыр полутвёрдый",25]],
  steps:["Рыбу выложите в форму, сверху пассерованные морковь и лук.","Смажьте сметаной, посыпьте сыром.","Запекайте 25 минут при 190°C."]},
 {n:"Салат с тунцом и яйцом", tags:"d", base:.34, portions:1, s:[["Кальмар",130],["Яйцо куриное",110],["Огурцы",100],["Помидоры",100],["Масло растительное",8],["Зелень (укроп, петрушка)",15]],
  steps:["Кальмар варите 3 минуты в кипящей воде (не больше — будет резиновый).","Яйца сварите вкрутую (10 мин), нарежьте кубиком.","Смешайте с овощами, заправьте маслом."]},
 {n:"Тушёная капуста с курицей и грибами", tags:"d", base:.34, portions:1, s:[["Куриная грудка сырая",140],["Капуста",200],["Морковь",50],["Масло растительное",8],["Хлеб ржаной",30]],
  steps:["Курицу кубиками обжарьте 5 минут.","Добавьте капусту и морковь, тушите под крышкой 20 минут на слабом огне."]},
 {n:"Творожная запеканка", tags:"d", base:.34, portions:2, s:[["Творог 5%",250],["Яйцо куриное",100],["Рис белый сухой",30],["Сметана (или йогурт)",50],["Изюм",20]],
  steps:["Смешайте творог, яйца, рис (или манку), половину сметаны.","Выложите в форму, смажьте остатками сметаны, сверху изюм.","Запекайте 35 минут при 180°C."]},
 {n:"Омлет с овощами и курицей", tags:"d", base:.34, portions:1, s:[["Яйцо куриное",150],["Куриная грудка сырая",100],["Помидоры",100],["Зелень (укроп, петрушка)",15],["Масло растительное",6]],
  steps:["Отварную или жареную курицу нарежьте, обжарьте с помидорами 3 минуты.","Залейте взбитыми яйцами, под крышкой 5 минут."]},
 {n:"Говядина тушёная с фасолью", tags:"d", base:.34, portions:2, s:[["Говядина постная",130],["Фасоль сухая",60],["Томатная паста",20],["Лук репчатый",40],["Морковь",50],["Масло растительное",8]],
  steps:["Фасоль замочите на ночь, сварите 40 минут.","Говядину кубиками обжарьте, добавьте овощи и томат, тушите 40 минут под крышкой с водой.","Соедините с фасолью, прогрейте 10 минут."]},
 {n:"Рыбные котлеты с кабачком (в духовке)", tags:"d", base:.34, portions:2, s:[["Минтай",180],["Картофель",80],["Лук репчатый",30],["Яйцо куриное",50],["Масло растительное",5]],
  steps:["Прокрутите рыбу с луком и картофелем через мясорубку (или блендером).","Добавьте яйцо, соль, сформируйте котлеты.","Запекайте на пергаменте 25 минут при 190°C."]},

 // ===== ПОЛДНИКИ / ПЕРЕКУСЫ =====
 {n:"Йогурт с яблоком и орехами", tags:"s", base:.14, portions:1, s:[["Йогурт классический",150],["Яблоки",120],["Орехи грецкие",12]],
  steps:["Яблоко нарежьте дольками.","Смешайте с йогуртом, сверху рубленые орехи."]},
 {n:"Творог с кефиром и бананом", tags:"s", base:.14, portions:1, s:[["Творог 5%",120],["Кефир 1%",100],["Банан",100]],
  steps:["Банан разомните с творогом, залейте кефиром."]},
 {n:"Бутерброд с сыром и яйцом", tags:"s", base:.14, portions:1, s:[["Хлеб ржаной",60],["Сыр полутвёрдый",30],["Яйцо куриное",55],["Масло сливочное",5]],
  steps:["Яйцо сварите (8 мин), нарежьте кружками.","Хлеб смажьте маслом, layered сыр и яйцо — можно под горячий пресс 2 минуты."]},
 {n:"Фруктовая тарелка с мёдом", tags:"s", base:.14, portions:1, s:[["Яблоки",100],["Апельсин",100],["Банан",80],["Мёд",15]],
  steps:["Нарежьте фрукты дольками, полейте мёдом."]},
 {n:"Орехи и сухофрукты", tags:"s", base:.14, portions:1, s:[["Орехи грецкие",25],["Изюм",25],["Яблоки",100]],
  steps:["Просто смешайте — перекус в контейнер, который берут с собой."] },
];

// добавить недостающие продукты (сметана, печень, чеснок) — упрощённые данные
Object.assign(FOODS, {
  "Сметана (или йогурт)": [210, 2.8, 20.0, 3.2],
  "Куриная печень (или говяд.)": [140, 20.5, 5.5, 0.0],
  "Чеснок (по желанию)": [143, 6.4, 0.2, 29.9],
});

// ---------- магазин: примерные цены Пятёрочка/Магнит за типичную упаковку ----------
// формат: продукт -> [граммовка упаковки, г, цена Пятёрочка ₽, цена Магнит ₽]
// ВНИМАНИЕ: цены примерные (средние по РФ на ноябрь 2026); сети меняют их ежедневно и по регионам.
const SHOP = {
  "Овсянка сухая":        [500,   90,   95],
  "Гречка сухая":         [800,  110,  115],
  "Рис белый сухой":      [900,  120,  130],
  "Макароны сухие":       [450,   70,   75],
  "Хлеб ржаной":          [400,   55,   58],
  "Картофель":            [1000,   75,   79],
  "Куриная грудка сырая": [700,  260,  275],
  "Филе индейки":         [600,  330,  350],
  "Говядина постная":     [800,  480,  510],
  "Минтай":               [500,  220,  235],
  "Скумбрия":             [500,  290,  310],
  "Кальмар":              [300,  190,  205],
  "Яйцо куриное":         [660,  115,  120],   // ~10 шт
  "Творог 5%":            [200,   95,  105],
  "Йогурт классический":  [290,   75,   80],
  "Кефир 1%":             [930,   95,  100],
  "Молоко 2.5%":          [930,   95,  100],
  "Сыр полутвёрдый":      [200,  190,  210],
  "Масло сливочное":      [180,  185,  195],
  "Масло растительное":   [500,  140,  150],
  "Орехи грецкие":        [150,  190,  210],
  "Чечевица сухая":       [450,   95,  100],
  "Фасоль сухая":         [450,  110,  115],
  "Горошек зелёный":      [400,   90,   95],
  "Капуста":              [1000,   60,   65],
  "Морковь":              [1000,   65,   70],
  "Свёкла":               [1000,   55,   60],
  "Лук репчатый":         [1000,   60,   65],
  "Огурцы":               [500,  130,  145],
  "Помидоры":             [500,  180,  195],
  "Перец болгарский":     [500,  210,  230],
  "Зелень (укроп, петрушка)": [50, 60,  65],
  "Яблоки":               [1000,  130,  140],
  "Банан":                [1000,  110,  119],
  "Апельсин":             [1000,  140,  155],
  "Ягоды замороженные":   [300,   160,  175],
  "Изюм":                 [300,   130,  140],
  "Мёд":                  [300,   280,  300],
  "Сахар":                [1000,   85,   90],
  "Томатная паста":       [300,    90,   95],
  "Горький шоколад":      [ 90,   120,  130],
  "Сметана (или йогурт)": [300,   110,  120],
  "Куриная печень (или говяд.)": [500, 180, 195],
  "Чеснок (по желанию)":  [100,    60,   65],
};

// ---------- справочник для ручного ввода «+ Я поел» (КБЖУ на 100 г) ----------
// n:[kcal,p,f,c]; pack:[ключ в SHOP или null, вес типичной упаковки г] — для цен/ссылок
const EXTRA_FOODS = {
  "Яблоко":              {n:[47,0.4,0.4,9.8],    pack:["Яблоки",1000]},
  "Банан":               {n:[96,1.5,0.5,21.8],   pack:["Банан",1000]},
  "Апельсин":            {n:[43,0.9,0.2,8.1],    pack:["Апельсин",1000]},
  "Груша":               {n:[47,0.4,0.3,10.3],   pack:[null,600]},
  "Виноград":            {n:[65,0.6,0.2,16.8],   pack:[null,500]},
  "Мандарин":            {n:[38,0.8,0.2,8.1],    pack:[null,500]},
  "Киви":                {n:[47,1.1,0.5,10.3],   pack:[null,250]},
  "Арбуз":               {n:[27,0.6,0.1,6.0],    pack:[null,5000]},
  "Дыня":                {n:[35,0.6,0.2,8.5],    pack:[null,1500]},
  "Хурма":               {n:[55,0.5,0.4,12.0],   pack:[null,300]},
  "Гранат":              {n:[72,0.7,0.6,14.5],   pack:[null,250]},
  "Лимон":               {n:[34,1.1,0.1,3.0],    pack:[null,100]},
  "Кекс":                {n:[320,5.0,12.0,48.0], pack:[null,400]},
  "Пирожное «Картошка»": {n:[340,3.0,16.0,46.0], pack:[null,180]},
  "Печенье овсяное":     {n:[430,5.0,15.0,70.0], pack:[null,250]},
  "Печенье сдобное":     {n:[480,7.0,18.0,70.0], pack:[null,250]},
  "Вафля шоколадная":    {n:[550,5.0,30.0,65.0], pack:[null,250]},
  "Конфета шоколадная":  {n:[500,4.0,28.0,60.0], pack:[null,250]},
  "Зефир":               {n:[310,1.0,0.0,78.0],  pack:[null,300]},
  "Пастила":             {n:[310,0.5,0.0,79.0],  pack:[null,300]},
  "Шоколад молочный":    {n:[550,7.0,35.0,50.0], pack:["Горький шоколад",90]},
  "Халва":               {n:[500,12.0,22.0,65.0],pack:[null,300]},
  "Козинак":             {n:[520,6.0,20.0,78.0], pack:[null,250]},
  "Творожок глазированный":{n:[230,6.0,12.0,24.0],pack:[null,90]},
  "Сок яблочный":        {n:[45,0.1,0.0,10.5],   pack:[null,950]},
  "Сок апельсиновый":    {n:[45,0.7,0.2,9.5],    pack:[null,950]},
  "Кола / газировка":    {n:[42,0.0,0.0,10.6],   pack:[null,1000]},
  "Квас":                {n:[27,0.2,0.0,6.0],    pack:[null,1000]},
  "Чай с сахаром":       {n:[26,0.0,0.0,6.4],    pack:["Сахар",1000]},
  "Кофе с молоком":      {n:[29,1.0,1.5,2.5],    pack:["Молоко 2.5%",930]},
  "Капучино без сахара": {n:[40,2.0,2.0,3.0],    pack:["Молоко 2.5%",930]},
  "Хлеб белый":          {n:[265,8.0,3.2,50.0],  pack:[null,400]},
  "Лаваш":               {n:[275,9.5,2.5,53.0],  pack:[null,300]},
  "Батончик злаковый":   {n:[380,6.0,9.0,68.0],  pack:[null,40]},
  "Батончик шоколадный": {n:[450,6.0,20.0,60.0], pack:[null,55]},
  "Чипсы":               {n:[530,5.0,32.0,53.0], pack:[null,100]},
  "Сухарики":            {n:[380,7.0,12.0,60.0], pack:[null,100]},
  "Орехи кешью":         {n:[555,18.0,46.0,30.0],pack:[null,100]},
  "Миндаль":             {n:[609,21.0,58.0,13.0],pack:[null,100]},
  "Арахис":              {n:[565,26.0,45.0,10.0],pack:[null,100]},
  "Тыква":               {n:[26,1.0,0.1,4.4],    pack:[null,1000]},
  "Кабачок":             {n:[24,0.6,0.3,4.6],    pack:[null,500]},
  "Брокколи":            {n:[34,2.8,0.4,4.4],    pack:[null,300]},
  "Цветная капуста":     {n:[25,1.9,0.3,4.2],    pack:[null,300]},
  "Чернослив":           {n:[240,2.0,0.0,58.0],  pack:[null,150]},
  "Курага":              {n:[215,3.0,0.1,51.0],  pack:[null,150]},
  "Финики":              {n:[280,2.5,0.2,69.0],  pack:[null,200]},
  "Сгущёнка":            {n:[328,7.2,8.5,56.0],  pack:[null,380]},
  "Варенье":             {n:[280,0.3,0.0,69.0],  pack:[null,500]},
  "Мороженое пломбир":   {n:[200,6.0,12.0,16.0], pack:[null,450]},
  "Блины готовые":       {n:[240,6.0,8.0,35.0],  pack:[null,400]},
  "Сосиска":             {n:[290,12.0,26.0,0.5], pack:[null,100]},
  "Колбаса докторская":  {n:[257,22.0,18.0,0.0], pack:[null,300]},
  "Сарделька":           {n:[275,15.0,24.0,3.0], pack:[null,80]},
};

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

const SLOTS4 = [["b",.26],["l",.34],["s",.12],["d",.28]];
const SLOTS3 = [["b",.30],["l",.42],["d",.38]];

// собрать один приём: tag — b/l/s/d, wantK — целевые ккал; rnd — генератор случайных
// state.forbidden (аллергии/нелюбимое) полностью исключает блюда с такими продуктами
function buildMeal(tag, wantK, rnd){
  const forb = forbiddenList();
  let cand = RECIPES.filter(r=>r.tags.includes(tag))
                    .filter(r=>!recipeHasForbidden(r, forb))
                    .map(r=>({r, n:recipeNut(r)}));
  if(!cand.length) return null; // нет блюд приёма после фильтра — день покажет подсказку
  cand.sort((a,b)=>Math.abs(a.n.k-wantK)-Math.abs(b.n.k-wantK)).slice(0,5);
  const ch = pick(cand,rnd);
  const scale = Math.min(1.6, Math.max(0.6, wantK/ch.n.k));
  const ing = ch.r.s.map(([name,g])=>[name, Math.round(g*scale/5)*5]);
  const sum=(ings)=>ings.reduce((acc,[name,g])=>{const fd=FOODS[name]||[0,0,0,0]; acc.k+=fd[0]*g/100; acc.p+=fd[1]*g/100; acc.f+=fd[2]*g/100; acc.c+=fd[3]*g/100; return acc;},{k:0,p:0,f:0,c:0});
  const portions = Math.max(1, ch.r.portions||1);
  return Object.assign({name:ch.r.n, steps:ch.r.steps, ing, portions}, sum(ing));
}

// замена одного блюда в плане: другое блюдо того же приёма ЭТОГО дня, цель по калориям та же
function swapMeal(dayIdx, mealIdx){
  const p=state.params, t=state.targets;
  const slots = p.meals===4 ? SLOTS4 : SLOTS3;
  const [tag] = slots[mealIdx];
  const day = state.plan[dayIdx];
  const wantK = day.meals[mealIdx].k; // держим калорийность этого приёма как была
  state.swapN=(state.swapN||0)+1;
  const rnd = mulberry(state.seed*7919 + dayIdx*131 + mealIdx*17 + state.swapN);
  let m=null;
  for(let i=0;i<10 && (!m || m.name===day.meals[mealIdx].name); i++)
    m = buildMeal(tag, wantK, rnd);
  if(!m){ alert("Не нашлось другой замены — возможно, все блюда этого приёма в списке «Нельзя»."); return false; }
  day.meals[mealIdx]=m;
  // пересчёт итогов дня
  const tot={k:0,p:0,f:0,c:0};
  day.meals.forEach(x=>{tot.k+=x.k;tot.p+=x.p;tot.f+=x.f;tot.c+=x.c;});
  day.tot=tot;
  delete state.diary[`${dayIdx}-${mealIdx}`];
  save(); renderPlan(dayIdx);
  return true;
}

function genWeek(targets, mealsCount, seed){
  const rng = mulberry(seed);
  const slots = mealsCount===4 ? SLOTS4 : SLOTS3;
  const days=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
  const plan = [];
  for(let d=0; d<7; d++){
    const day=[]; let dk=0,dp=0,df=0,dc=0;
    for(const [tag,share] of slots){
      const wantK = targets.kcal*share;
      // берём блюдо приёма из топ-5 ближайших по калорийности, масштабируем под долю дня
      const m = buildMeal(tag, wantK, rng);
      if(m){ day.push(m); dk+=m.k; dp+=m.p; df+=m.f; dc+=m.c; }
      else day.push({empty:true, tag}); // всё запрещено — рендер покажет подсказку
    }
    // коррекция: если день выбивается из цели >8%, масштабируем ужин к остатку калорий
    const diff = targets.kcal - dk;
    const last = day[day.length-1];
    if(Math.abs(diff)/targets.kcal > 0.08 && day.length && last && !last.empty){
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

// ---------- аллергии / нелюбимые продукты ----------
// нормализация: нижний регистр, «ё»→«е», скобки и прочерки убраны — матчит «Сметана (или йогурт)» по «сметане»
function normFood(s){ return String(s).toLowerCase().replace(/ё/g,"е").replace(/[()«».,\-–—]/g," ").split(/\s+/).filter(Boolean); }
// алиасы: пользователь пишет по-человечески («рыба» = минтай, скумбрия, кальмар...)
const FOOD_ALIASES = {
  "рыба": ["минтай","скумбрия","кальмар","треска","палтус","лосось","форель","шпроты","сайра"],
  "морепродукты": ["кальмар","креветки","мидии"],
  "молоко": ["кефир","йогурт","ряженка","простокваша","сливки","сметана","масло сливочное","сыр","творог"],
  "кисломолочное": ["кефир","йогурт","творог","сметана","ряженка"],
  "сыр": ["сыр"],
  "глутен": ["овсянка","макароны","хлеб","лаваш","булгур","манка","ячмень","рожь"],
  "злаки": ["овсянка","гречка","рис","макароны","хлеб","чечевица","булгур","кукус"],
  "орехи": ["грецкие","миндаль","кешью","арахис","фундук","фисташки","кедровые"],
  "яйцо": ["яйцо"],
  "мед": ["мёд","мед"],
  "сладкое": ["сахар","мёд","изюм","варенье","сгущенка","шоколад","конфета","кекс","пирожное","зефир","пастила","халва","вафля","печенье","морозное"],
};
function forbiddenList(){ return (state.forbidden||[]).map(f=>f.toLowerCase()); }
function forbiddenTokens(forbLower){
  // разворачиваем список запретов в набор значимых слов с алиасами
  const set = new Set();
  for(const f of forbLower) for(const t of normFood(f)) if(t.length>=3) set.add(t);
  const extra = [];
  for(const t of set) if(FOOD_ALIASES[t]) extra.push(...FOOD_ALIASES[t]);
  for(const e of extra) set.add(e.replace(/ё/g,"е"));
  return set;
}
function recipeHasForbidden(r, forbLower){
  if(!forbLower.length) return false;
  const toks = forbiddenTokens(forbLower);
  if(!toks.size) return false;
  return r.s.some(([name])=>{
    const words = normFood(name);
    return words.some(w=>[...toks].some(t=>w===t || w.startsWith(t)));
  });
}

function migrateState(s){
  try {
    if (s.plan && Array.isArray(s.plan)) {
      s.plan.forEach(day => {
        if (day && Array.isArray(day.meals)) {
          day.meals.forEach(meal => {
            if (meal && typeof meal === "object" && (!meal.portions || typeof meal.portions !== "number" || meal.portions < 1)) {
              const r = RECIPES.find(rec => rec.n === meal.name);
              meal.portions = r ? (r.portions >= 1 ? r.portions : 1) : 1;
            }
          });
        } else {
          throw new Error("Invalid day structure");
        }
      });
    } else {
      s.plan = null;
    }
  } catch (e) {
    s.plan = null;
  }
  if (typeof s.diary !== "object" || s.diary === null) s.diary = {};
  if (s.view === undefined) s.view = "setup";
  if (s.day === undefined) s.day = 0;
  s.v = 2;
  return s;
}
const LS = "caleidoscope_v1";
let state = JSON.parse(localStorage.getItem(LS)||"null") || {params:null, seed:Date.now()%100000, plan:null, diary:{}, extra:{}, view:"setup", day:0, v:2};
if (state) state = migrateState(state);
if(!state.swapN) state.swapN=0;
if(!state.forbidden) state.forbidden=[];
if(!state.customFoods) state.customFoods={};   // свои продукты: имя -> [kcal,p,f,c] на 100 г
if(!state.extra) state.extra={};               // ручные записи: "день-приём" -> [{name,g,k,p,f,c}]
if(!state.shopStore) state.shopStore="5ka";    // сеть для цен: "5ka" | "magnit"
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
  // день = план + ручные дописки («+ Я поел»)
  let ek=0, ep=0, ef=0, ec=0;
  Object.entries(state.extra).forEach(([k,arr])=>{
    if(k.startsWith(dayIdx+"-")) arr.forEach(x=>{ek+=x.k; ep+=x.p; ef+=x.f; ec+=x.c;});
  });
  $("dayTotal").textContent=`Всего за день: ${Math.round(d.tot.k+ek)} ккал · Б ${Math.round(d.tot.p+ep)} · Ж ${Math.round(d.tot.f+ef)} · У ${Math.round(d.tot.c+ec)} (план: ${t.kcal}${ek?` + дописано ${Math.round(ek)}`:""})`;
  d.meals.forEach((m,mi)=>{
    const key=`${dayIdx}-${mi}`;
    const el=document.createElement("div"); el.className="meal";
    if(m.empty){ // все блюда приёма — в списке «Нельзя»
      el.innerHTML=`<div class="meal-head"><div><span class="t">—</span><span class="badge">${MEAL_TAG(mi,state.params.meals)}</span></div></div>
        <div style="padding:8px 0" class="hint">Все блюда этого приёма есть в списке «Нельзя». Добавьте продукт вручную кнопкой ниже или ослабьте ограничения во вкладке «Настроить».</div>`;
      const add=document.createElement("button"); add.className="small-btn"; add.style.marginTop="6px";
      add.textContent="➕ Я поел (добавить в этот приём)";
      add.onclick=()=>openAddFood(dayIdx, mi);
      el.appendChild(add);
      box.appendChild(el); return;
    }
    const done = !!state.diary[key];
    const portions = Math.max(1, m.portions||1);
    const extraArr = state.extra[key]||[];
    const extraK = extraArr.reduce((s,x)=>s+x.k,0);
    el.innerHTML=`
      <div class="meal-head">
        <div><span class="t">${m.name}</span><span class="badge">${MEAL_TAG(mi,state.params.meals)}</span></div>
        <div class="k">${Math.round(m.k/portions)} ккал<span class="k-sub">/порц.</span></div>
      </div>
      <div class="meal-body">
        <ul class="ing">${m.ing.map(([n,g])=>`<li><span>${n}</span><span>${g} г</span></li>`).join("")}</ul>
        <ol class="steps">${m.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
        <div class="mm mm-strong">На 1 порцию (${portions} порц. в блюде): <b>${Math.round(m.k/portions)} ккал</b> · Б ${round1(m.p/portions)} · Ж ${round1(m.f/portions)} · У ${round1(m.c/portions)}</div>
        <div class="mm">Всё блюдо целиком: ${Math.round(m.k)} ккал · Б ${Math.round(m.p)} г · Ж ${Math.round(m.f)} г · У ${Math.round(m.c)} г</div>
        ${extraArr.length?`<div class="added-list">${extraArr.map((x,xi)=>`<div class="added-item"><span>${x.name} · ${x.g} г</span><b>${Math.round(x.k)} ккал <button class="del-x" data-xi="${xi}" title="Убрать">×</button></b></div>`).join("")}<div class="mm">Добавлено в этот приём: +${Math.round(extraK)} ккал</div></div>`:""}
        <div class="meal-actions">
          <button class="small-btn" data-swap title="Заменить это блюдо другим">🔁 Заменить</button>
          <button class="small-btn" data-add>➕ Я поел</button>
          <button class="small-btn" data-done>${done?"✅ Приготовлено":"Отметить: приготовил"}</button>
        </div>
      </div>`;
    el.querySelector(".meal-head").onclick=()=>el.classList.toggle("open");
    el.querySelector("[data-done]").onclick=(ev)=>{ ev.stopPropagation();
      if(state.diary[key]) delete state.diary[key]; else state.diary[key]=true;
      save(); renderPlan(dayIdx); };
    el.querySelector("[data-swap]").onclick=(ev)=>{ ev.stopPropagation(); swapMeal(dayIdx, mi); };
    el.querySelector("[data-add]").onclick=(ev)=>{ ev.stopPropagation(); openAddFood(dayIdx, mi); };
    el.querySelectorAll(".del-x").forEach(b=>b.onclick=(ev)=>{ ev.stopPropagation();
      state.extra[key].splice(+b.dataset.xi,1); if(!state.extra[key].length) delete state.extra[key];
      save(); renderPlan(dayIdx); });
    box.appendChild(el);
  });
}
function round1(v){ return Math.round(v*10)/10; }
function MEAL_TAG(mi,total){ return total===4 ? ["Завтрак","Обед","Полдник","Ужин"][mi] : ["Завтрак","Обед","Ужин"][mi]; }

function searchFoods(query){
  const qToks = normFood(query).filter(w=>w.length>=2);
  if(!qToks.length) return [];
  const idx = allFoodsIndex();
  return Object.keys(idx).filter(name=>{
    const nToks = normFood(name);
    return qToks.every(qt=>nToks.some(nt=>nt.startsWith(qt)));
  }).slice(0,8);
}
let addCtx = null; // {dayIdx, mealIdx}
function allFoodsIndex(){
  // единый индекс для поиска: справочник + рецепты + свои продукты
  const idx = {};
  for(const [name,n] of Object.entries(FOODS)) idx[name]=n;
  for(const [name,e] of Object.entries(EXTRA_FOODS)) if(!idx[name]) idx[name]=e.n;
  for(const [name,n] of Object.entries(state.customFoods||{})) idx[name]=n;
  return idx;
}
function openAddFood(dayIdx, mealIdx){
  addCtx = {dayIdx, mealIdx};
  $("addFoodTitle").textContent = `Что вы съели? (${MEAL_TAG(mealIdx,state.params.meals)}, ${state.plan[dayIdx].day})`;
  $("addFoodName").value=""; $("addFoodGrams").value="";
  $("addFoodNut").innerHTML='<p class="hint">Начните вводить название — приложение само подставит КБЖУ из справочника. Если продукта нет в базе, впишите цифры вручную и сохраните как «свой».</p>';
  $("addFoodSave").disabled=true;
  go("addfood");
  setTimeout(()=>$("addFoodName").focus(), 50);
}
let lastMatch=null;
$("addFoodName").addEventListener("input", ()=>{
  const q = $("addFoodName").value;
  lastMatch=null;
  if(q.length<2){ $("addFoodNut").innerHTML='<p class="hint">Начните вводить название…</p>'; $("addFoodSave").disabled=true; return; }
  const hits = searchFoods(q);
  if(!hits.length){ showCustomForm("Продукт не найден в базе. Введите КБЖУ на 100 г сами — сохраним его в ваши продукты."); $("addFoodSave").disabled=false; return; }
  // показываем варианты; клик по варианту фиксирует
  $("addFoodNut").innerHTML='<div class="suggests">'+hits.map(h=>
    `<button class="sug" data-food="${h.replace(/"/g,"&quot;")}">${h} <span>${Math.round(allFoodsIndex()[h][0])} ккал/100г</span></button>`).join("")+"</div>";
  $("addFoodNut").querySelectorAll(".sug").forEach(b=>b.onclick=()=>chooseFood(b.dataset.food));
});
function chooseFood(name){
  lastMatch = name;
  const n = allFoodsIndex()[name];
  $("addFoodNut").innerHTML=`<div class="picked">✅ ${name} — выбрано<br><span class="hint">КБЖУ на 100 г: ${Math.round(n[0])} ккал · Б ${n[1]} · Ж ${n[2]} · У ${n[3]}</span></div>`;
  $("addFoodSave").disabled=false;
}
function showCustomForm(msg){
  $("addFoodNut").innerHTML=`<p class="hint">${msg}</p>
    <div class="row">
      <div><label>Ккал / 100 г</label><input type="number" id="cfK" min="0" max="900" inputmode="decimal"></div>
      <div><label>Белки</label><input type="number" id="cfP" min="0" max="100" inputmode="decimal"></div>
    </div>
    <div class="row">
      <div><label>Жиры</label><input type="number" id="cfF" min="0" max="100" inputmode="decimal"></div>
      <div><label>Углеводы</label><input type="number" id="cfC" min="0" max="100" inputmode="decimal"></div>
    </div>
    <label style="margin-top:8px"><input type="checkbox" id="cfKeep" checked style="width:auto;margin-right:6px"> Сохранить этот продукт в мои (чтобы в следующий раз подставилось само)</label>`;
}
$("addFoodSave").addEventListener("click", ()=>{
  if(!addCtx) return;
  const nameRaw = $("addFoodName").value.trim();
  if(!nameRaw){ alert("Введите название продукта"); return; }
  const g = +$("addFoodGrams").value;
  if(!(g>0)){ alert("Укажите, сколько граммов съели"); return; }
  let nut=null, keepName=nameRaw;
  if(lastMatch){ nut = allFoodsIndex()[lastMatch]; keepName=lastMatch; }
  else {
    const k=+$("cfK")?.value, p=+$("cfP")?.value, f=+$("cfF")?.value, c=+$("cfC")?.value;
    if(!(k>=0)||isNaN(p)||isNaN(f)||isNaN(c)){ alert("Заполните КБЖУ (калории обязательны)"); return; }
    nut=[k,p||0,f||0,c||0];
    if($("cfKeep")?.checked){ state.customFoods[nameRaw]=nut; }
  }
  const item={name:keepName, g, k:nut[0]*g/100, p:nut[1]*g/100, f:nut[2]*g/100, c:nut[3]*g/100};
  const key=`${addCtx.dayIdx}-${addCtx.mealIdx}`;
  (state.extra[key]=state.extra[key]||[]).push(item);
  save(); go("plan"); renderPlan(addCtx.dayIdx);
});
$("addFoodCancel").addEventListener("click", ()=>go("plan"));

// ---------- список покупок (с ценами Пятёрочка/Магнит) ----------
function storeSearchUrl(store, name){
  const clean = normFood(name).join(" ");            // «Сметана (или йогурт)» -> «сметана или йогурт»
  const short = clean.split(" ").slice(0,2).join(" "); // первые два слова — точнее для поиска сети
  const q = encodeURIComponent(short);
  return store==="magnit" ? `https://magnit.ru/search/?query=${q}` : `https://5ka.ru/search/?text=${q}`;
}
function buildShoppingList(){
  const agg={}; // название -> {g, meals:[блюда]}
  state.plan.forEach(d=>d.meals.forEach(m=>{ if(m.empty) return;
    m.ing.forEach(([n,g])=>{ if(!agg[n]) agg[n]={g:0, dishes:new Set()}; agg[n].g += g; agg[n].dishes.add(m.name); });
  }));
  return Object.entries(agg)
    .map(([n,v])=>({n, g:v.g, dishes:[...v.dishes]}))
    .sort((a,b)=>b.g-a.g);
}
function priceOf(item, store){
  // возвращает {packG, price} для типичной упаковки; null если продукта нет в SHOP
  const row = SHOP[item.n];
  if(!row) return null;
  const packG = row[0], price = store==="magnit" ? row[2] : row[1];
  return {packG, price};
}
function renderShopping(){
  const list=buildShoppingList();
  const el=$("shopList");
  const store = state.shopStore||"5ka";
  const storeName = store==="magnit" ? "Магнит" : "Пятёрочка";
  if(!list.length){ el.innerHTML='<p class="hint">Сначала сгенерируйте меню.</p>'; wireShopToggle(); return; }
  let total=0, known=0;
  el.innerHTML=`<div class="seg shop-seg" id="storeSeg">
      <button data-store="5ka" class="${store==="5ka"?"on":""}">🅿️ Пятёрочка</button>
      <button data-store="magnit" class="${store==="magnit"?"on":""}">🛈 Магнит</button>
    </div>
    <ul class="ing shop-list">${list.map(({n,g},i)=>{
      const pr=priceOf({n}, store);
      let right;
      if(pr){ const packs=Math.max(1, Math.ceil(g/pr.packG)); const cost=packs*pr.price; total+=cost; known++;
        right=`<span class="shop-price">${g} г<br><small>≈${packs}×${pr.packG} г · ${Math.round(cost)} ₽</small></span>`; }
      else right=`<span>${g} г</span>`;
      return `<li data-i="${i}"><span>▢ ${n} <a class="shop-link" href="${storeSearchUrl(store,n)}" target="_blank" rel="noopener" title="Найти в ${storeName}">🔎</a></span>${right}</li>`;
    }).join("")}</ul>
    <p class="hint" style="margin-top:8px">Цены примерные (средние по сети), реальная цена зависит от города и дня. 🔎 — поиск товара на сайте ${storeName}. Итого ориентировочно: <b>${Math.round(total)} ₽</b> за ${known} из ${list.length} позиций (остальные без точной цены).</p>
    <p class="hint">Нажимайте на строку, чтобы отмечать купленное.</p>`;
  el.querySelectorAll("li").forEach(li=>li.addEventListener("click",(ev)=>{
    if(ev.target.closest("a")) return; // клик по ссылке — не отметка
    li.style.textDecoration = li.style.textDecoration ? "" : "line-through";
    li.style.opacity = li.style.opacity==="0.5" ? "1" : "0.5";
  }));
  wireShopToggle();
  // копирование текстом в мессенджер
  $("shopCopy").onclick=()=>{
    const txt = list.map(({n,g})=>`▢ ${n} — ${g} г`).join("\n");
    navigator.clipboard?.writeText(`🛒 Список покупок на неделю (${storeName}):\n`+txt+`\n\nОриентировочно: ${Math.round(total)} ₽`)
      .then(()=>{ $("shopCopy").textContent="✅ Скопировано"; setTimeout(()=>$("shopCopy").textContent="📋 Скопировать список",1500); });
  };
}
function wireShopToggle(){
  const seg=$("storeSeg"); if(!seg) return;
  seg.querySelectorAll("button").forEach(b=>b.onclick=()=>{ state.shopStore=b.dataset.store; save(); renderShopping(); });
}
$("#shopBtn").addEventListener("click", ()=>{ renderShopping(); go("shop"); });

// ---------- дневник ----------
function renderDiary(){
  const box=$("diaryList"); box.innerHTML="";
  const keys=Object.keys(state.diary);
  const extraKeys=Object.keys(state.extra).filter(k=>state.extra[k]?.length);
  if(!keys.length && !extraKeys.length){ box.innerHTML='<p class="hint">Пока пусто. Отмечайте блюда во вкладке «Меню» и добавляйте еду кнопкой «➕ Я поел».</p>'; return; }
  // группировка по дням плана
  let tot=0;
  state.plan.forEach((d,di)=>{
    d.meals.forEach((m,mi)=>{
      if(state.diary[`${di}-${mi}`] && !m.empty){
        tot+=m.k;
        const row=document.createElement("div"); row.className="log-item";
        row.innerHTML=`<span>${d.day}: ${m.name}</span><b>${Math.round(m.k)} ккал</b>`;
        box.appendChild(row);
      }
      (state.extra[`${di}-${mi}`]||[]).forEach(x=>{
        tot+=x.k;
        const row=document.createElement("div"); row.className="log-item";
        row.innerHTML=`<span>${d.day}: ➕ ${x.name}, ${x.g} г</span><b>${Math.round(x.k)} ккал</b>`;
        box.appendChild(row);
      });
    });
  });
  const sum=document.createElement("div"); sum.className="log-item"; sum.style.fontWeight="700";
  sum.innerHTML=`<span>Итого по факту</span><b>${Math.round(tot)} ккал</b>`;
  box.appendChild(sum);
}
$("#resetDiary").addEventListener("click", ()=>{ state.diary={}; state.extra={}; save(); renderDiary(); });

// ---------- навигация ----------
function go(v){
  state.view=v; save();
  ["setup","plan","diary","shop","settings","addfood"].forEach(x=>{ const el=$("view-"+x); if(el) el.classList.toggle("hidden", x!==v); });
  document.querySelectorAll("footer button").forEach(b=>b.classList.toggle("on", b.dataset.go===v));
  if(v==="plan"){ if(!state.plan){go("setup");return;} renderPlan(state.day||0); }
  if(v==="shop" && !state.plan){ go("setup"); return; }
  if(v==="diary"){ if(!state.plan){go("setup");return;} renderDiary(); }
  if(v==="settings") renderSettings();
  window.scrollTo(0,0);
}
document.querySelectorAll("footer button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));

// ---------- вкладка «Настроить»: аллергии / нельзя ----------
function renderSettings(){
  const box=$("forbList");
  const sugg=["Глютен","Молоко","Яйцо","Рыба","Орехи","Мёд","Сметана","Печень"];
  box.innerHTML = (state.forbidden.length?
    state.forbidden.map((f,i)=>`<div class="forb-item"><span>🚫 ${f}</span><button class="del-x" data-i="${i}" title="Убрать">×</button></div>`).join("")
    : '<p class="hint">Список пуст — меню генерируется из всех рецептов.</p>')+
    `<p class="hint" style="margin-top:12px">Быстрое добавление:</p><div class="suggests">`+
    sugg.filter(s=>!state.forbidden.some(f=>normFood(f).includes(normFood(s)[0]))).map(s=>`<button class="sug" data-add-forb="${s}">${s}</button>`).join("")+"</div>";
  box.querySelectorAll(".del-x").forEach(b=>b.onclick=()=>{ state.forbidden.splice(+b.dataset.i,1); afterForbChange(); });
  box.querySelectorAll("[data-add-forb]").forEach(b=>b.onclick=()=>{ addForbidden(b.dataset.addForb); });
  $("forbInput").value="";
}
function addForbidden(raw){
  const v=(raw!==undefined?raw:$("forbInput").value).trim();
  if(!v) return;
  if(state.forbidden.some(f=>f.toLowerCase()===v.toLowerCase())){ $("forbInput").value=""; return; }
  state.forbidden.push(v);
  afterForbChange();
}
function afterForbChange(){
  save();
  // перегенерировать план с тем же seed — привычные дни не «прыгают», просто запрещённое исчезает
  if(state.params){ buildPlan(); }
  renderSettings();
}
$("forbAddBtn").addEventListener("click", ()=>addForbidden());
$("forbInput").addEventListener("keydown", e=>{ if(e.key==="Enter") addForbidden(); });

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
