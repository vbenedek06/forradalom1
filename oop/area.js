
/**
 * Az Area osztály egy új div elemet hoz létre a fő konténeren belül.
 * Ha a fő konténer még nem létezik, akkor azt létrehozza és hozzáadja a dokumentumhoz.
 */
class Area {
    /**
     * Privát mező, amely a létrehozott div HTML elemet tárolja.
     * A # szintaxis a JavaScript privát mező deklarálását jelöli, amely kívülről nem érhető el közvetlenül.
     * @type {HTMLDivElement}
     * @private
     */
    #div;


    /**
     * A manager objektum, amely az osztály működését irányítja.
     * @type {RevolutionManager}
     * @private
     */
    #manager;


    /**
    * Getter a privát #elem mezőhöz, így más osztályok, például a leszármazottak is hozzáférhetnek.
    * A getter metódus lehetővé teszi, hogy biztonságosan olvasható legyen az elem kívülről.
    * @returns {HTMLDivElement} A példányhoz tartozó div HTML elem.
    */
    get div() {
        return this.#div;
    }

    /**
    * Getter a privát #manager mezőhöz.
    * @returns {RevolutionManager} A példányhoz tartozó manager objektum.
    */
    get manager() {
        return this.#manager;
    }

    /**
     * Konstruktor: létrehoz egy új divet a megadott osztálynévvel, és hozzáadja a fő konténerhez.
     * @param {string} className - A div CSS osztályneve.
     * @param {RevolutionManager} manager - A manager objektum, amely az osztály működését irányítja.
     */
    // Konstruktor: létrehoz egy új divet a megadott osztálynévvel, és hozzáadja a fő konténerhez.
    constructor(className, manager) {
        this.#manager = manager;
        // Meghívjuk a privát metódust, amely visszaadja (vagy létrehozza) a fő konténer divet.
        const container = this.#getDivContainer();

        // Létrehozunk egy új div elemet.
        this.#div = document.createElement('div');

        // Beállítjuk a div CSS osztálynevét a kapott értékre.
        this.#div.className = className;

        // Hozzáadjuk a divet a konténerhez.
        container.appendChild(this.#div);
    }

    /**
     * Privát metódus: megkeresi vagy létrehozza a fő konténert.
     * @returns {HTMLDivElement} A fő konténer div HTML elem.
     * @private
     */

    #getDivContainer() {
        // Megkeresi a DOM-ban a 'containeroop' osztályú elemet.
        let containerDiv = document.querySelector('.container-oop');

        // Ha nem található, akkor létrehozza.
        if (!containerDiv) {
            containerDiv = document.createElement('div');       // új div létrehozása
            containerDiv.className = 'container-oop';            // osztálynév beállítása
            document.body.appendChild(containerDiv);            // hozzáadás a body-hoz
        }

        // Visszatér a konténer divvel.
        return containerDiv;
    }
}


/**
 * A Tablazat osztály egy speciális Area, amely automatikusan létrehoz egy HTML <table> elemet,
 * és annak teljes alapstruktúráját felépíti (fejléc és törzs).
 * Használható statikus vagy dinamikus adattáblák megjelenítésére.
 */
class Tablazat extends Area {
    /**
     * A konstruktor meghívja az Area szülőosztály konstruktorát, majd létrehoz egy HTML táblázatot,
     * és hozzáadja a fejlécet ('thead'), egy fejléc sort ('tr') és három oszlopnevet ('th').
     * @param {string} styleClass - A div elem CSS osztályneve, amely a táblázatot körbeöleli.
     */
    constructor(osztaly, manager) {
        /**
          * Konstruktor: létrehozza a táblázatot és beállítja a manager callbackjét.
          * @param {string} osztaly - A táblázatot körülvevő div CSS osztályneve.
          * @param {RevolutionManager} manager - A manager objektum, amely a forradalmak listáját kezeli.
          */
        super(osztaly, manager);

        // Meghívjuk a privát metódust, amely létrehozza a táblázat DOM struktúráját.
        // Visszatér egy <tbody> vagy más HTML elem referenciájával, amibe majd a sorokat tesszük.
        const tablaTest = this.#keszitTabla();

        // Beállítunk egy callback függvényt a manager objektumon.
        // Ez akkor hívódik meg, amikor új forradalom kerül hozzáadásra.
        this.manager.setRevolutionAddedCallback((revolution) => {

            // Létrehozunk egy új <tr> (táblázatsor) elemet a forradalom adatainak megjelenítésére.
            const tablaSor = document.createElement('tr');

            // Létrehozunk egy <td> cellát a forradalom nevének.
            const forradalomCell = document.createElement('td');
            // Beállítjuk a cella szövegét a revolution objektum 'forradalom' mezőjére.
            forradalomCell.textContent = revolution.forradalom;
            // Hozzáadjuk ezt a cellát a táblázatsorhoz.
            tablaSor.appendChild(forradalomCell);

            // Létrehozunk egy <td> cellát az évszámnak.
            const evszamCell = document.createElement('td');
            // Beállítjuk a cella szövegét a revolution objektum 'evszam' mezőjére.
            evszamCell.textContent = revolution.evszam;
            // Hozzáadjuk ezt a cellát is a táblázatsorhoz.
            tablaSor.appendChild(evszamCell);

            // Létrehozunk egy <td> cellát, amely a sikerességet mutatja.
            const sikeresCell = document.createElement('td');
            // Ha a revolution.sikeres igaz (true), akkor 'igen'-t írunk ki, különben 'nem'-et.
            sikeresCell.textContent = revolution.sikeres ? 'igen' : 'nem';
            // Hozzáadjuk ezt a cellát is a sorhoz.
            tablaSor.appendChild(sikeresCell);

            // Végül a kész sort hozzáadjuk a táblázat test részéhez, így megjelenik a lapon.
            tablaTest.appendChild(tablaSor);
        });
    }


