// Definiáljuk az Adat típusát, amely tartalmazza a forradalom, évszám és sikeresség adatokat
/** 
 * @typedef {Object} Adat // Az adatok típusdefiníciója
 * @property {string} revolution - A forradalom neve
 * @property {string} year - Az évszám karakterláncként
 * @property {boolean} successful - A forradalom sikerességének logikai értéke
 */

// Definiáljuk a callback típusát, amelyet a táblázat törzsének kezelésére használunk
/** 
 * @callback TablaCallback
 * @param {HTMLTableSectionElement} tablaTest - A táblázat törzsét reprezentáló HTML elem
 * @returns {void}
 */

// Inicializálunk egy üres tömböt az Adat típusú objektumok tárolására
/** @type {Array<Adat>} */ const tomb = []; // Üres tömb létrehozása Adat típusú elemek számára

/**
 * Létrehoz egy div elemet a megadott osztálynévvel.
 * @param {string} osztaly - A div osztályneve.
 * @returns {HTMLDivElement} - A létrehozott div elem.
 */
const letrehozDiv = (osztaly) => { // Függvény: div létrehozása adott osztállyal
    const div = document.createElement('div'); // Létrehoz egy új div elemet a dokumentumból
    div.className = osztaly; // Beállítja a div osztálynevét a paraméterként kapott értékre
    return div; // Visszaadja a létrehozott div elemet
};

/**
 * Táblázat létrehozása és inicializálása.
 * @param {HTMLElement} kont - A táblázatot tartalmazó konténer.
 * @param {TablaCallback} callback - A táblázat törzsének kezelésére szolgáló callback függvény.
 */
const letrehozTabla = (kont, callback) => { // Függvény: táblázat létrehozása a megadott konténerben, majd callback meghívása a táblázat törzsére
    const tabl = letrehozDiv('table'); // Létrehoz egy div-et a 'table' osztállyal a táblázat környezetének
    kont.appendChild(tabl); // Hozzáfűzi az előbb létrehozott div-et a konténerhez

    const tablaElem = document.createElement('table'); // Létrehoz egy <table> elemet a dokumentumból
    tabl.appendChild(tablaElem); // Az elkészített table elemet hozzáadja a div-hez

    const fejlec = document.createElement('thead'); // Létrehoz egy <thead> elemet a táblázat fejlécéhez
    tablaElem.appendChild(fejlec); // Hozzáadja a fejléct a table elemhez

    const fejlecSor = document.createElement('tr'); // Létrehoz egy sort (<tr>) a fejléc számára
    fejlec.appendChild(fejlecSor); // A sort hozzáfűzi a thead elemhez

    const fejlecMezok = ['forradalom', 'évszám', 'sikeres']; // Definiálja a fejléc cellák szövegét tartalmazó tömböt
    for (const szoveg of fejlecMezok) { // Végigiterál a fejléc mezőkön
        const cella = document.createElement('th'); // Létrehoz egy fejléccella elemet (<th>)
        cella.innerText = szoveg; // Beállítja a cella szövegét az aktuális értékre
        fejlecSor.appendChild(cella); // Hozzáfűzi a fejléccellát a fejléc sorához
    }

    const tablaTest = document.createElement('tbody'); // Létrehoz egy <tbody> elemet a táblázat törzséhez
    tablaElem.appendChild(tablaTest); // Hozzáadja a tbody-t a table elemhez

    callback(tablaTest); // Meghívja a callback függvényt, átadva neki a táblázat törzsét
};

/**
 * Új sor hozzáadása a táblázathoz.
 * @param {Adat} adat - Az adat objektum, mely tartalmazza a forradalom, évszám és sikeres értékeket.
 * @param {HTMLTableSectionElement} tablaTest - A táblázat törzsét reprezentáló HTML elem.
 */
