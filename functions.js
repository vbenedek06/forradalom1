/** 
 * @typedef {Object} RevolutionData  // RevolutionData típusdefiníciója
 * @property {string} revolution  // A forradalom neve, karakterlánc formában
 * @property {string} year  // Az évszám szöveges reprezentációja
 * @property {boolean} successful  // A forradalom sikerességének logikai értéke
 */

/**
 * @callback TableBodyCallback 
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem
 * @returns {void}  // Nem ad vissza értéket
 */

/**
 * Létrehoz egy div elemet a megadott osztálynévvel.
 * @param {string} className  // A div osztályneve
 * @returns {HTMLDivElement}  // A létrehozott div elem
 */
const makeDiv = (className) => { // Függvény: div létrehozása adott osztálynévvel
    const div = document.createElement('div'); // Létrehoz egy új div elemet a documentból //  
    div.className = className; // Beállítja a div osztálynevét a paraméterként kapott className értékre //  
    return div; // Visszaadja a létrehozott div elemet //  
};

/**
 * Táblázat létrehozása és inicializálása.
 * @param {HTMLElement} container  // A konténer, amely a táblázatot fogja tartalmazni
 * @param {TableBodyCallback} callback  // Callback függvény, melynek paraméterként átadja a táblázat törzsét
 * @returns {void}  // Nem ad vissza értéket
 */
const createTable = (container, callback) => { // Függvény: táblázat létrehozása a container elemben
    const tableDiv = makeDiv('table'); // Létrehoz egy div-et "table" osztállyal //  
    container.appendChild(tableDiv); // Hozzáfűzi a tableDiv-et a container-hez //  

    const tableSim = document.createElement('table'); // Létrehoz egy <table> elemet //  
    tableDiv.appendChild(tableSim); // Hozzáadja a tableSim elemet a tableDiv-hez //  

    const tableHead = document.createElement('thead'); // Létrehoz egy <thead> elemet a táblázat fejlécének //  
    tableSim.appendChild(tableHead); // Hozzáadja a tableHead elemet a tableSim-hez //  

    const tableHeadRow = document.createElement('tr'); // Létrehoz egy <tr> elemet a fejléc sor számára //  
    tableHead.appendChild(tableHeadRow); // Hozzáfűzi a tableHeadRow-t a tableHead-hez //  

    const theadCells = ['forradalom', 'évszám', 'sikeres']; // Definiálja a fejléc cellák szövegeit //  
    for (const cellContent of theadCells) { // Iterál a fejléc cellák tartalmán //  
        const thcell = document.createElement('th'); // Létrehoz egy <th> elemet a fejléc cellának //  
        thcell.innerText = cellContent; // Beállítja a cella szövegét az aktuális tartalomra //  
        tableHeadRow.appendChild(thcell); // Hozzáfűzi a thcell elemet a tableHeadRow-hoz //  
    }

    const tbody = document.createElement('tbody'); // Létrehoz egy <tbody> elemet a táblázat törzséhez //  
    tableSim.appendChild(tbody); // Hozzáadja a tbody-t a tableSim-hez //  

    callback(tbody); // Meghívja a callback-et, átadva a tbody elemet //  
};

/**
 * Új sor hozzáadása a táblázathoz.
 * @param {RevolutionData} data  // Az adat objektum, mely tartalmazza a forradalom, évszám és sikeres értékeket
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem
 * @returns {void}  // Nem ad vissza értéket
 */
