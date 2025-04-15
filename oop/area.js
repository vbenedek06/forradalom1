/**
 * @class Area
 * @classdesc Az Area osztály egy alapvető konténer osztály, amely egy div elemet hoz létre és kezel.
 */
class Area {
    /** @type {HTMLDivElement} A div elem, amely az osztály által kezelt konténer. */
    #div;

    /** @type {Object} A manager objektum, amely az osztály által kezelt adatokért felel. */
    #manager;

    /**
     * A div getter metódusa.
     * @returns {HTMLDivElement} A div elem, amely az osztály által kezelt konténer.
     */
    get div() {
        return this.#div;
    }

    /**
     * A manager getter metódusa.
     * @returns {Object} A manager objektum, amely az osztály által kezelt adatokért felel.
     */
    get manager() {
        return this.#manager;
    }

    /**
     * @constructor
     * @description Létrehoz egy új Area példányt, amely egy div elemet hoz létre és hozzáadja a dokumentumhoz.
     * @param {string} className - A div elem CSS osztálya.
     * @param {Object} manager - A manager objektum, amely az osztály által kezelt adatokért felel.
     */
    constructor(className, manager) {
        this.#manager = manager; // Beállítja a manager objektumot.
        const container = this.#getContainerDiv(); // Lekéri vagy létrehozza a fő konténer div-et.
        this.#div = document.createElement('div'); // Létrehoz egy új div elemet.
        this.#div.className = className; // Beállítja a div elem CSS osztályát.
        container.appendChild(this.#div); // Hozzáadja a div elemet a fő konténerhez.
    }

    /**
     * Lekéri vagy létrehozza a fő konténer div-et.
     * @private
     * @returns {HTMLDivElement} A fő konténer div elem.
     */
    #getContainerDiv() {
        let containerDiv = document.querySelector('.container-oop'); // Megkeresi a meglévő konténer div-et.
        if (!containerDiv) { // Ha nem található, létrehoz egy újat.
            containerDiv = document.createElement('div'); // Létrehoz egy új div elemet.
            containerDiv.className = 'container-oop'; // Beállítja a div elem CSS osztályát.
            document.body.appendChild(containerDiv); // Hozzáadja a div elemet a dokumentum body-jához.
        }
        return containerDiv; // Visszaadja a konténer div-et.
    }

    /**
     * Létrehoz egy gombot a megadott címkével.
     * @param {string} label - A gomb szövege.
     * @returns {HTMLButtonElement} A létrehozott gomb elem.
     */
    createButton(label) {
        const button = document.createElement('button'); // Létrehoz egy új gomb elemet.
        button.textContent = label; // Beállítja a gomb szövegét.
        return button; // Visszaadja a gomb elemet.
    }
}




/**
 * @class Tablazat
 * @extends Area
 * @classdesc A Tablazat osztály egy táblázatot hoz létre és kezeli a forradalmak adatait.
 */
class Tablazat extends Area {
    /**
     * @constructor
     * @description Létrehoz egy új Tablazat példányt, amely egy táblázatot hoz létre és inicializálja a callback-eket.
     * @param {string} cssClass - A táblázat CSS osztálya.
     * @param {Object} manager - A manager objektum, amely a forradalmak adatait kezeli.
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát.
        const tbody = this.#createTable(); // Létrehozza a táblázatot és visszaadja a táblázat törzsét.
        this.manager.setRevolutionAddedCallback(this.#addRevolutionCallback(tbody)); // Beállítja az új forradalom hozzáadására vonatkozó callback-et.
        this.manager.setRenderTableCallback(this.#renderTableCallback(tbody)); // Beállítja a táblázat újrarenderelésére vonatkozó callback-et.
    }

    /**
     * Létrehozza a táblázatot és visszaadja a táblázat törzsét.
     * @private
     * @returns {HTMLTableSectionElement} A táblázat törzse.
     */
    #createTable() {
        const table = document.createElement('table'); // Létrehoz egy új táblázat elemet.
        this.div.appendChild(table); // Hozzáadja a táblázatot a div elemhez.

