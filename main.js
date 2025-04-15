
// Globális adatokat tároló tömb létrehozása
const dataArray = []; // dataArray: Az adatok tárolására szolgáló tömb

// Fő tartalmat megjelenítő container elem létrehozása a "container" osztállyal
const mainContainer = makeDiv('container'); // mainContainer: Egy div elem, amely a container osztályt kapja meg

// Hozzáadja a létrehozott container div-et a dokumentum <body> eleméhez
document.body.appendChild(mainContainer); // A mainContainer elemet csatolja a document.body-hoz

/**
 * @callback TableBodyInitializer
 * @param {HTMLTableSectionElement} tableBody  // A táblázat törzsét reprezentáló HTML elem
 * @returns {void}  // Nem ad vissza értéket
 */

/* 
 * Táblázat létrehozása a mainContainer-ben, majd a callback-ben meghívja a további funkciókat:
 * - Űrlap létrehozása az adatok beviteléhez,
 * - Fájl feltöltés kezelése az adatok beolvasásához,
 * - Adatok exportálása fájlba,
 * - Szűrő űrlap létrehozása az adatok szűréséhez.
 */
createTable(mainContainer, (tableBody) => { // createTable: Létrehozza a táblázatot a mainContainer-ben, majd visszaadja a táblázat törzsét a callback-nek
    createForm(tableBody, mainContainer, dataArray); // createForm: Létrehozza és inicializálja az űrlapot a tableBody, mainContainer és dataArray használatával
    createFileUpload(tableBody, mainContainer, dataArray); // createFileUpload: Beállítja a fájl feltöltés funkciót a tableBody, mainContainer és dataArray használatával
    createFileDownload(mainContainer, dataArray); // createFileDownload: Létrehozza az export gombot, mely a mainContainer-ben jelenik meg, és a dataArray-t használja
    createFilterForm(mainContainer, tableBody, dataArray); // createFilterForm: Inicializálja a szűrő űrlapot a mainContainer-ben, a tableBody elemmel és a dataArray adatokkal
});