const addRow = (data, tableBody) => { // Függvény: új sor beszúrása a táblázat törzsébe
    const row = document.createElement('tr'); // Létrehoz egy <tr> elemet //  
    tableBody.appendChild(row); // Hozzáadja a row-t a tableBody-hez //  

    const nameCell = document.createElement('td'); // Létrehoz egy <td> elemet a forradalom adatnak //  
    nameCell.textContent = data.revolution; // Beállítja a cella tartalmát a data.revolution értékére //  
    row.appendChild(nameCell); // Hozzáfűzi a nameCell elemet a row-hoz //  

    const yearCell = document.createElement('td'); // Létrehoz egy <td> elemet az évszám adatnak //  
    yearCell.textContent = data.year; // Beállítja a cella tartalmát a data.year értékére //  
    row.appendChild(yearCell); // Hozzáfűzi a yearCell elemet a row-hoz //  

    const successfulCell = document.createElement('td'); // Létrehoz egy <td> elemet a sikeresség adatnak //  
    successfulCell.textContent = data.successful ? 'igen' : 'nem'; // Kiértékeli, hogy data.successful igaz-e ('igen') vagy hamis ('nem') //  
    row.appendChild(successfulCell); // Hozzáadja a successfulCell elemet a row-hoz //  
};

/**
 * Űrlap létrehozása és kezelése.
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem, ahová az adatok kerülnek
 * @param {HTMLElement} container  // A konténer, amely tartalmazza az űrlapot
 * @param {Array<RevolutionData>} dataArray  // Az adatok tömbje, amelybe az új objektumok kerülnek
 * @returns {void}  // Nem ad vissza értéket
 */
const createForm = (tableBody, container, dataArray) => { // Függvény: űrlap létrehozása és adatbevitel kezelése
    const formDiv = makeDiv('form'); // Létrehoz egy div-et "form" osztállyal //  
    container.appendChild(formDiv); // Hozzáadja a formDiv-et a container-hez //  

    const formSim = document.createElement('form'); // Létrehoz egy <form> elemet //  
    formDiv.appendChild(formSim); // Hozzáfűzi a formSim-et a formDiv-hez //  

    const fieldElementList = [ // Definiálja az űrlap mezőinek adatait
        { fieldid: 'revolution', fieldLabel: 'forradalom' }, // Első mező: forradalom
        { fieldid: 'year', fieldLabel: 'évszám' },          // Második mező: évszám
        { fieldid: 'successful', fieldLabel: 'sikeres' }     // Harmadik mező: sikeres
    ];

    for (const fieldElement of fieldElementList) { // Iterál a fieldElementList elemein //  
        const field = makeDiv('field'); // Létrehoz egy div-et "field" osztállyal //  
        formSim.appendChild(field); // Hozzáadja a field-et a formSim-hez //  

        const label = document.createElement('label'); // Létrehoz egy <label> elemet //  
        label.htmlFor = fieldElement.fieldid; // Beállítja a label "for" attribútumát a fieldElement.fieldid értékére //  
        label.textContent = fieldElement.fieldLabel; // Beállítja a label szövegét a fieldElement.fieldLabel értékre //  
        field.appendChild(label); // Hozzáadja a label-t a field-hez //  

        field.appendChild(document.createElement('br')); // Hozzáad egy sortörést a field-hez //  

        if (fieldElement.fieldid === 'successful') { // Ellenőrzi, hogy a mező "successful"-e //  
            const select = document.createElement('select'); // Létrehoz egy <select> elemet //  
            select.id = fieldElement.fieldid; // Beállítja a select id-jét a fieldElement.fieldid értékére //  

            const optionYes = document.createElement('option'); // Létrehoz egy <option> elemet a "yes" választáshoz //  
            optionYes.value = 'yes'; // Beállítja az optionYes értékét "yes"-re //  
            optionYes.textContent = 'igen'; // Beállítja az optionYes megjelenített szövegét "igen"-re //  
            select.appendChild(optionYes); // Hozzáadja az optionYes-t a select-hez //  

            const optionNo = document.createElement('option'); // Létrehoz egy <option> elemet a "no" választáshoz //  
            optionNo.value = 'no'; // Beállítja az optionNo értékét "no"-ra //  
            optionNo.textContent = 'nem'; // Beállítja az optionNo megjelenített szövegét "nem"-re //  
            select.appendChild(optionNo); // Hozzáadja az optionNo-t a select-hez //  

            field.appendChild(select); // Hozzáadja a select elemet a field-hez //  
        } else { // Ha nem a "successful" mezőről van szó //  
            const input = document.createElement('input'); // Létrehoz egy <input> elemet //  
            input.id = fieldElement.fieldid; // Beállítja az input id-jét a fieldElement.fieldid értékére //  
            field.appendChild(input); // Hozzáadja az input elemet a field-hez //  
        }

        const error = document.createElement('span'); // Létrehoz egy <span> elemet a hibák megjelenítéséhez //  
        error.className = 'error'; // Beállítja az error span osztályát "error"-re //  
        field.appendChild(error); // Hozzáadja az error elemet a field-hez //  
    }

    const button = document.createElement('button'); // Létrehoz egy <button> elemet a beküldéshez //  
    button.textContent = 'hozzáadás'; // Beállítja a button szövegét "hozzáadás"-ra //  
    formSim.appendChild(button); // Hozzáadja a button-t a formSim-hez //  

    formSim.addEventListener('submit', (e) => { // Feliratkozik a formSim submit eseményére //  
        e.preventDefault(); // Megakadályozza az alapértelmezett beküldést //  
        const valueObject = {}; // Létrehoz egy üres objektumot az űrlap adatainak tárolásához //  
        let valid = true; // Inicializálja az érvényesítési állapotot igazra //  

        const inputFields = e.target.querySelectorAll('input, select'); // Lekéri az összes input és select elemet az űrlapból //  
        for (const inputField of inputFields) { // Iterál az inputFields elemein //  
            const error = inputField.parentElement.querySelector('.error'); // Lekéri a megfelelő error span-t //  
            error.textContent = ''; // Törli az esetleges korábbi hibaüzenetet //  

            if (inputField.value === '') { // Ellenőrzi, hogy az input üres-e //  
                error.textContent = 'Kötelező megadni'; // Beállítja a hibaüzenetet, ha üres az input //  
                valid = false; // Beállítja az érvényesítést hamisra //  
            }

            // Átalakítja az input értékét: 'yes' -> true, 'no' -> false, egyébként a szöveg értékét adja vissza
            valueObject[inputField.id] = inputField.value === 'yes' ? true : inputField.value === 'no' ? false : inputField.value; // Beállítja a valueObject értékét
        }

        if (valid) { // Ha az űrlap minden mezője megfelelően kitöltött //  
            dataArray.push(valueObject); // Hozzáadja a valueObject-et az adatok tömbjéhez //  
            addRow(valueObject, tableBody); // Új sort ad a táblázathoz a bevitt adatok alapján //  
            formSim.reset(); // Visszaállítja az űrlapot alapértelmezett állapotába //  
        }
    });
};