        const thead = document.createElement('thead'); // Létrehoz egy táblázat fejléc elemet.
        table.appendChild(thead); // Hozzáadja a fejlécet a táblázathoz.

        const theadRow = document.createElement('tr'); // Létrehoz egy sort a fejlécben.
        thead.appendChild(theadRow); // Hozzáadja a sort a fejléchez.

        const theadCells = ['forradalom', 'évszám', 'sikeres']; // A fejléc celláinak szövegei.
        for (const cellContent of theadCells) { // Iterál a cellák szövegein.
            this.#createCell(theadRow, cellContent, 'th'); // Létrehozza a cellát és hozzáadja a sorhoz.
        }

        const tbody = document.createElement('tbody'); // Létrehoz egy táblázat törzs elemet.
        table.appendChild(tbody); // Hozzáadja a törzset a táblázathoz.

        return tbody; // Visszaadja a táblázat törzsét.
    }

    /**
     * Callback függvény a táblázat újrarendereléséhez.
     * @private
     * @param {HTMLTableSectionElement} tbody - A táblázat törzse.
     * @returns {Function} A callback függvény, amely a szűrt forradalmak listáját fogadja.
     */
    #renderTableCallback(tbody) {
        return (revolutionArray) => {
            tbody.innerHTML = ''; // Kiüríti a táblázat törzsét.
            for (const revolution of revolutionArray) { // Iterál a forradalmak listáján.
                this.#createRow(revolution, tbody); // Létrehozza a sort és hozzáadja a táblázathoz.
            }
        };
    }

    /**
     * Callback függvény új forradalom hozzáadásakor.
     * @private
     * @param {HTMLTableSectionElement} tbody - A táblázat törzse.
     * @returns {Function} A callback függvény, amely egy új forradalom objektumot fogad.
     */
    #addRevolutionCallback(tbody) {
        return (revolution) => {
            this.#createRow(revolution, tbody); // Létrehozza a sort és hozzáadja a táblázathoz.
        };
    }

    /**
     * Létrehoz egy sort a táblázatban a megadott forradalom adataival.
     * @private
     * @param {Object} revolution - A forradalom adatai.
     * @param {HTMLTableSectionElement} tbody - A táblázat törzse.
     * @returns {void}
     */
    #createRow(revolution, tbody) {
        const row = document.createElement('tr'); // Létrehoz egy új sort.
        this.#createCell(row, revolution.forradalom); // Létrehozza a forradalom nevét tartalmazó cellát.
        this.#createCell(row, revolution.evszam); // Létrehozza az évszámot tartalmazó cellát.
        this.#createCell(row, revolution.sikeres ? 'igen' : 'nem'); // Létrehozza a sikerességet tartalmazó cellát.
        tbody.appendChild(row); // Hozzáadja a sort a táblázat törzséhez.
    }

    /**
     * Létrehoz egy cellát a megadott szöveggel és típussal.
     * @private
     * @param {HTMLTableRowElement} row - A sor, amelyhez a cellát hozzá kell adni.
     * @param {string} textContent - A cella szövege.
     * @param {string} [type='td'] - A cella típusa (alapértelmezett: 'td').
     * @returns {void}
     */
    #createCell(row, textContent, type = 'td') {
        const cell = document.createElement(type); // Létrehoz egy új cellát a megadott típussal.
        cell.textContent = textContent; // Beállítja a cella szövegét.
        row.appendChild(cell); // Hozzáadja a cellát a sorhoz.
    }
}
/**
 * @class Urlap
 * @extends Area
 * @classdesc Az Urlap osztály egy űrlapot hoz létre, amely lehetővé teszi a forradalmak adatainak bevitelét.
 */
class Urlap extends Area {
    /** @type {FormField[]} Az űrlap mezőit tartalmazó tömb. */
    #formFieldArray;

