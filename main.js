
const tomb = [];

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
const kont = letrehozDiv('container-sima');

// A 'document.body.appendChild' metódussal a létrehozott konténer elemet hozzáadjuk a dokumentum <body> részéhez,
// így a böngészőben megjelenik a kialakított fő tartó.
document.body.appendChild(kont);

// Létrehozunk egy elemet a táblázatos adatok megjelenítésére.
// A 'table' osztálynév azt jelöli, hogy ide kerül a táblázat vagy listázott adatok.
const tabl = letrehozDiv('table');

// Létrehozzuk magát a <table> HTML elemet, amely a táblázat struktúráját adja
const tablaElem = document.createElement('table');

// A <table> elemet beágyazzuk a táblázat divbe
tabl.appendChild(tablaElem);

// Létrehozzuk a táblázat fejléceit tartalmazó <thead> részt
const fejlec = document.createElement('thead');

// A <thead> elemet hozzáadjuk a táblázathoz
tablaElem.appendChild(fejlec);

// Létrehozunk egy sort (<tr>) a fejlécen belül
const fejlecSor = document.createElement('tr');

// A sort hozzáadjuk a fejléc (<thead>) elemhez
fejlec.appendChild(fejlecSor);

// A fejléc cellák tartalmát tömbben definiáljuk
const fejlecMezok = ['forradalom', 'évszám', 'sikeres'];

// Végigmegyünk a mezőkön, és létrehozzuk a <th> cellákat a sorban
for (const szoveg of fejlecMezok) {
    // Egy új <th> cella létrehozása
    const cella = document.createElement('th');
    
    // A cella szövegének beállítása
    cella.innerText = szoveg;
    
    // A cellát hozzáadjuk a fejléc sorához
    fejlecSor.appendChild(cella);
}

// Létrehozzuk a <tbody> részt, ahol a dinamikusan hozzáadott adatok fognak megjelenni
const tablaTest = document.createElement('tbody');

// A <tbody> elemet hozzáadjuk a táblázathoz
tablaElem.appendChild(tablaTest);


// Létrehozunk egy elemet az űrlap (adatbevitel) megjelenítéséhez: egy div-et, mely az űrlapot tartalmazza
const formD = letrehozDiv('form');

// Létrehozunk egy <form> elemet, amelybe az űrlap elemek kerülnek
const urlap = document.createElement('form');
// FONTOS: A <form> elemet a már létrehozott formD div-hez kell hozzáfűzni,
// nem egy nem létező "urlapDiv"-hez!
formD.appendChild(urlap);

// Definiáljuk az űrlap mezőit tartalmazó tömböt, ahol minden objektum egy mező adatait tartalmazza
const mezoAdatLista = [
    { fieldid: 'revolution', fieldLabel: 'forradalom' }, // Egy objektum amely a 'name' mezőhöz tartozó azonosítót és címkét tartalmazza
    { fieldid: 'year', fieldLabel: 'evszam' }, // Egy objektum amely a 'birth'  mezőhöz tartozó azonosítót és címkét tartalmazza
    { fieldid: 'successful', fieldLabel: 'sikeres' } // Egy objektum amely az 'zipcode' mezőhöz tartozó azonosítót és címkét tartalmazza
];

// Végigmegyünk a mezoAdatLista tömb minden egyes elemén (egy mező konfiguráción)
// A ciklus minden lépésében a `mezo` változó az aktuális objektumot tartalmazza (pl. { fieldid: 'year', fieldLabel: 'evszam' })
for (const mezo of mezoAdatLista) {

    // Létrehozunk egy új <div> elemet, amely az aktuális beviteli mező köré kerül
    // Ez a div segít strukturálni és szétválasztani a mezőket vizuálisan (pl. külön sorba helyezni)
    const mezoDiv = letrehozDiv('field');

    // Az előbb létrehozott divet hozzáadjuk a <form> elemhez, vagyis mostantól része lesz az űrlapnak
    urlap.appendChild(mezoDiv);

    // Létrehozunk egy <label> elemet, ami a beviteli mező felirata lesz (pl. "évszám")
    const cimke = document.createElement('label');

    // Beállítjuk a címke 'for' attribútumát, hogy kapcsolódjon a hozzá tartozó input elemhez
    // Ez az attribútum segít az elérhetőségben, és lehetővé teszi, hogy a címkére kattintva fókuszba kerüljön a mező
    cimke.htmlFor = mezo.fieldid;

    // A címke látható szövegét beállítjuk az aktuális mezőhöz tartozó címkére (pl. 'évszam')
    cimke.textContent = mezo.fieldLabel;

    // A címkét hozzáadjuk a divhez, tehát megjelenik a mező felett/szélén
    mezoDiv.appendChild(cimke);

    // Hozzáadunk egy <br> (sortörés) elemet, hogy az input mező a címke alatt jelenjen meg
    mezoDiv.appendChild(document.createElement('br'));

    // Ellenőrizzük, hogy az aktuális mező a 'sikeres' mező-e, mert ez speciális kezelésű: nem szöveg, hanem legördülő
    if (mezo.fieldid === 'successful') {

        // Létrehozunk egy <select> elemet, ami egy legördülő menüt képvisel
        const legordulo = document.createElement('select');

        // Beállítjuk az ID-ját, hogy egyedi legyen és lehessen rá hivatkozni (pl. label, JS műveletek)
        legordulo.id = mezo.fieldid;

        // Létrehozzuk az első opciót: 'igen', ami azt jelzi, hogy sikeres volt a forradalom
        const opcioIgen = document.createElement('option');
        opcioIgen.value = 'yes'; // A program által kezelt érték
        opcioIgen.textContent = 'igen'; // A felhasználó által látott felirat

        // Hozzáadjuk az 'igen' opciót a <select> (legördülő) elemhez
        legordulo.appendChild(opcioIgen);

        // Létrehozzuk a második opciót: 'nem', ami azt jelenti, hogy nem volt sikeres
        const opcioNem = document.createElement('option');
        opcioNem.value = 'no'; // Programozás szempontjából ez az érték kerül továbbításra
        opcioNem.textContent = 'nem'; // A felhasználó ezt fogja látni a listában

        // A 'nem' opciót is hozzáadjuk a legördülőhöz
        legordulo.appendChild(opcioNem);

        // Végül a kész legördülő mezőt is hozzáadjuk a mező-divhez
        mezoDiv.appendChild(legordulo);
    } else {
        // Ha az aktuális mező nem 'sikeres', akkor egy sima szöveges input mezőt hozunk létre

        // Létrehozunk egy <input> elemet (pl. forradalom neve vagy évszám megadására)
        const inputElem = document.createElement('input');

        // Beállítjuk az input mező ID-ját, hogy hivatkozni lehessen rá (pl. label vagy JS kód által)
        inputElem.id = mezo.fieldid;

        // Hozzáadjuk az input mezőt a megfelelő divhez
        mezoDiv.appendChild(inputElem);
    }
}