/**
 * Fájl feltöltés kezelése.
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem, ahová az adatok kerülnek
 * @param {HTMLElement} container  // A konténer, amely tartalmazza a fájl feltöltőt
 * @param {Array<RevolutionData>} dataArray  // Az adatok tömbje, amelybe a beolvasott objektumok kerülnek
 * @returns {void}  // Nem ad vissza értéket
 */
const createFileUpload = (tableBody, container, dataArray) => { // Függvény: fájl feltöltésének kezelése
    const fileInput = document.createElement('input'); // Létrehoz egy <input> elemet a fájl feltöltéshez //  
    fileInput.type = 'file'; // Beállítja az input típusát "file"-ra //  
    container.appendChild(fileInput); // Hozzáadja a fileInput-ot a container-hez //  

    fileInput.addEventListener('change', (e) => { // Feliratkozik a fileInput változás eseményére //  
        const file = e.target.files[0]; // Lekéri az első kiválasztott fájlt //  
        const fileReader = new FileReader(); // Létrehoz egy FileReader objektumot a fájl beolvasásához //  

        fileReader.onload = () => { // Amikor a fájl tartalma beolvasódik
            const lines = fileReader.result.split('\n').slice(1); // A fájl tartalmát sortömbbé alakítja és kihagyja az első sort (fejléc) //  
            for (const line of lines) { // Iterál az egyes sorokon //  
                const fields = line.trim().split(';'); // Levágja a felesleges szóközöket, majd elválasztja a sor elemeit ';' mentén //  
                const data = { // Létrehoz egy adat objektumot az aktuális sor alapján //  
                    revolution: fields[0], // Beállítja a forradalom értékét az első mezőből //  
                    year: fields[1], // Beállítja az évszám értékét a második mezőből //  
                    successful: fields[2] === 'igen' // Átalakítja a harmadik mező értékét logikai értékké (true, ha "igen") //  
                };
                dataArray.push(data); // Hozzáadja a data objektumot az adatok tömbjéhez //  
                addRow(data, tableBody); // Új sort ad a táblázathoz a beolvasott adatokkal //  
            }
        };

        fileReader.readAsText(file); // Elindítja a fájl beolvasását szövegként //  
    });
};