    /**
     * @constructor
     * @description Létrehoz egy új Urlap példányt, amely egy űrlapot hoz létre és inicializálja az eseménykezelőket.
     * @param {string} cssClass - Az űrlap CSS osztálya.
     * @param {Array<Object>} fieldElementList - Az űrlap mezőinek konfigurációs listája.
     * @param {Object} manager - A manager objektum, amely az adatok kezeléséért felel.
     */
    constructor(cssClass, fieldElementList, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát.
        this.#formFieldArray = []; // Inicializálja az űrlap mezőit tartalmazó tömböt.
        const form = this.#createForm(fieldElementList); // Létrehozza az űrlapot a mezők alapján.
        form.addEventListener('submit', this.#formSubmitEventListener()); // Hozzáadja az űrlap beküldési eseménykezelőjét.
    }

    /**
     * Létrehozza az űrlapot a megadott mezőkkel.
     * @private
     * @param {Array<Object>} fieldElementList - Az űrlap mezőinek konfigurációs listája.
     * @returns {HTMLFormElement} A létrehozott űrlap elem.
     */
    #createForm(fieldElementList) {
        const form = document.createElement('form'); // Létrehoz egy <form> elemet.
        this.div.appendChild(form); // Hozzáadja az űrlapot a fő div-hez.

        for (const fieldElement of fieldElementList) { // Iterál a mezők listáján.
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); // Létrehoz egy új FormField példányt.
            this.#formFieldArray.push(formField); // Hozzáadja a mezőt az űrlap mezőihez.
            form.appendChild(formField.getDiv()); // Hozzáadja a mezőt az űrlaphoz.
        }

        const button = this.createButton('Hozzáadás'); // Létrehoz egy "Hozzáadás" gombot.
        form.appendChild(button); // Hozzáadja a gombot az űrlaphoz.

        return form; // Visszaadja a létrehozott űrlapot.
    }

    /**
     * Az űrlap beküldési eseménykezelője.
     * @private
     * @returns {Function} Az eseménykezelő függvény.
     */
    #formSubmitEventListener() {
        return (e) => {
            e.preventDefault(); // Megakadályozza az alapértelmezett beküldési viselkedést.
            if (this.#validateAllFields()) { // Ellenőrzi, hogy minden mező érvényes-e.
                const valueObject = this.#getValueObject(); // Lekéri az űrlap mezőinek értékeit.
                const revolution = new Revolution(
                    valueObject.revolution,
                    Number(valueObject.year), // Az évszámot számmá konvertálja.
                    valueObject.successful === 'yes' // Ellenőrzi, hogy a sikeresség "yes"-e.
                );
                this.manager.addRevolution(revolution); // Hozzáadja az új forradalmat a managerhez.
                e.target.reset(); // Visszaállítja az űrlapot alapértelmezett állapotba.
            }
        };
    }

    /**
     * Ellenőrzi, hogy minden mező érvényes-e.
     * @private
     * @returns {boolean} Igaz, ha minden mező érvényes, egyébként hamis.
     */
    #validateAllFields() {
        let valid = true; // Inicializálja az érvényességet igazra.
        for (const formField of this.#formFieldArray) { // Iterál az űrlap mezőin.
            formField.error = ''; // Törli az esetleges korábbi hibaüzeneteket.
            if (formField.value === '') { // Ellenőrzi, hogy a mező üres-e.
                formField.error = 'Kötelező megadni'; // Beállítja a hibaüzenetet.
                valid = false; // Beállítja az érvényességet hamisra.
            }
        }
        return valid; // Visszaadja az érvényességet.
    }

    /**
     * Lekéri az űrlap mezőinek értékeit.
     * @private
     * @returns {Object} Az űrlap mezőinek értékeit tartalmazó objektum.
     */
    #getValueObject() {
        const valueObject = {}; // Inicializál egy üres objektumot.
        for (const formField of this.#formFieldArray) { // Iterál az űrlap mezőin.
            valueObject[formField.id] = formField.value; // Hozzáadja a mező értékét az objektumhoz.
        }
        return valueObject; // Visszaadja az objektumot.
    }
}
/**
 * @class FeltoltesLetoltes
 * @extends Area
 * @classdesc A FeltoltesLetoltes osztály fájl feltöltésére és letöltésére szolgál.
 */
