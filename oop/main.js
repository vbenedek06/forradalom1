// Létrehozunk egy <hr> (horizontális vonal) elemet, amely vizuálisan elválasztja az OOP alapú struktúrát a sima megvalósítástól.
// Ez segít a HTML fejlesztői nézetben könnyebben azonosítani az OOP-ből származó elemeket.
const elvalaszto = document.createElement('hr');

// A létrehozott elválasztó vonalat hozzáadjuk a dokumentum <body> részéhez, így az megjelenik az oldalon.
document.body.appendChild(elvalaszto);

// Létrehozunk egy új 'table' osztályú div elemet az Area osztály segítségével.
// Ez az OOP alapú struktúrához tartozó táblázat szekció megjelenítésére szolgál.
const table = new Tablazat('table');

// Létrehozunk egy új 'form' osztályú div elemet az Area osztály segítségével.
// Ez az OOP alapú struktúrához tartozó űrlap szekció megjelenítésére szolgál.
const forms = new Urlap('form');