const hozzaadSor = (adat, tablaTest) => { // Függvény: új sor beszúrása a táblázat törzsébe az adott adatokkal
    const tablaSor = document.createElement('tr'); // Létrehoz egy új sort (<tr>) a táblázat számára
    tablaTest.appendChild(tablaSor); // Hozzáfűzi az új sort a táblázat törzséhez

    const forradalomCell = document.createElement('td'); // Létrehoz egy cellát (<td>) a forradalom adat megjelenítéséhez
    forradalomCell.textContent = adat.revolution; // Beállítja a cella tartalmát az adat "revolution" értékére
    tablaSor.appendChild(forradalomCell); // A cellát hozzáadja az aktuális sorhoz

    const evszamCell = document.createElement('td'); // Létrehoz egy cellát (<td>) az évszám adat megjelenítéséhez
    evszamCell.textContent = adat.year; // Beállítja a cella tartalmát az adat "year" értékére
    tablaSor.appendChild(evszamCell); // Hozzáfűzi a cellát az aktuális sorhoz

    const sikeresCell = document.createElement('td'); // Létrehoz egy cellát (<td>) a sikeresség adat megjelenítéséhez
    sikeresCell.textContent = adat.successful ? 'igen' : 'nem'; // Kiértékeli: ha az adat sikeres, "igen", egyébként "nem"
    tablaSor.appendChild(sikeresCell); // Hozzáadja a cellát az aktuális sorhoz
};

/**
 * Űrlap létrehozása és kezelése.
 * @param {HTMLElement} kont - A konténer, amely az űrlapot tartalmazza.
 * @param {HTMLTableSectionElement} tablaTest - A táblázat törzsét reprezentáló HTML elem, ahová az adatok kerülnek.
 */