/**
 * Adatok exportálása CSV fájlba.
 * @param {HTMLElement} container  // A konténer, amely tartalmazza az export gombot
 * @param {Array<RevolutionData>} dataArray  // Az adatok tömbje, melyből a CSV készül
 * @returns {void}  // Nem ad vissza értéket
 */
const createFileDownload = (container, dataArray) => { // Függvény: adatok CSV fájlba történő exportálása
    const exportButton = document.createElement('button'); // Létrehoz egy <button> elemet az exportáláshoz //  
    exportButton.textContent = 'Adatok letöltése'; // Beállítja a button szövegét "Adatok letöltése"-re //  
    container.appendChild(exportButton); // Hozzáadja az exportButton-t a container-hez //  

    exportButton.addEventListener('click', () => { // Feliratkozik a button kattintás eseményére //  
        const content = ['forradalom;évszám;sikeres', ...dataArray.map(item => `${item.revolution};${item.year};${item.successful ? 'igen' : 'nem'}`)].join('\n'); // Összeállítja a CSV tartalmat: első sor a fejléc, majd az adatok soronként
        const file = new Blob([content]); // Létrehoz egy Blob objektumot a CSV tartalommal //  
        const link = document.createElement('a'); // Létrehoz egy <a> elemet a letöltési linknek //  
        link.href = URL.createObjectURL(file); // Beállítja a link href-jét a Blob URL-re //  
        link.download = 'adatok.csv'; // Beállítja a letöltendő fájl nevét "adatok.csv"-re //  
        link.click(); // Programozott kattintással elindítja a letöltést //  
        URL.revokeObjectURL(link.href); // Felszabadítja a Blob URL erőforrásait //  
    });
};
/**
 * Szűrő űrlap létrehozása.
 * @param {HTMLElement} container  // A konténer, amely tartalmazza a szűrő űrlapot
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem, melyet szűrni kívánunk
 * @param {Array<RevolutionData>} dataArray  // Az adatok tömbje, amelyből a szűrés készül
 * @returns {void}  // Nem ad vissza értéket
 */
