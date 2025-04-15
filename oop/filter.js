/**
 * @typedef {Object} RevolutionElement
 * @property {string} forradalom - A forradalom neve (pl. "Revolution")
 * @property {number} evszam - A forradalom évszáma
 * @property {boolean} sikeres - A forradalom sikerességének logikai értéke (true, ha sikeres; false, ha nem)
 */

/**
 * @callback FilterCallback
 * @param {RevolutionElement} elem - Egy forradalom adatait tartalmazó objektum a szűréshez
 * @returns {boolean} Igaz, ha az elem megfelel a szűrési feltételeknek, egyébként hamis
 */

/**
 * @class Filter
 * @extends Area
 * @classdesc A Filter osztály létrehoz egy szűrő űrlapot a forradalom adatok szűréséhez.
 */
class Filter extends Area {
    /**
     * @constructor
     * @description Létrehozza a Filter példányt, inicializálja a szűrő űrlapot, 
     * és beállítja az eseménykezelőt a szűrési művelethez.
     *
     * @param {string} containerClass - A container CSS osztálya
     * @param {Object} manager - A manager objektum, amely a szűrési műveleteket végzi (pl. filter, getRevolutionList)
     */
    constructor(containerClass, manager) {
        // Meghívja az ős (Area) konstruktorát a containerClass és manager paraméterekkel
        super(containerClass, manager); // Hívás: konstruktorban átadott paraméterek az ősosztálynak

        // Létrehoz egy form elemet az űrlap számára
        this.formElement = document.createElement('form'); // Form HTML elem létrehozása
        this.div.appendChild(this.formElement); // Az űrlap hozzáadása a fő div elemhez

        // Létrehoz egy select elemet a szűrési opciók számára
        this.dropdownElement = document.createElement('select'); // Select (legördülő) elem létrehozása
        this.formElement.appendChild(this.dropdownElement); // A legördülő elem hozzáfűzése a form elemhez

        // Definiálja a szűrési opciókat egy tömbben
        const optionsArray = [ // Opciókat tartalmazó tömb definiálása
            { value: '', innerText: 'üres' },              // Opció: összes elem (nincs szűrés)
            { value: 'revolution', innerText: 'forradalom' }, // Opció: forradalom neve alapján
            { value: 'year', innerText: 'Évszám' },           // Opció: évszám alapján
            { value: 'successful', innerText: 'Sikeres' }     // Opció: sikeresség alapján
        ]; // Opciók tömb lezárása

        // Iterál a tömb elemein, és hozzáadja azokat a select elemhez
        for (const option of optionsArray) { // Végigiterál az optionsArray elemein
            const optionEl = document.createElement('option'); // <option> elem létrehozása
            optionEl.value = option.value; // Az option értékének beállítása (érték hozzárendelése)
            optionEl.innerText = option.innerText; // Az option megjelenítendő szövegének beállítása
            this.dropdownElement.appendChild(optionEl); // Az option elem hozzáadása a legördülő elemhez
        } // Ciklus vége: minden opció feldolgozva

        // Létrehoz egy input mezőt a szűrési érték beviteléhez
        this.inputField = document.createElement('input'); // Input mező HTML elem létrehozása
        this.inputField.id = 'filterInput'; // Az input mező id attribútumának beállítása
        this.formElement.appendChild(this.inputField); // Az input mező hozzáadása a form elemhez

        // Létrehoz egy gombot a szűrési művelet indításához
        this.filterButton = document.createElement('button'); // Button HTML elem létrehozása
        this.filterButton.innerText = 'Filter'; // A gomb megjelenítendő szövegének beállítása
        this.formElement.appendChild(this.filterButton); // A gomb hozzáadása a form elemhez

        // Létrehoz egy div elemet az eredmények megjelenítéséhez
        this.resultContainer = document.createElement('div'); // Eredményt megjelenítő div elem létrehozása
        this.resultContainer.className = 'result'; // Az eredménydiv CSS osztályának beállítása
        this.div.appendChild(this.resultContainer); // Az eredménydiv hozzáadása a fő div elemhez

        // Beállítja az űrlap submit eseményének kezelőjét a handleSubmit metódusra
        this.formElement.addEventListener('submit', this.handleSubmit.bind(this)); // Eseménylistener hozzárendelése, mely a handleSubmit metódust hívja meg
    }