const letrehozUrlap = (kont, tablaTest) => { // Függvény: űrlap létrehozása és kezelése a megadott konténerben
    const formD = letrehozDiv('form'); // Létrehoz egy div-et 'form' osztállyal az űrlap környezetéhez
    kont.appendChild(formD); // Hozzáadja az űrlap div-et a konténerhez

    const urlap = document.createElement('form'); // Létrehoz egy <form> elemet a dokumentumból
    formD.appendChild(urlap); // Hozzáadja a form elemet a létrehozott div-hez

    // Mezőadatok tömb létrehozása, mely meghatározza az űrlap mezőinek azonosítóját és címkéjét
    const mezoAdatLista = [ // Definiál egy tömböt az űrlap mezőinek adataival
        { fieldid: 'revolution', fieldLabel: 'forradalom' }, // Első mező: forradalom
        { fieldid: 'year', fieldLabel: 'évszám' }, // Második mező: évszám
        { fieldid: 'successful', fieldLabel: 'sikeres' } // Harmadik mező: sikeres
    ];

    for (const mezo of mezoAdatLista) { // Végigiterál a definiált mezőadatokon
        const mezoDiv = letrehozDiv('field'); // Létrehoz egy div-et 'field' osztállyal az aktuális mező számára
        urlap.appendChild(mezoDiv); // Hozzáadja a mező div-et a form elemhez

        const cimke = document.createElement('label'); // Létrehoz egy <label> elemet a mező címkéjeként
        cimke.htmlFor = mezo.fieldid; // Beállítja a label kapcsolódását az input azonosítójához
        cimke.textContent = mezo.fieldLabel; // Beállítja a label szövegét a mező címkéjére
        mezoDiv.appendChild(cimke); // Hozzáadja a label elemet a mező div-hez
        mezoDiv.appendChild(document.createElement('br')); // Hozzáad egy sortörést a címke után

        if (mezo.fieldid === 'successful') { // Ellenőrzi, hogy a mező "successful" típusú-e
            const legordulo = document.createElement('select'); // Létrehoz egy <select> elemet legördülő lista számára
            legordulo.id = mezo.fieldid; // Beállítja a select azonosítóját a mező fieldid értékére

            const opcioIgen = document.createElement('option'); // Létrehoz egy <option> elemet a "igen" választáshoz
            opcioIgen.value = 'yes'; // Beállítja az opció értékét "yes"-re
            opcioIgen.textContent = 'igen'; // Beállítja az opció szövegét "igen"-re
            legordulo.appendChild(opcioIgen); // Hozzáadja az opciót a select elemhez

            const opcioNem = document.createElement('option'); // Létrehoz egy <option> elemet a "nem" választáshoz
            opcioNem.value = 'no'; // Beállítja az opció értékét "no"-ra
            opcioNem.textContent = 'nem'; // Beállítja az opció szövegét "nem"-re
            legordulo.appendChild(opcioNem); // Hozzáadja az opciót a select elemhez

            mezoDiv.appendChild(legordulo); // Hozzáadja a select elemet a mező div-hez
        } else { // Ha a mező nem "successful" típusú
            const inputElem = document.createElement('input'); // Létrehoz egy <input> elemet a szövegbevitelhez
            inputElem.id = mezo.fieldid; // Beállítja az input azonosítóját a mező fieldid értékére
            mezoDiv.appendChild(inputElem); // Hozzáadja az input elemet a mező div-hez
        }

        const errorElem = document.createElement('span'); // Létrehoz egy <span> elemet a hibaüzenetek megjelenítéséhez
        errorElem.className = 'error'; // Beállítja a span osztályát "error"-re
        mezoDiv.appendChild(errorElem); // Hozzáadja a hibaüzenet span-t a mező div-hez
    }

    const gomb = document.createElement('button'); // Létrehoz egy <button> elemet az űrlap adatainak beküldéséhez
    gomb.textContent = 'hozzáadás'; // Beállítja a gomb szövegét "hozzáadás"-ra
    urlap.appendChild(gomb); // Hozzáadja a gombot a form elemhez

    urlap.addEventListener('submit', (e) => { // Feliratkozik a form "submit" eseményére
        e.preventDefault(); // Megakadályozza az űrlap alapértelmezett beküldését
        const urlapAdatokObjektum = {}; // Inicializál egy üres objektumot az űrlap adatainak tárolására
        let valid = true; // Beállítja a validálás eredményét alapértelmezetten igazra

        const inputMezok = e.target.querySelectorAll('input, select'); // Lekéri az összes input és select elemet az űrlapon
        for (const inputMezo of inputMezok) { // Végigiterál az összes megtalált űrlapmezőn
            const error = inputMezo.parentElement.querySelector('.error'); // Lekéri a mezőhöz tartozó error span-t
            error.textContent = ''; // Törli az esetleges korábbi hibaüzenetet

            if (inputMezo.value === '') { // Ellenőrzi, hogy az aktuális mező értéke üres-e
                error.textContent = 'Kötelező megadni'; // Beállítja a hibaüzenetet, ha az érték üres
                valid = false; // Az űrlap érvénytelenné válik
            }
            // Az értéket átadja az űrlapAdatokObjektum-nek az input azonosítója alapján; ha "yes", akkor true, ha "no", akkor false, máskülönben az eredeti értéket
            urlapAdatokObjektum[inputMezo.id] = inputMezo.value === 'yes' ? true : inputMezo.value === 'no' ? false : inputMezo.value;
        }

        if (valid) { // Ha az űrlap minden mezője megfelelően kitöltött
            tomb.push(urlapAdatokObjektum); // Hozzáfűzi az új adat objektumot a globális tömbhöz
            hozzaadSor(urlapAdatokObjektum, tablaTest); // Hozzáad egy új sort a táblázathoz az adott adatokkal
            urlap.reset(); // Visszaállítja az űrlapot az alapértelmezett állapotba
        }
    });
};

/**
 * Fájl feltöltésének kezelését valósítja meg.
 * @param {HTMLElement} kont - A konténer, amely tartalmazza a fájl feltöltő elemet.
 * @param {HTMLTableSectionElement} tablaTest - A táblázat törzsét reprezentáló HTML elem, ahová az adatok kerülnek.
 */
