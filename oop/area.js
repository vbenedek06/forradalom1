const tomb = [];
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

    /**
    * Getter a privát #elem mezőhöz, így más osztályok, például a leszármazottak is hozzáférhetnek.
    * A getter metódus lehetővé teszi, hogy biztonságosan olvasható legyen az elem kívülről.
    * @returns {HTMLDivElement} A példányhoz tartozó div HTML elem.
    */
    get div() {
        return this.#div;
    }

    // Konstruktor: létrehoz egy új divet a megadott osztálynévvel, és hozzáadja a fő konténerhez.
    constructor(className) {
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
    constructor(osztaly) {
        // Meghívjuk az Area osztály konstruktorát, hogy a struktúra kiindulópontját létrehozzuk.
        super(osztaly);

        // Létrehozzuk a <table> elemet, amely magát a táblázatot reprezentálja.
        const table = document.createElement('table');

        // A <table> elemet beillesztjük az Area példány div-jébe, amely az oldal DOM-jában már jelen van.
        this.div.appendChild(table);

        // A táblázat fejléc részének (<thead>) létrehozása.
        const fejlec = document.createElement('thead');
        table.appendChild(fejlec); // hozzáadás a táblázathoz

        // Egy új sor létrehozása a fejlécben, amely majd az oszlopneveket fogja tartalmazni.
        const fejlecSor = document.createElement('tr');
        fejlec.appendChild(fejlecSor); // sor hozzáadása a <thead>-hez

        // A fejléc oszlopneveit tömbként tároljuk, így dinamikusan generálhatók a <th> elemek.
        const fejlecMezok = ['forradalom', 'évszám', 'sikeres'];

        // Végigiterálunk a mezőkön, és létrehozzuk hozzájuk a megfelelő <th> (table header cell) elemeket.
        for (const szoveg of fejlecMezok) {
            const cella = document.createElement('th'); // új fejléc cella
            cella.innerText = szoveg;                   // a cella tartalma (szöveg beállítása)
            fejlecSor.appendChild(cella);               // a cella hozzáadása a sorhoz
        }

        // A táblázat törzs részét is létrehozzuk (<tbody>), ahol a későbbi sorok elhelyezkednek.
        const tbody = document.createElement('tbody');
        table.appendChild(tbody); // hozzáadás a <table>-hez

        // Visszatér a <tbody> elemmel.
        return tbody;



    }
}

// Az Űrlap osztály, mely szintén a Terület leszármazottja, és létrehoz egy <form> elemet az adatok beviteléhez.
class Urlap extends Area {
    constructor(osztaly,mezoLista) {
        // Meghívjuk a Terület konstruktorát.
        super(osztaly);

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

                // Érték: 'no', ez lesz a programozási szempontból érdekes érték.
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


        // Létrehozunk egy új <button> elemet a DOM-ban.
        // Ez a gomb lesz felelős például az adatok elküldéséért vagy egy új sor hozzáadásáért a táblázathoz.
        const gomb = document.createElement('button');

        // Beállítjuk a gomb feliratát, ami a gombon megjelenő szöveg lesz.
        // Jelen esetben: 'hozzáadás', azaz a felhasználó számára jelzi, hogy ezzel lehet adatot hozzáadni.
        gomb.textContent = 'hozzáadás';

        // A létrehozott gombot hozzáadjuk az előzőleg létrehozott <form> elemhez.
        // Így a gomb megjelenik az űrlapon a felhasználó számára.
        formElem.appendChild(gomb);
    }
}