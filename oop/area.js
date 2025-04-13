
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
    constructor(osztaly, mezoLista, manager) {
        // Meghívjuk a Terület konstruktorát.
        super(osztaly, manager);

        // Létrehozunk egy <form> elemet.
        const formElem = document.createElement('form');
        // A form elemet beillesztjük a Terület által létrehozott div-be.
        this.div.appendChild(formElem);

        // Végigiterálunk a mezoLista tömbön, amely objektumokat tartalmaz.
        // Minden objektum egy űrlapmezőt ír le (pl. forradalom, évszám, sikeresség).
        for (const mezo of mezoLista) {

            // Létrehozunk egy <div> elemet, amely az aktuális űrlapmező (label + input/select) konténere lesz.
            const mezoDiv = document.createElement('div');

            // Hozzáadjuk a 'field' CSS osztályt a divhez, ami segíthet a mezők stílusának egységesítésében.
            mezoDiv.classList.add('field');

            // Az új divet hozzáadjuk az űrlaphoz (formElem), így az megjelenik a DOM-ban.
            formElem.appendChild(mezoDiv);

            // Létrehozunk egy <label> elemet, amely az adott mező feliratát tartalmazza.
            const cimke = document.createElement('label');

            // A label 'for' attribútumát beállítjuk, hogy megegyezzen az input mező ID-jával.
            // Ezáltal ha a felhasználó rákattint a címkére, az a megfelelő input mezőre fókuszál.
            cimke.htmlFor = mezo.fieldid;

            // Beállítjuk a label látható szövegét az objektumból (pl. 'évszám', 'forradalom').
            cimke.textContent = mezo.fieldLabel;

            // A címkét hozzáadjuk az aktuális divhez, így az megjelenik a mező előtt.
            mezoDiv.appendChild(cimke);

            // Hozzáadunk egy sortörést, hogy a beviteli mező a címke alatt jelenjen meg.
            mezoDiv.appendChild(document.createElement('br'));

            // Ellenőrizzük, hogy az aktuális mező a 'sikeres' mező-e.
            // Ehhez speciális mezőt (legördülő listát) hozunk létre, nem sima szöveges inputot.
            if (mezo.fieldid === 'successful') {

                // Létrehozunk egy <select> elemet, ami a legördülő menüt reprezentálja.
                const legordulo = document.createElement('select');

                // Beállítjuk a select ID-ját, hogy egyezzen a label 'for' attribútumával.
                legordulo.id = mezo.fieldid;

                // Létrehozunk egy <option> elemet az 'igen' választáshoz.
                const opcioIgen = document.createElement('option');

                // Az opció értéke (amit a program fog kapni) 'yes'.
                opcioIgen.value = 'yes';

                // A megjelenő szöveg az opcióban: 'igen'.
                opcioIgen.textContent = 'igen';

                // Hozzáadjuk az 'igen' opciót a select (legördülő) elemhez.
                legordulo.appendChild(opcioIgen);

                // Létrehozunk egy második <option> elemet a 'nem' választáshoz.
                const opcioNem = document.createElement('option');

                // Érték: 'no'
                opcioNem.value = 'no';

                // A felhasználó által látott szöveg: 'nem'.
                opcioNem.textContent = 'nem';

                // Hozzáadjuk a 'nem' opciót a legördülőhöz.
                legordulo.appendChild(opcioNem);

                // Végül hozzáadjuk a teljes legördülő mezőt a divhez.
                mezoDiv.appendChild(legordulo);

            } else {
                // Ha a mező nem 'sikeres', tehát sima szöveg vagy szám mező, akkor input mezőt készítünk.

                // Létrehozunk egy <input> elemet.
                const inputElem = document.createElement('input');

                // Beállítjuk az input mező ID-ját, hogy kapcsolódjon a label-hez.
                inputElem.id = mezo.fieldid;

                // Az input mezőt is hozzáadjuk a divhez, így megjelenik az oldalon.
                mezoDiv.appendChild(inputElem);
            }
        }


        // Létrehozunk egy új <button> elemet, amely az űrlap elküldésére fog szolgálni.
        const gomb = document.createElement('button');

        // A gomb típusát "submit"-re állítjuk, így amikor rákattintunk, az űrlap elküldésének eseményét váltja ki.
        gomb.type = 'submit';

        // A gomb szövegét beállítjuk, ami a felhasználó számára jelenik meg a gombon.
        gomb.textContent = 'hozzáadás';

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