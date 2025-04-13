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

    /**
    * Konstruktor: amikor példányosítjuk az osztályt, létrehoz egy div elemet a megadott osztálynévvel,
    * és automatikusan elhelyezi azt egy központi 'container' div elemben.
    * Ha ez a konténer még nem létezik, akkor dinamikusan létrehozza.
    * @param {string} osztaly - A CSS osztálynév, amelyet az új div elem kap.
    */
    constructor(osztaly) {
        // Megkeressük a fő konténer elemet az oldalon, amelynek osztálya 'container'
        let kont = document.querySelector('.container-oop');
        
        // Ha a fő konténer elem nem található, akkor létrehozzuk azt
        if (!kont) {
            kont = document.createElement('div');       // új div elem létrehozása
            kont.className = 'container-oop';               // osztálynév beállítása
            document.body.appendChild(kont);            // hozzáadás a dokumentumhoz
        }

        // Létrehozzuk az adott példányhoz tartozó belső div elemet.
        this.#div = document.createElement('div');

        // Beállítjuk az elem osztályát a konstruktorban kapott névre (pl. 'table' vagy 'form').
        this.#div.className = osztaly;

        // A létrehozott div elemet hozzáadjuk a fő konténerhez, így automatikusan megjelenik az oldalon.
        kont.appendChild(this.#div);

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
    constructor(styleClass) {
        // Meghívjuk az Area osztály konstruktorát, hogy a struktúra kiindulópontját létrehozzuk.
        super(styleClass);

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

        

    }
}