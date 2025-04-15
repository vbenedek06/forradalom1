// Létrehozunk egy <hr> (horizontális vonal) elemet, amely vizuálisan elválasztja az OOP alapú struktúrát a sima megvalósítástól.
// Ez segít a HTML fejlesztői nézetben könnyebben azonosítani az OOP-ből származó elemeket.
const elvalaszto = document.createElement('hr');

// A létrehozott elválasztó vonalat hozzáadjuk a dokumentum <body> részéhez, így az megjelenik az oldalon.
document.body.appendChild(elvalaszto);

// Létrehozunk egy tömböt, amely az űrlap mezőinek beállításait tartalmazza, mint az ID-k és a címkék.
// Minden objektum tartalmazza az adott mező egyedi azonosítóját ('fieldid') és annak címkéjét ('fieldLabel').
const mezoBeall = [
    { fieldid: 'revolution', fieldLabel: 'forradalom' }, // Egy objektum amely a 'name' mezőhöz tartozó azonosítót és címkét tartalmazza
    { fieldid: 'year', fieldLabel: 'evszam' }, // Egy objektum amely a 'birth'  mezőhöz tartozó azonosítót és címkét tartalmazza
    { fieldid: 'successful', fieldLabel: 'sikeres' } // Egy objektum amely az 'zipcode' mezőhöz tartozó azonosítót és címkét tartalmazza
    
]

const manager = new RevolutionHandler();
// Létrehozunk egy új példányt a 'Tablazat' osztályból, amely egy táblázatot reprezentál.
// A 'table' osztályú div elemet hozunk létre, amely az OOP alapú struktúrához tartozik,
const revolution = new Revolution;
const table = new Tablazat('table',manager);

// Létrehozunk egy új példányt az 'Urlap' osztályból, amely egy űrlapot reprezentál.
// Az 'form' osztályú div elemet hozunk létre, amely az OOP alapú struktúrához tartozik, és az űrlapok kezelésére szolgál.
// Az űrlap mezőinek beállításait (fieldid és fieldLabel) a mezoBeall tömb tartalmazza.
const forms = new Urlap('form', mezoBeall,manager);
const fileUplad = new FeltoltesLetoltes('upload', manager);
const filterOop = new Filter('filter', manager);//létrehoz egy új példányt a `Filter` osztályból, amely egy szűrő űrlapot reprezentál.
// - Az első paraméter ('filter') a CSS osztálynév, amelyet a szűrőhöz tartozó div elemhez rendel.
// - A második paraméter (`manager`) egy `RevolutionHandler` példány, amely a forradalmak kezeléséért felel.