const letrehozFajlFeltoltes = (kont, tablaTest) => { // Függvény: fájl feltöltésének kezelése a megadott konténerben
    const fajlInput = document.createElement('input'); // Létrehoz egy <input> elemet a fájlfeltöltéshez
    fajlInput.type = 'file'; // Beállítja az input típusát "file"-ra
    kont.appendChild(fajlInput); // Hozzáadja a fájl input elemet a konténerhez

    fajlInput.addEventListener('change', (e) => { // Feliratkozik a fájl input "change" eseményére
        const fajl = e.target.files[0]; // Lekéri az első kiválasztott fájlt az inputból
        const fajlOlvaso = new FileReader(); // Létrehoz egy FileReader objektumot a fájl tartalmának beolvasására

        fajlOlvaso.onload = () => { // Beállítja a FileReader "onload" eseményét, amely a fájl sikeres beolvasása után fut le
            const sorok = fajlOlvaso.result.split('\n').slice(1); // Felosztja a beolvasott fájl tartalmát sorokra és kihagyja az első sort (fejléc)
            for (const sor of sorok) { // Végigiterál a fájl minden többi során
                const mezok = sor.trim().split(';'); // Levágja a fölösleges szóközöket, majd elválasztja az elemeket ";" alapján
                const adat = { // Létrehoz egy adat objektumot az aktuális sor alapján
                    revolution: mezok[0], // Az első elem értéke a "revolution" tulajdonság
                    year: mezok[1],       // A második elem értéke a "year" tulajdonság
                    successful: mezok[2] === 'igen' // A harmadik elem alapján boolean értéket állít be (igaz, ha "igen")
                };
                tomb.push(adat); // Hozzáfűzi az új adatot a globális tömbhöz
                hozzaadSor(adat, tablaTest); // Hozzáad egy sort a táblázathoz az aktuális adatokkal
            }
        };

        fajlOlvaso.readAsText(fajl); // Elindítja a fájl beolvasását szövegként
    });
};

/**
 * Adatok exportálása CSV fájlba.
 * @param {HTMLElement} kont - A konténer, amely tartalmazza az export gombot.
 */
const letrehozFajlLetoltes = (kont) => { // Függvény: adatok CSV fájlba történő exportálásához szükséges gomb létrehozása
    const exportGomb = document.createElement('button'); // Létrehoz egy <button> elemet az exportáláshoz
    exportGomb.textContent = 'Adatok letöltése'; // Beállítja a gomb szövegét "Adatok letöltése"-re
    kont.appendChild(exportGomb); // Hozzáadja a gombot a konténerhez

    exportGomb.addEventListener('click', () => { // Feliratkozik a gomb "click" eseményére
        // Összeállítja a CSV tartalmat: első sor a fejléc, majd a tömb elemeinek string formátumba rendezett sorai
        const tartalom = ['forradalom;evszam;sikeres', ...tomb.map(adat => `${adat.revolution};${adat.year};${adat.successful ? 'igen' : 'nem'}`)].join('\n');
        const fajl = new Blob([tartalom]); // Létrehoz egy Blob objektumot a CSV tartalommal
        const letoltesLink = document.createElement('a'); // Létrehoz egy <a> elemet a letöltési link számára
        letoltesLink.href = URL.createObjectURL(fajl); // Beállítja a link href-jét a Blob URL-jére
        letoltesLink.download = 'adatok.csv'; // Beállítja a letöltendő fájl nevét
        letoltesLink.click(); // Programozottan rákattint a linkre a letöltés elindításához
        URL.revokeObjectURL(letoltesLink.href); // Felszabadítja a Blob URL által foglalt erőforrásokat
    });
};

/**
 * Szűrő űrlap létrehozása és kezelése.
 * @param {HTMLElement} kont - A konténer, amely tartalmazza a szűrő űrlapot.
 * @param {HTMLTableSectionElement} tablaTest - A táblázat törzsét reprezentáló HTML elem, amelyet szűrni akarunk.
 */