class FeltoltesLetoltes extends Area {
    /**
     * @constructor
     * @description Létrehoz egy új FeltoltesLetoltes példányt, amely fájl feltöltésére és letöltésére szolgál.
     * @param {string} cssClass - A konténer CSS osztálya.
     * @param {Object} manager - A manager objektum, amely az adatok kezeléséért felel.
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívja az Area osztály konstruktorát.
        const input = this.#createFileInput(); // Létrehozza a fájl feltöltéshez szükséges input elemet.
        const exportButton = this.createButton('Letöltés'); // Létrehoz egy "Letöltés" gombot.
        this.div.appendChild(input); // Hozzáadja az inputot a fő div-hez.
        this.div.appendChild(exportButton); // Hozzáadja a gombot a fő div-hez.
        input.addEventListener('change', this.#importInputEventListener()); // Hozzáadja az eseménykezelőt a fájl feltöltéshez.
        exportButton.addEventListener('click', this.#exportButtonEventListener()); // Hozzáadja az eseménykezelőt a fájl letöltéshez.
    }

    /**
     * Létrehozza a fájl feltöltéshez szükséges input elemet.
     * @private
     * @returns {HTMLInputElement} A fájl feltöltéshez szükséges input elem.
     */
    #createFileInput() {
        const input = document.createElement('input'); // Létrehoz egy <input> elemet.
        input.id = 'fileinput'; // Beállítja az input ID-ját.
        input.type = 'file'; // Beállítja az input típusát "file"-ra.
        return input; // Visszaadja az input elemet.
    }

    /**
     * Az export gomb eseménykezelője.
     * @private
     * @returns {Function} Az eseménykezelő függvény.
     */
    #exportButtonEventListener() {
        return () => {
            const link = document.createElement('a'); // Létrehoz egy <a> elemet.
            const content = this.manager.generateExportString(); // Lekéri az exportálandó adatokat.
            const file = new Blob([content]); // Létrehoz egy Blob objektumot az adatokkal.
            link.href = URL.createObjectURL(file); // Beállítja a link href-jét a Blob URL-re.
            link.download = 'adatok.csv'; // Beállítja a letöltendő fájl nevét.
            link.click(); // Elindítja a letöltést.
            URL.revokeObjectURL(link.href); // Felszabadítja a Blob URL erőforrásait.
        };
    }

    /**
     * A fájl feltöltés eseménykezelője.
     * @private
     * @returns {Function} Az eseménykezelő függvény.
     */
    #importInputEventListener() {
        return (e) => {
            const file = e.target.files[0]; // Lekéri az első kiválasztott fájlt.
            const fileReader = new FileReader(); // Létrehoz egy FileReader objektumot.
            fileReader.onload = () => { // Amikor a fájl beolvasása befejeződik.
                const lines = fileReader.result.split('\n').slice(1); // A fájl tartalmát sorokra bontja, kihagyva az első sort.
                for (const line of lines) { // Iterál a sorokon.
                    const fields = line.trim().split(';'); // A sort mezőkre bontja pontosvessző alapján.
                    const revolution = new Revolution(fields[0], Number(fields[1]), fields[2] === 'igen'); // Létrehoz egy új Revolution objektumot.
                    this.manager.addRevolution(revolution); // Hozzáadja a forradalmat a managerhez.
                }
            };
            fileReader.readAsText(file); // Elindítja a fájl beolvasását szövegként.
        };
    }
}
/**
 * @class FormField
 * @classdesc A FormField osztály egy űrlap mezőt reprezentál, amely tartalmaz egy címkét, egy bemeneti mezőt és egy hibaüzenetet.
 */
class FormField {
    /** @type {string} A mező azonosítója. */
    #id;

