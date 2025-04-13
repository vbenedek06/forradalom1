/**
 * Létrehoz egy div HTML elemet a megadott CSS osztállyal.
 * @param {string} osztaly - A div elemhez rendelt CSS osztály neve.
 * @returns {HTMLDivElement} - A létrehozott div HTML elemet adja vissza.
 * @callback letrehozDiv
 */
const letrehozDiv = (osztaly) => {
    // A 'document.createElement' metódussal egy új <div> elemet hozunk létre.
    const d = document.createElement('div');
    
    // Az újonnan létrehozott <div> elem 'className' attribútumát beállítjuk
    // a függvény paraméterként kapott 'osztaly' értékére, hogy a megfelelő CSS stílusok érvényesülhessenek.
    d.className = osztaly;
    
    // A konfigurált <div> elemet visszaadjuk, így a hívó kód később felhasználhatja azt.
    return d;
};

// Létrehozzuk a fő konténerelemet, amely minden további elemet tárol majd.
// A 'container' osztálynév itt azt jelzi, hogy ez az elem az oldal fő tartója.
const kont = letrehozDiv('container');

// A 'document.body.appendChild' metódussal a létrehozott konténer elemet hozzáadjuk a dokumentum <body> részéhez,
// így a böngészőben megjelenik a kialakított fő tartó.
document.body.appendChild(kont);

// Létrehozunk egy elemet a táblázatos adatok megjelenítésére.
// A 'table' osztálynév azt jelöli, hogy ide kerül a táblázat vagy listázott adatok.
const tabl = letrehozDiv('table');

// Létrehozunk egy elemet az űrlap (adatbevitel) megjelenítéséhez.
// A 'form' osztálynév alapján itt fognak elhelyezkedni a beviteli mezők és kapcsolódó elemek.
const form = letrehozDiv('form');

// A 'kont.appendChild' metódussal a táblázatot tartalmazó elemet (tabl) hozzáadjuk a fő konténerhez,
// így a táblázat szekció az oldal fő részévé válik.
kont.appendChild(tabl);

// Szintén a fő konténerhez hozzáadjuk az űrlapot tartalmazó elemet (form),
// így a felület részeként az űrlap is megjelenik a felhasználó számára.
kont.appendChild(form);