     /**
     * Privát metódus: létrehozza a táblázatot, beleértve a fejlécet és a törzset.
     * @returns {HTMLTableSectionElement} A táblázat törzse.
     * @private
     */
    #keszitTabla() {
        const table = document.createElement('table'); // Létrehozzuk a <table> elemet
        this.div.appendChild(table); // A div-be ágyazzuk
        const thead = document.createElement('thead'); // Fejléc létrehozása
        table.appendChild(thead); // A táblázathoz hozzáadjuk
        const theadRow = document.createElement('tr'); // Fejléc sor létrehozása
        thead.appendChild(theadRow); // A fejléc sor hozzáadása a fejléchez
        const theadCells = ['forradalom', 'évszám', 'sikeres']; // Fejléc oszlopnevek
        for (const cellContent of theadCells) {
            const thcell = document.createElement('th'); // Új fejléc cella létrehozása
            thcell.innerText = cellContent;               // A cella szövege
            theadRow.appendChild(thcell);                 // A cellát hozzáadjuk a sorhoz
        }
        const tbody = document.createElement('tbody'); // A táblázat törzse
        table.appendChild(tbody); // Hozzáadjuk a táblázathoz
        return tbody; // Visszaadjuk a táblázat törzsét
    }
}




/**
 * A Form osztály az Area osztályt örökli, és egy HTML űrlapot hoz létre.
 * A formon keresztül adatokat lehet megadni, amelyeket a menedzser kezeli.
 */
class Urlap extends Area {

    #formFieldArray;