const createFilterForm = (container, tableBody, dataArray) => {
    // Létrehoz egy div elemet, amely a szűrő űrlapot tartalmazza, és hozzáadja a megadott konténerhez.
    const filterFormDiv = makeDiv('filterForm'); // Létrehoz egy div-et "filterForm" osztállyal.
    container.appendChild(filterFormDiv); // Hozzáadja a div-et a megadott konténerhez.

    // Létrehoz egy <form> elemet, amely a szűrő űrlapot képviseli, és hozzáadja a filterFormDiv-hez.
    const formForFilter = document.createElement('form'); // Létrehoz egy <form> elemet.
    filterFormDiv.appendChild(formForFilter); // Hozzáadja a form-ot a filterFormDiv-hez.

    // Létrehoz egy <select> elemet, amely a szűrési opciókat tartalmazza, és hozzáadja a form-hoz.
    const select = document.createElement('select'); // Létrehoz egy <select> elemet.
    formForFilter.appendChild(select); // Hozzáadja a select-et a form-hoz.

    // Definiálja a szűrési opciókat egy tömbben.
    const options = [
        { value: '', innerText: 'üres' }, // Üres opció, amely nem szűr semmire.
        { value: 'revolution', innerText: 'forradalom' }, // Szűrés forradalom alapján.
        { value: 'year', innerText: 'évszám' }, // Szűrés évszám alapján.
        { value: 'successful', innerText: 'sikeres' } // Szűrés sikeresség alapján.
    ];

    // Iterál a szűrési opciókon, és mindegyiket hozzáadja a <select> elemhez.
    for (const option of options) {
        const optionElement = document.createElement('option'); // Létrehoz egy <option> elemet.
        optionElement.value = option.value; // Beállítja az opció értékét.
        optionElement.innerText = option.innerText; // Beállítja az opció megjelenített szövegét.
        select.appendChild(optionElement); // Hozzáadja az opciót a select-hez.
    }

    // Létrehoz egy <input> elemet, amely a szűrési értéket fogadja, és hozzáadja a form-hoz.
    const input = document.createElement('input'); // Létrehoz egy <input> elemet.
    input.id = 'filterInput'; // Beállítja az input ID-ját "filterInput"-ra.
    formForFilter.appendChild(input); // Hozzáadja az inputot a form-hoz.

    // Létrehoz egy <button> elemet, amely a szűrési műveletet indítja, és hozzáadja a form-hoz.
    const button = document.createElement('button'); // Létrehoz egy <button> elemet.
    button.textContent = 'Szűrés'; // Beállítja a gomb szövegét "Szűrés"-re.
    formForFilter.appendChild(button); // Hozzáadja a gombot a form-hoz.

    // Létrehoz egy div elemet az eredmények megjelenítésére, és hozzáadja a konténerhez.
    const resultDiv = document.createElement('div'); // Létrehoz egy <div> elemet.
    resultDiv.className = 'result'; // Beállítja a div osztályát "result"-ra.
    container.appendChild(resultDiv); // Hozzáadja a div-et a konténerhez.

    // Feliratkozik a form "submit" eseményére, hogy kezelje a szűrési műveletet.
    formForFilter.addEventListener('submit', (e) => {
        e.preventDefault(); // Megakadályozza az alapértelmezett form beküldési viselkedést.

        // Lekéri a szűrési értéket és a kiválasztott szűrési opciót.
        const filterInput = input.value.toLowerCase(); // Az input értékét kisbetűssé alakítja.
        const selectedOption = select.value; // Lekéri a kiválasztott opció értékét.

        // Szűri az adatokat a megadott feltételek alapján.
        const filteredArray = dataArray.filter(item => {
            if (!selectedOption) return true; // Ha nincs kiválasztott opció, minden elem megfelel.
            const value = item[selectedOption]; // Lekéri az aktuális elem megfelelő mezőjét.
            return typeof value === 'string' // Ellenőrzi, hogy a mező szöveg-e.
                ? value.toLowerCase().includes(filterInput) // Ha szöveg, ellenőrzi, hogy tartalmazza-e a szűrési értéket.
                : value === (filterInput === 'igen'); // Ha nem szöveg, ellenőrzi, hogy megegyezik-e a szűrési értékkel.
        });

        // Törli a táblázat törzsét, hogy csak a szűrt elemek jelenjenek meg.
        tableBody.innerHTML = ''; // Kiüríti a táblázat törzsét.

        // Iterál a szűrt elemek tömbjén, és mindegyiket hozzáadja a táblázathoz.
        for (const item of filteredArray) {
            addRow(item, tableBody); // Hozzáad egy sort a táblázathoz az aktuális elem alapján.
        }

        // Frissíti az eredmény div tartalmát a szűrt elemek számával.
        resultDiv.textContent = `A feltételnek megfelelő elemek száma: ${filteredArray.length}`; // Beállítja a div szövegét a szűrt elemek számával.
    });
};