    /** @type {HTMLInputElement|HTMLSelectElement} A mező bemeneti eleme. */
    #inputElement;

    /** @type {HTMLLabelElement} A mező címkéje. */
    #labelElement;

    /** @type {HTMLSpanElement} A mező hibaüzenetét tartalmazó elem. */
    #errorElement;

    /**
     * @constructor
     * @description Létrehoz egy új FormField példányt a megadott azonosítóval és címkével.
     * @param {string} id - A mező azonosítója.
     * @param {string} labelContent - A mező címkéjének szövege.
     */
    constructor(id, labelContent) {
        this.#id = id; // Beállítja a mező azonosítóját.
        this.#labelElement = this.#createLabel(id, labelContent); // Létrehozza a mező címkéjét.

        if (id === 'successful') { // Ha a mező azonosítója "successful".
            this.#inputElement = document.createElement('select'); // Létrehoz egy <select> elemet.
            const optionYes = document.createElement('option'); // Létrehoz egy "igen" opciót.
            optionYes.value = 'yes';
            optionYes.textContent = 'igen';
            const optionNo = document.createElement('option'); // Létrehoz egy "nem" opciót.
            optionNo.value = 'no';
            optionNo.textContent = 'nem';
            this.#inputElement.appendChild(optionYes); // Hozzáadja az "igen" opciót.
            this.#inputElement.appendChild(optionNo); // Hozzáadja a "nem" opciót.
        } else {
            this.#inputElement = document.createElement('input'); // Létrehoz egy <input> elemet.
        }

        this.#inputElement.id = id; // Beállítja a bemeneti elem azonosítóját.
        this.#errorElement = this.#createErrorElement(); // Létrehozza a hibaüzenet elemet.
    }

    /**
     * A mező azonosítójának lekérdezése.
     * @returns {string} A mező azonosítója.
     */
    get id() {
        return this.#id;
    }

    /**
     * A mező értékének lekérdezése.
     * @returns {string} A mező értéke.
     */
    get value() {
        return this.#inputElement.value;
    }

    /**
     * A mező hibaüzenetének beállítása.
     * @param {string} value - A hibaüzenet szövege.
     */
    set error(value) {
        this.#errorElement.textContent = value;
    }

    /**
     * Visszaadja a mezőt tartalmazó div elemet.
     * @returns {HTMLDivElement} A mezőt tartalmazó div elem.
     */
    getDiv() {
        const div = document.createElement('div'); // Létrehoz egy <div> elemet.
        div.classList.add('field'); // Hozzáadja a "field" osztályt.
        div.appendChild(this.#labelElement); // Hozzáadja a címkét.
        div.appendChild(document.createElement('br')); // Hozzáad egy sortörést.
        div.appendChild(this.#inputElement); // Hozzáadja a bemeneti elemet.
        div.appendChild(document.createElement('br')); // Hozzáad egy sortörést.
        div.appendChild(this.#errorElement); // Hozzáadja a hibaüzenet elemet.
        return div; // Visszaadja a div elemet.
    }

    /**
     * Létrehozza a mező címkéjét.
     * @private
     * @param {string} id - A mező azonosítója.
     * @param {string} labelContent - A címke szövege.
     * @returns {HTMLLabelElement} A létrehozott címke elem.
     */
    #createLabel(id, labelContent) {
        const label = document.createElement('label'); // Létrehoz egy <label> elemet.
        label.htmlFor = id; // Beállítja a "for" attribútumot.
        label.textContent = labelContent; // Beállítja a címke szövegét.
        return label; // Visszaadja a címkét.
    }

    /**
     * Létrehozza a hibaüzenet elemet.
     * @private
     * @returns {HTMLSpanElement} A létrehozott hibaüzenet elem.
     */
    #createErrorElement() {
        const error = document.createElement('span'); // Létrehoz egy <span> elemet.
        error.className = 'error'; // Beállítja a "error" osztályt.
        return error; // Visszaadja a hibaüzenet elemet.
    }
}