     /**
     * Konstruktor: létrehozza az űrlapot és a mezőket a megadott mezőlista alapján.
     * @param {string} osztaly - A div CSS osztályneve, amely az űrlapot körülveszi.
     * @param {Array<{fieldid: string, fieldLabel: string}>} mezoLista - A mezők listája, amelyek az űrlap mezőit definiálják.
     * @param {RevolutionManager} manager - A manager objektum, amely az űrlap adatait kezeli.
     */
    constructor(osztaly, mezoLista, manager) {
        // Meghívjuk a Terület konstruktorát.
        super(osztaly, manager);
        // Inicializáljuk a privát tömböt
        this.#formFieldArray = [];
        // Létrehozunk egy <form> elemet.
        const formElem = document.createElement('form');
        // A form elemet beillesztjük a Terület által létrehozott div-be.
        this.div.appendChild(formElem);

        // Végigiterálunk a mezoLista tömbön, amely objektumokat tartalmaz.
        // Minden objektum egy űrlapmezőt ír le (pl. forradalom, évszám, sikeresség).
        for (const mezo of mezoLista) {
            if (mezo.fieldid === 'successful') { // Ellenőrizzük, hogy az aktuális mező ID-ja "successful"-e

                const label = document.createElement('label'); // Létrehozunk egy <label> elemet, amely a mező címkéjét tartalmazza
                label.htmlFor = mezo.fieldid;// A label 'for' attribútumát az ID-hoz rendeljük, hogy összekapcsolja a select mezővel
                label.textContent = mezo.fieldLabel; // Beállítjuk a label szövegét a mező címkéjére

                const select = document.createElement('select');// Létrehozunk egy <select> elemet, amely egy legördülő menüt képvisel
                select.id = mezo.fieldid;// Beállítjuk a select mező ID-ját, hogy egyedi legyen

                const opcioIgen = document.createElement('option');// Létrehozzuk az első opciót: "igen"
                opcioIgen.value = 'yes';// Az opció értéke, amelyet a program használ
                opcioIgen.textContent = 'igen';// Az opció szövege, amelyet a felhasználó lát
                select.appendChild(opcioIgen);// Hozzáadjuk az "igen" opciót a select mezőhöz

                const opcioNem = document.createElement('option'); // Létrehozzuk a második opciót: "nem"
                opcioNem.value = 'no';// Az opció értéke, amelyet a program használ
                opcioNem.textContent = 'nem'; // Az opció szövege, amelyet a felhasználó lát
                select.appendChild(opcioNem);// Hozzáadjuk a "nem" opciót a select mezőhöz

                const errorElem = document.createElement('span'); // Létrehozunk egy <span> elemet, amely a hibaüzenetek megjelenítésére szolgál
                errorElem.className = 'error';// Hozzáadjuk az 'error' osztályt, hogy stílusozható legyen

                const div = document.createElement('div');   // Létrehozunk egy <div> elemet, amely a mező konténere lesz
                div.classList.add('field');        /// Hozzáadjuk a 'field' osztályt a div-hez, hogy stílusozható legyen
                div.appendChild(label); // Hozzáadunk egy sortörést a label és a select mező közé
                div.appendChild(document.createElement('br'));  // Hozzáadunk egy sortörést a label és a select mező közé
                div.appendChild(select);// A div-hez hozzáadjuk a select mezőt
                div.appendChild(document.createElement('br')); // Hozzáadunk egy sortörést a select mező és a hibaüzenet közé
                div.appendChild(errorElem);// A div-hez hozzáadjuk a hibaüzenet megjelenítésére szolgáló span elemet

                formElem.appendChild(div);// A kész div-et hozzáadjuk az űrlaphoz (formElem)
            } else {
                // Ha a mező nem "successful", akkor a FormField osztályt használjuk
                // Egyéb mezők esetén a FormField osztályt használjuk
                const formField = new FormField(mezo.fieldid, mezo.fieldLabel); // Létrehozunk egy új FormField példányt az aktuális mező alapján

                this.#formFieldArray.push(formField); // Hozzáadjuk a FormField példányt a privát tömbhöz (#formFieldArray)
                formElem.appendChild(formField.getDiv());// A FormField által generált div-et hozzáadjuk az űrlaphoz (formElem)
            }
        }



        // Létrehozunk egy <button> elemet az űrlap elküldéséhez
        const gomb = document.createElement('button');
        gomb.textContent = 'hozzáadás'; // Beállítjuk a gomb szövegét
        gomb.type = 'submit'; // A gomb típusát "submit"-re állítjuk

        // A létrehozott gombot hozzáadjuk az űrlaphoz (formElem).
        formElem.appendChild(gomb);

        // Hozzáadunk egy eseményfigyelőt az űrlaphoz, amely akkor aktiválódik, amikor az űrlapot elküldik (submit esemény).
        formElem.addEventListener('submit', (e) => {

            // Megakadályozzuk az űrlap alapértelmezett működését (pl. az oldal újratöltését).
            e.preventDefault();
            const valueObject = {};// Létrehozunk egy üres objektumot, amibe az input mezők értékeit gyűjtjük be.
            let valid = true; // Validációs állapotot jelző változó

            // Lekérjük az összes input mezőt, ami az adott űrlapon (e.target) belül található.
            const inputMezok = e.target.querySelectorAll('input');

            // Végigmegyünk minden input mezőn
             // Végigiterálunk a FormField példányokon
             for (const formField of this.#formFieldArray) {
                formField.error = ''; // Alapértelmezésben nincs hibaüzenet
                if (formField.value === '') { // Ellenőrizzük, hogy a mező üres-e
                    formField.error = 'Kötelező megadni'; // Hibaüzenet beállítása
                    valid = false; // A validáció sikertelen
                }
                valueObject[formField.id] = formField.value; // Hozzáadjuk az értéket az objektumhoz
            }

            if (valid) { // Ha minden mező valid, folytatjuk az adatfeldolgozást
                const revolution = new Revolution(
                    valueObject.revolution, // Forradalom neve
                    Number(valueObject.year), // Évszám
                    valueObject.successful === 'yes' // Sikeresség logikai értékként
                );
                 // A létrehozott forradalom objektumot hozzáadjuk a manager-hez (pl. táblázathoz).
                this.manager.addRevolution(revolution);

                 // Az űrlapot alaphelyzetbe állítjuk, hogy tiszta mezők jelenjenek meg a felhasználónak.
                formElem.reset();
            }

        });
    }
    
}