    /**
     * @function handleSubmit
     * -Az űrlap submit eseményének kezelője, amely:
     *  - Megakadályozza az alapértelmezett űrlap beküldést,
     *  - A beviteli mező tartalmának kisbetűs alakítását,
     *  - A kiválasztott legördülő opció értékének lekérését,
     *  - A megfelelő szűrő callback függvény lekérését,
     *  - A manager.filter metódus hívását a callback függvénnyel,
     *  - A manager.getRevolutionList() eredményének újraszűrését,
     *  - Az eredmények megjelenítését.
     *
     * @param {Event} event - A submit esemény objektuma
     * @returns {void}
     */
    handleSubmit(event) {
        event.preventDefault(); // Megakadályozza az űrlap alapértelmezett beküldését (oldal frissítésének elkerülése)

        // A beviteli mező értékének kisbetűs alakra konvertálása
        const filterValue = this.inputField.value.toLowerCase(); // Átalakítja az input mező értékét kisbetűssé
        // A legördülő menüből kiválasztott opció értékének lekérése
        const selectedOption = this.dropdownElement.value; // Lekéri a dropdown aktuális értékét
        // A megfelelő filter callback függvény lekérése az adott opció és szűrő érték alapján
        const filterFunc = this.getFilterCallback(selectedOption, filterValue); // Lekéri a filter callback függvényt

        // A manager objektum filter metódusának hívása a filter callback függvénnyel
        this.manager.filter(filterFunc); // Meghívja a manager.filter metódust a callback függvénnyel

        // A manager által tárolt forradalmak listájának szűrése a callback függvénnyel
        const filteredArray = this.manager.getRevolutionList().filter(filterFunc); // Szűri a forradalom listát a callback alapján

        // Az eredmény div szövegének beállítása a szűrt elemek számával
        this.resultContainer.textContent = `Number of matching elements: ${filteredArray.length}`; // Beállítja a resultContainer tartalmát a szűrt elemek számával
    }

    /**
     * @function getFilterCallback
     * @description Visszaad egy callback függvényt, amely a kiválasztott szűrési opció és bevitt érték alapján
     * eldönti, hogy egy elem megfelel-e a szűrési feltételeknek.
     *
     * @param {string} option - A legördülő menüből kiválasztott szűrési opció (pl. 'revolution', 'year', 'successful')
     * @param {string} term - A felhasználó által beírt szűrési érték, kisbetűs alakban
     * @returns {FilterCallback} A szűrési callback függvény, amely eldönti, hogy egy elem megfelelő-e a feltételekre
     */
    getFilterCallback(option, term) {
        // Választott szűrési opció alapján dől el, melyik callback függvényt adja vissza
        switch (option) {
            case 'revolution':
                // Az elem forradalom tulajdonságának kisbetűssé alakítása és tartalmazza-e a term értéket:
                // a forradalom neve kisbetűs alakja, majd ellenőrzés, hogy benne van-e a term substring
                return (elem) => elem.forradalom.toLowerCase().includes(term);
            case 'year':
                // A term értékének számmá konvertálása és összehasonlítása az elem evszam tulajdonságával:
                // Number(term) konvertálja a beviteli mező tartalmát számmá, majd összehasonlítja a revolution évszámával
                return (elem) => Number(term) === elem.evszam;
            case 'successful':
                // A term értékének ellenőrzése, hogy "igen"-e, és ennek megfelelően az elem sikeres tulajdonságának visszaadása:
                // Ha term "igen", akkor visszaadja elem.sikeres-et, ellenkező esetben a logikai negációját (!elem.sikeres)
                return (elem) => term === 'igen' ? elem.sikeres : !elem.sikeres;
            default:
                // Ha nincs speciális opció kiválasztva, a callback minden elemre true értékkel tér vissza
                return () => true; // Alapértelmezett eset: nem szűr, minden elem megfelel
        } // switch blokk vége
    }
}