// Létrehozunk egy <button> elemet, mely lehetővé teszi az adat beküldését vagy egy sor hozzáadását
const gomb = document.createElement('button');
// Beállítjuk a gomb szövegét, hogy a felhasználó számára egyértelmű legyen a funkciója
gomb.textContent = 'hozzáadás';
// Hozzáadjuk a gombot a <form> elemhez
urlap.appendChild(gomb);
// Hozzáadunk egy eseményfigyelőt a <form> elemhez, amely akkor fut le, amikor a felhasználó beküldi az űrlapot.
urlap.addEventListener('submit', (esemeny) => {

    // Megakadályozzuk az űrlap alapértelmezett viselkedését (ne töltse újra az oldalt).
    esemeny.preventDefault();

    // Létrehozunk egy üres objektumot, amibe az űrlapmezők adatait fogjuk gyűjteni.
    const urlapAdatokObjektum = {};

    // Lekérjük az összes <input> mezőt, amely az eseményt kiváltó <form>-on belül található.
    const inputMezok = esemeny.target.querySelectorAll('input');

    // Végigmegyünk az összes <input> mezőn, és az ID-ját kulcsként, az értékét pedig értékként eltároljuk az objektumban.
    for (const inputMezo of inputMezok) {
        urlapAdatokObjektum[inputMezo.id] = inputMezo.value;
    }

    // Lekérjük az egyetlen <select> mezőt az űrlapon belül.
    const selectElem = esemeny.target.querySelector('select');

    // A legördülő mező értékét is hozzáadjuk az objektumhoz (pl. "yes" vagy "no").
    urlapAdatokObjektum[selectElem.id] = selectElem.value;

    // Az összegyűjtött adatokat (az objektumot) elmentjük egy globális tömbbe, hogy később is elérhető legyen.
    tomb.push(urlapAdatokObjektum);

    // Létrehozunk egy új táblázatsort (<tr>), amely majd a <tbody> részhez kerül.
    const tablaTorzsSor = document.createElement('tr');

    // Hozzáadjuk a létrehozott sort a táblázat törzséhez (tbody).
    tablaTest.appendChild(tablaTorzsSor);

    // Létrehozunk egy új <td> cellát a 'revolution' mező adatának (pl. 1848).
    const forradalomCell = document.createElement('td');

    // Beállítjuk a cella szövegét a beküldött adat alapján.
    forradalomCell.textContent = urlapAdatokObjektum.revolution;

    // Hozzáadjuk ezt a cellát a sorhoz.
    tablaTorzsSor.appendChild(forradalomCell);

    // Létrehozunk egy új <td> cellát az 'year' mező adatának.
    const evszamCell = document.createElement('td');

    // Beállítjuk a cella tartalmát a megfelelő évszám értékre.
    evszamCell.textContent = urlapAdatokObjektum.year;

    // Hozzáadjuk az évszám cellát a táblázatsorhoz.
    tablaTorzsSor.appendChild(evszamCell);

    // Létrehozunk egy új <td> cellát a 'successful' mező adatának (sikeres volt-e a forradalom).
    const sikeresCell = document.createElement('td');

    // A sikeresség értékét "igen" vagy "nem" formában jelenítjük meg a cellában a 'yes'/'no' érték alapján.
    sikeresCell.textContent = urlapAdatokObjektum.successful === 'yes' ? 'igen' : 'nem';

    // Hozzáadjuk a sikerességet tartalmazó cellát a sorhoz.
    tablaTorzsSor.appendChild(sikeresCell);
});



kont.appendChild(tabl);   // a táblázatos rész hozzáadása
kont.appendChild(formD);  // az űrlapos rész hozzáadása