/**
 * Az `Feltoltes` osztály egy fájl feltöltésére szolgáló funkciót valósít meg.
 * A fájl tartalmát feldolgozza, és a benne található adatokat `Revolution` objektumokká alakítja.
 */
class Feltoltes extends Area {
    /**
     * Konstruktor: Létrehozza a fájl feltöltésére szolgáló input mezőt, és beállítja az eseményfigyelőt.
     * @param {string} stilusOsztaly - A div CSS osztályneve, amely a fájl feltöltését körülveszi.
     * @param {RevolutionManager} kezelo - A manager objektum, amely a forradalmak listáját kezeli.
     */
    constructor(stilusOsztaly, kezelo) {
        super(stilusOsztaly, kezelo); // Meghívjuk az Area szülőosztály konstruktorát.

        // Létrehozunk egy fájl feltöltésére szolgáló input mezőt.
        const fajlInput = document.createElement('input'); // Új <input> elem létrehozása.
        fajlInput.id = 'fajlfeltoltes'; // Beállítjuk az input mező ID-ját.
        fajlInput.type = 'file'; // Az input mező típusát fájl feltöltésre állítjuk.
        this.div.appendChild(fajlInput); // Hozzáadjuk az input mezőt a div-hez.

        // Hozzáadunk egy eseményfigyelőt az input mezőhöz, amely akkor aktiválódik, amikor a felhasználó fájlt választ.
        fajlInput.addEventListener('change', (esemeny) => {
            const fajl = esemeny.target.files[0]; // Lekérjük a kiválasztott fájlt.
            if (!fajl) {
                console.warn('Nem választottak ki fájlt!');
                return;
            }

            const fajlOlvaso = new FileReader(); // Létrehozunk egy FileReader példányt a fájl olvasásához.

            // Amikor a fájl betöltődött, végrehajtjuk a következő műveleteket.
            fajlOlvaso.onload = () => {
                const fajlSorok = fajlOlvaso.result.split('\n'); // A fájl tartalmát sorokra bontjuk.
                const fejlecNelkul = fajlSorok.slice(1); // Az első sort (fejléc) eltávolítjuk.

                // Végigiterálunk a fájl sorain, hogy feldolgozzuk az adatokat.
                for (const sor of fejlecNelkul) {
                    const vagottSor = sor.trim(); // Levágjuk a felesleges szóközöket a sor elejéről és végéről.
                    if (!vagottSor) continue; // Ha a sor üres, kihagyjuk.

                    const mezok = vagottSor.split(';'); // A sort mezőkre bontjuk pontosvessző mentén.
                    if (mezok.length < 3) {
                        console.warn('Hiányos adat:', sor);
                        continue; // Ha a sor nem tartalmaz elegendő mezőt, kihagyjuk.
                    }

                    // Ellenőrizzük a sikeresség mezőt, és logikai értékké alakítjuk.
                    const sikeres = mezok[2].trim().toLowerCase() === 'igen';

                    try {
                        // Létrehozunk egy új Revolution objektumot az aktuális sor adataival.
                        const forradalom = new Revolution(
                            mezok[0].trim(), // A forradalom neve.
                            Number(mezok[1].trim()), // Az évszám.
                            sikeres // A sikeresség logikai értékké alakítva.
                        );

                        // Hozzáadjuk a forradalom objektumot a manager-hez.
                        this.manager.addRevolution(forradalom);
                    } catch (error) {
                        console.error('Hiba történt a Revolution objektum létrehozásakor:', error);
                    }
                }
            };

           

            fajlOlvaso.readAsText(fajl); // Elindítjuk a fájl olvasását szövegként.
        });
    }
}



// A FormField osztály egy űrlapmezőt reprezentál, amely tartalmaz egy címkét (label), egy beviteli mezőt (input) és egy hibaüzenet megjelenítésére szolgáló elemet (span).
class FormField {
    // Privát mezők deklarálása, amelyek csak az osztályon belül érhetők el.
     /**
     * Az űrlapmező azonosítója, amely egyedi az adott mezőhöz.
     * @type {string}
     * @private
     */
    #id; // Az űrlapmező azonosítója, amely egyedi az adott mezőhöz.

    /**
     * Az input HTML elem, amely a felhasználói adatbevitelre szolgál.
     * @type {HTMLInputElement}
     * @private
     */
    #inputElement; // Az input HTML elem, amely a felhasználói adatbevitelre szolgál.

