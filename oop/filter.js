/**
 * @typedef {Object} RevolutionElement
 * @property {string} forradalom - A forradalom neve (pl. "Revolution")
 * @property {number} evszam - A forradalom évszáma
 * @property {boolean} sikeres - A forradalom sikerességének logikai értéke (true ha sikeres, false ha nem)
 */

/**
 * @callback FilterCallback
 * @param {RevolutionElement} elem - Egy forradalom adatait tartalmazó objektum a szűréshez
 * @returns {boolean} - Igaz, ha az elem megfelel a szűrési feltételeknek, egyébként hamis
 */

/**
 * @class Filter
 * @extends Area
 * @classdesc A Filter osztály létrehoz egy szűrő űrlapot, amely lehetővé teszi a forradalom adatok szűrését.
 * A szűrés során a manager objektum metódusait használja.
 */
class Filter extends Area {
    /**
     * Létrehozza a Filter példányt, inicializálja a szűrő űrlapot,
     * és beállítja az eseménykezelőt a szűrési művelethez.
     *
     * @param {string} cssClass - A CSS osztálynév, amelyet a container elemhez rendelünk.
     * @param {Object} manager - A manager objektum, amely a szűrési műveleteket végzi (pl. filter, getRevolutionList).
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívja a szülő (Area) konstruktorát a cssClass és manager paraméterekkel // 
        
        // Létrehoz egy <form> elemet a szűrő űrlap számára
        const urlap = document.createElement('form'); // Létrehozza a form elemet, amely a szűrő űrlapot képviseli // 
        this.div.appendChild(urlap); // Hozzáfűzi a létrehozott form elemet a jelenlegi div (this.div) tartalmához // 
        
        // Létrehoz egy <select> elemet, amely a szűrési opciókat tartalmazza
        const legordulo = document.createElement('select'); // Létrehozza a select elemet a szűrési opciók számára // 
        urlap.appendChild(legordulo); // Hozzáadja a select elemet az űrlaphoz (urlap) // 
        
        // Definiálja a szűrési opciókat egy tömbben
        const opciok = [ // Létrehoz egy tömböt az opció objektumokkal // 
            { value: '', innerText: 'Összes' },         // Az első opció: összes elem megjelenítése
            { value: 'forradalom', innerText: 'Forradalom neve' }, // Második opció: forradalom neve alapján szűrés
            { value: 'evszam', innerText: 'Évszám' },      // Harmadik opció: évszám alapján szűrés
            { value: 'sikeres', innerText: 'Sikeresség' }  // Negyedik opció: sikeresség alapján szűrés
        ];
        
        // Iterál az opciok tömb elemein, és minden opciót hozzáad a legordulo (select) elemhez
        for (const opcio of opciok) { // Végigiterál az opciok tömb minden elemén // 
            const opcioElem = document.createElement('option'); // Létrehoz egy <option> elemet // 
            opcioElem.value = opcio.value; // Beállítja az option értékét az aktuális opció value tulajdonságára // 
            opcioElem.innerText = opcio.innerText; // Beállítja az option megjelenítendő szövegét az innerText tulajdonság alapján // 
            legordulo.appendChild(opcioElem); // Hozzáadja az opcioElem-et a select elemhez // 
        }
        
        // Létrehoz egy <input> elemet, amely a szűrési érték bevitelére szolgál
        const bemenet = document.createElement('input'); // Létrehoz egy input elemet // 
        bemenet.id = 'szuroBemenet'; // Beállítja az input id-jét "szuroBemenet"-re // 
        urlap.appendChild(bemenet); // Hozzáadja az input elemet az űrlaphoz (urlap) // 
        
        // Létrehoz egy <button> elemet, amely a szűrési művelet indítását végzi
        const gomb = document.createElement('button'); // Létrehoz egy button elemet // 
        gomb.innerText = 'Szűrés'; // Beállítja a button megjelenített szövegét "Szűrés"-re // 
        urlap.appendChild(gomb); // Hozzáadja a button elemet az űrlaphoz (urlap) // 
        
        // Létrehoz egy <div> elemet az eredmények megjelenítésére
        const resultDiv = document.createElement('div'); // Létrehoz egy div elemet, amely az eredmények megjelenítésére szolgál // 
        resultDiv.className = 'result'; // Beállítja a div osztálynevét "result"-re // 
        this.div.appendChild(resultDiv); // Hozzáadja a resultDiv-et a containerhez (this.div) // 
        
        // Feliratkozás az űrlap submit eseményére a szűrés kezeléséhez
        urlap.addEventListener('submit', (esemeny) => { // Eseménykezelő beállítása: amikor az űrlapot beküldik // 
            esemeny.preventDefault(); // Megakadályozza az űrlap alapértelmezett beküldését, így nem történik oldalfrissítés // 
            
            // Lekéri a bemenet értékét, és kisbetűssé alakítja azt (szűrési érték)
            const szuroErtek = bemenet.value.toLowerCase(); // A bemenet értékének kisbetűs változata a szűréshez // 
            // Lekéri a select elem értékét, amely azt határozza meg, melyik opció alapján szűrünk
            const kivalasztottOpcio = legordulo.value; // A kiválasztott opció értéke a szűréshez // 
            
            // Meghívja a manager filter metódusát, amely a kapott callback alapján szűri az elemeket
            this.manager.filter((elem) => { // A manager.filter callback függvény hívása, ahol az egyes elemeket szűrjük // 
                // Ha a kiválasztott opció "forradalom", ellenőrzi, hogy az elem forradalom értéke tartalmazza-e a szűrési értéket
                if (kivalasztottOpcio === 'forradalom') { // Ha a szűrés a forradalom neve alapján történik // 
                    // A forradalom string kisbetűs alakja és az includes metódus segítségével ellenőrzi a tartalmazást
                    return elem.forradalom.toLowerCase().includes(szuroErtek); // Visszatér igaz értékkel, ha megtalálja a szűrési értéket // 
                } else if (kivalasztottOpcio === 'evszam') { // Ha az opció az évszám alapján történő szűrés
                    // Átalakítja a szűrési értéket számmá, majd összehasonlítja az elem evszam tulajdonságával
                    return Number(szuroErtek) === elem.evszam; // Visszatér igaz, ha a számokká alakított érték megegyezik // 
                } else if (kivalasztottOpcio === 'sikeres') { // Ha az opció a sikeresség alapján történő szűrés
                    // Ha a szűrési érték "igen", akkor ellenőrzi, hogy elem.sikeres igaz-e; különben hamisnak kell lennie
                    return szuroErtek === 'igen' ? elem.sikeres : !elem.sikeres; // Ternary operátor: ha "igen", akkor elem.sikeres, ellenkező esetben logikai negáció // 
                } else {
                    return true; // Ha nincs speciális opció kiválasztva, minden elem megfelel a szűrésnek
                }
            });
            
            // Szűrési eredmények megjelenítése: lekéri a manager által tárolt forradalmak listáját,
            // majd ezeket a feltételek alapján újra szűri egy callback függvénnyel
            const szurtTomb = this.manager.getRevolutionList().filter((elem) => { // A forradalom lista szűrése a feltételek alapján // 
                if (kivalasztottOpcio === 'forradalom') { // Ha a szűrés a forradalom neve alapján történik // 
                    return elem.forradalom.toLowerCase().includes(szuroErtek); // Ellenőrzi, hogy az elem neve tartalmazza-e a szűrési értéket // 
                } else if (kivalasztottOpcio === 'evszam') { // Ha a szűrés az évszám alapján történik // 
                    return Number(szuroErtek) === elem.evszam; // Számokká alakítja a szűrési értéket, majd összehasonlítja az elem évszámával // 
                } else if (kivalasztottOpcio === 'sikeres') { // Ha a szűrés a sikeresség alapján történik // 
                    return szuroErtek === 'igen' ? elem.sikeres : !elem.sikeres; // A ternary operátorral eldönti, hogy az elem sikeressége megegyezik-e a szűrési feltétellel // 
                } else {
                    return true; // Ha egyik feltétel sem érvényes, minden elem megjelenik
                }
            });
            
            // Beállítja az eredmény div szövegét a szűrt elemek számával
            resultDiv.textContent = `A feltételnek megfelelő elemek száma: ${szurtTomb.length}`; // Megjeleníti az eredmények számát
        });
    }
}
