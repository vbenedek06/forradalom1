
/**
 * Az Area osztály egy új div elemet hoz létre a fő konténeren belül.
 * Ha a fő konténer még nem létezik, akkor azt létrehozza és hozzáadja a dokumentumhoz.
 */
class Area {
    /**
     * Privát mező, amely a létrehozott div HTML elemet tárolja.
     * A # szintaxis a JavaScript privát mező deklarálását jelöli, amely kívülről nem érhető el közvetlenül.
     * @type {HTMLDivElement}
     */
    #div;
    #manager;


    /**
    * Getter a privát #elem mezőhöz, így más osztályok, például a leszármazottak is hozzáférhetnek.
    * A getter metódus lehetővé teszi, hogy biztonságosan olvasható legyen az elem kívülről.
    * @returns {HTMLDivElement} A példányhoz tartozó div HTML elem.
    */
    get div() {
        return this.#div;
    }

    get manager() {
        return this.#manager;
    }

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

    // Privát metódus: megkeresi vagy létrehozza a fő konténert.
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
        // Meghívjuk az ősosztály (Area) konstruktorát, hogy az alapvető inicializálás megtörténjen.
        // Az 'osztaly' paraméter pl. egy CSS osztály lehet, amit a HTML elemre rakunk.
        // A 'manager' pedig a RevolutionHandler példány, ami a forradalmak listáját kezeli.
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
 * Privát metódus: létrehozza a táblázatot, beleértve a fejlécet és a törzset
 * @returns {HTMLTableSectionElement} A táblázat törzse
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

            // Létrehozunk egy üres objektumot, amibe az input mezők értékeit gyűjtjük be.
            const urlapAdatokObjektum = {};

            // Lekérjük az összes input mezőt, ami az adott űrlapon (e.target) belül található.
            const inputMezok = e.target.querySelectorAll('input');

            // Végigmegyünk minden input mezőn
            for (const inputMezo of inputMezok) {
                // Az adott input mező ID-ját használjuk kulcsként, és az értékét mentjük el az objektumba.
                urlapAdatokObjektum[inputMezo.id] = inputMezo.value;
            }

            // Lekérjük a "sikeres" mezőt, amely egy checkbox (vagy select), és külön ellenőrizzük.
            const sikeresSelect = e.target.querySelector('#successful');

            // A "sikeres" mező értékét logikai típussá alakítjuk: true, ha "yes", különben false.
            urlapAdatokObjektum.sikeres = sikeresSelect.value === 'yes';

            // Létrehozunk egy új Revolution objektumot az űrlap mezőiből nyert adatokkal.
            const revolution = new Revolution(
                urlapAdatokObjektum.revolution,  // forradalom neve
                urlapAdatokObjektum.year,        // évszám
                urlapAdatokObjektum.sikeres      // sikeresség logikai értékként
            );

            // A létrehozott forradalom objektumot hozzáadjuk a manager-hez (pl. táblázathoz).
            this.manager.addRevolution(revolution);

            // Az űrlapot alaphelyzetbe állítjuk, hogy tiszta mezők jelenjenek meg a felhasználónak.
            formElem.reset();
        });

    }
}

// A FormField osztály egy űrlapmezőt reprezentál, amely tartalmaz egy címkét (label), egy beviteli mezőt (input) és egy hibaüzenet megjelenítésére szolgáló elemet (span).
class FormField {
    // Privát mezők deklarálása, amelyek csak az osztályon belül érhetők el.
    #id; // Az űrlapmező azonosítója, amely egyedi az adott mezőhöz.
    #inputElement; // Az input HTML elem, amely a felhasználói adatbevitelre szolgál.
    #labelElement; // A label HTML elem, amely a mező címkéjét tartalmazza.
    #errorElement; // A span HTML elem, amely a hibaüzenetek megjelenítésére szolgál.

    // Getter metódus az ID-hoz, amely lehetővé teszi az azonosító lekérdezését kívülről.
    get id() {
        return this.#id; // Visszaadja a privát #id mező értékét.
    }

    // Getter metódus az input mező értékéhez, amely lehetővé teszi a felhasználó által bevitt adat lekérdezését.
    get value() {
        return this.#inputElement.value; // Visszaadja az input mező aktuális értékét.
    }

    // Setter metódus a hibaüzenet beállításához, amely lehetővé teszi a hibaüzenet szövegének módosítását.
    set error(value) {
        this.#errorElement.textContent = value; // Beállítja a hibaüzenet szövegét a span elemben.
    }

    // Konstruktor: inicializálja az osztály példányát, és létrehozza a szükséges HTML elemeket.
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