const letrehozSzuroUrlap = (kont, tablaTest) => { // Függvény: szűrő űrlap létrehozása, amely lehetővé teszi a táblázat adatok szűrését
    const filterFormDiv = letrehozDiv('filterForm'); // Létrehoz egy div-et 'filterForm' osztállyal a szűrő űrlap számára
    kont.appendChild(filterFormDiv); // Hozzáadja a filterForm div-et a konténerhez

    const formForFilter = document.createElement('form'); // Létrehoz egy <form> elemet a szűrési művelethez
    filterFormDiv.appendChild(formForFilter); // Hozzáadja a form elemet a filterForm div-hez

    const select = document.createElement('select'); // Létrehoz egy <select> elemet a szűrő opciók számára
    formForFilter.appendChild(select); // Hozzáadja a select elemet a form elemhez

    const options = [ // Definiál egy tömböt az összes szűrő opció adataival
        { value: '', innerText: 'üres' }, // Első opció: nincs kiválasztva semmi
        { value: 'revolution', innerText: 'forradalom' }, // Második opció: forradalom
        { value: 'year', innerText: 'évszám' }, // Harmadik opció: évszám
        { value: 'successful', innerText: 'sikeres' } // Negyedik opció: sikeres
    ];

    for (const option of options) { // Végigiterál az opciókat tartalmazó tömbön
        const optionElement = document.createElement('option'); // Létrehoz egy <option> elemet
        optionElement.value = option.value; // Beállítja az option értékét az aktuális opció alapján
        optionElement.innerText = option.innerText; // Beállítja az opció megjelenített szövegét
        select.appendChild(optionElement); // Hozzáadja az option elemet a select elemhez
    }

    const input = document.createElement('input'); // Létrehoz egy <input> elemet a szűrő szöveg beviteléhez
    input.id = 'filterInput'; // Beállítja az input azonosítóját "filterInput"-ra
    formForFilter.appendChild(input); // Hozzáadja az input elemet a form elemhez

    const button = document.createElement('button'); // Létrehoz egy <button> elemet a szűrés beküldéséhez
    button.textContent = 'Szűrés'; // Beállítja a gomb szövegét "Szűrés"-re
    formForFilter.appendChild(button); // Hozzáadja a gombot a form elemhez

    const resultDiv = document.createElement('div'); // Létrehoz egy <div> elemet az eredmény megjelenítésére
    resultDiv.className = 'result'; // Beállítja a div osztályát "result"-re
    kont.appendChild(resultDiv); // Hozzáadja a result div-et a konténerhez

    formForFilter.addEventListener('submit', (e) => { // Feliratkozik a form "submit" eseményére a szűrés végrehajtásához
        e.preventDefault(); // Megakadályozza az űrlap alapértelmezett beküldését
        const filterInput = input.value.toLowerCase(); // Lekéri az input értékét és kisbetűssé alakítja azt
        const selectedOption = select.value; // Lekéri a select elemben kiválasztott opció értékét

        // Szűri a globális tömböt úgy, hogy az adott adat megfelel-e a megadott feltételnek
        const filteredArray = tomb.filter(adat => {
            if (!selectedOption) return true; // Ha nincs kiválasztva opció, minden adatot elfogad
            const value = adat[selectedOption]; // Lekéri az aktuális adat adott tulajdonságát a select elem alapján
            return typeof value === 'string' 
                ? value.toLowerCase().includes(filterInput) // Ha a value string, kisbetűsítve ellenőrzi, hogy tartalmazza-e a filterInput-ot
                : value === (filterInput === 'igen'); // Ha nem string, boolean összehasonlítást végez (igaz, ha a filterInput "igen")
        });

        tablaTest.innerHTML = ''; // Törli a táblázat törzsének eddigi tartalmát
        for (const adat of filteredArray) { // Végigiterál a szűrt adat tömbön
            hozzaadSor(adat, tablaTest); // Hozzáad egy új sort a táblázathoz a szűrt adatok alapján
        }

        resultDiv.textContent = `A feltételnek megfelelő elemek száma: ${filteredArray.length}`; // Frissíti az eredmény div szövegét a szűrt elemek számával
    });
};

// Fő konténer létrehozása és inicializálása
const kont = letrehozDiv('container-sima'); // Létrehoz egy div-et "container-sima" osztállyal a fő tartalom számára
document.body.appendChild(kont); // Hozzáadja a fő konténert a dokumentum <body> eleméhez

// Táblázat létrehozása és inicializálása, majd a callback-ben hívja meg a további funkciókat
letrehozTabla(kont, (tablaTest) => { // Meghívja a letrehozTabla függvényt a fő konténerrel és egy callback függvénnyel, mely a táblázat törzsét adja meg
    letrehozUrlap(kont, tablaTest); // Létrehozza az adatbeviteli űrlapot
    letrehozFajlFeltoltes(kont, tablaTest); // Létrehozza a fájl feltöltés funkciót az adatok betöltéséhez
    letrehozFajlLetoltes(kont); // Létrehozza az adatok exportálását megvalósító gombot
    letrehozSzuroUrlap(kont, tablaTest); // Létrehozza a szűrő űrlapot az adatok szűréséhez
});