    /**
     * A label HTML elem, amely a mező címkéjét tartalmazza.
     * @type {HTMLLabelElement}
     * @private
     */
    #labelElement; // A label HTML elem, amely a mező címkéjét tartalmazza.
    /**
     * A span HTML elem, amely a hibaüzenetek megjelenítésére szolgál.
     * @type {HTMLSpanElement}
     * @private
     */
    #errorElement; // A span HTML elem, amely a hibaüzenetek megjelenítésére szolgál.

    // Getter metódus az ID-hoz, amely lehetővé teszi az azonosító lekérdezését kívülről.

    /**
     * Getter metódus az ID-hoz, amely lehetővé teszi az azonosító lekérdezését kívülről.
     * @returns {string} Az űrlapmező azonosítója.
     */
    get id() {
        return this.#id; // Visszaadja a privát #id mező értékét.
    }

    // Getter metódus az input mező értékéhez, amely lehetővé teszi a felhasználó által bevitt adat lekérdezését.
    /**
     * Getter metódus az input mező értékéhez, amely lehetővé teszi a felhasználó által bevitt adat lekérdezését.
     * @returns {string} Az input mező aktuális értéke.
     */
    get value() {
        return this.#inputElement.value; // Visszaadja az input mező aktuális értékét.
    }

    // Setter metódus a hibaüzenet beállításához, amely lehetővé teszi a hibaüzenet szövegének módosítását.
      /**
     * Setter metódus a hibaüzenet beállításához, amely lehetővé teszi a hibaüzenet szövegének módosítását.
     * @param {string} value - A hibaüzenet szövege.
     */
    set error(value) {
        this.#errorElement.textContent = value; // Beállítja a hibaüzenet szövegét a span elemben.
    }

    // Konstruktor: inicializálja az osztály példányát, és létrehozza a szükséges HTML elemeket.
     /**
     * Konstruktor: inicializálja az osztály példányát, és létrehozza a szükséges HTML elemeket.
     * @param {string} id - Az űrlapmező egyedi azonosítója.
     * @param {string} labelContent - A mező címkéjének szövege.
     */
    constructor(id, labelContent) {
        this.#id = id; // Beállítja a mező azonosítóját a kapott ID alapján.

        // Létrehozza a label elemet, amely a mező címkéjét tartalmazza.
        this.#labelElement = document.createElement('label'); // Új <label> elem létrehozása.
        this.#labelElement.htmlFor = id; // A label 'for' attribútumát az ID-hoz rendeli, hogy összekapcsolja az input mezővel.
        this.#labelElement.textContent = labelContent; // Beállítja a label szövegét a kapott tartalom alapján.

        // Létrehozza az input elemet, amely a felhasználói adatbevitelre szolgál.
        this.#inputElement = document.createElement('input'); // Új <input> elem létrehozása.
        this.#inputElement.id = id; // Beállítja az input mező ID-ját, hogy egyedi legyen.

        // Létrehozza a hibaüzenet megjelenítésére szolgáló span elemet.
        this.#errorElement = document.createElement('span'); // Új <span> elem létrehozása.
        this.#errorElement.className = 'error'; // Hozzáadja az 'error' osztályt a span elemhez, hogy stílusozható legyen.
    }

    // Metódus, amely visszaad egy div-et, amely tartalmazza az összes HTML elemet (label, input, hibaüzenet).
     /**
     * Metódus, amely visszaad egy div-et, amely tartalmazza az összes HTML elemet (label, input, hibaüzenet).
     * @returns {HTMLDivElement} A mezőt tartalmazó div elem.
     */
    getDiv() {
        const div = document.createElement('div'); // Létrehoz egy új <div> elemet, amely a mező konténere lesz.
        div.classList.add('field'); // Hozzáadja a 'field' osztályt a div-hez, hogy stílusozható legyen.

        // Létrehoz két sortörést, hogy a mező elemei (label, input, hibaüzenet) egymás alatt jelenjenek meg.
        const br1 = document.createElement('br'); // Első sortörés létrehozása.
        const br2 = document.createElement('br'); // Második sortörés létrehozása.

        // Az összes HTML elemet (label, sortörés, input, sortörés, hibaüzenet) hozzáadja a div-hez.
        const htmlElements = [this.#labelElement, br1, this.#inputElement, br2, this.#errorElement];
        for (const element of htmlElements) {
            div.appendChild(element); // Az aktuális elemet hozzáadja a div-hez.
        }

        return div; // Visszaadja a kész div-et, amely tartalmazza az összes elemet.
    }
}