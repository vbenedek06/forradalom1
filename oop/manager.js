// Egy osztályt definiálunk RevolutionHandler néven, amely a forradalmak kezeléséért felel.
class RevolutionHandler {
    // Privát mező, amely egy tömböt tárol a Revolution objektumok számára.
    #revolutionList;

    #addRevolutionCallback; // Callback függvény, amely új forradalom hozzáadásakor hívódik meg
    #renderTableCallback; // Callback függvény, amely a táblázat újrarendereléséért felel

    // A konstruktor metódus automatikusan lefut, amikor létrehozunk egy új RevolutionHandler példányt.
    constructor() {
        // Inicializáljuk a privát mezőt üres tömbként, ide kerülnek majd a forradalmak.
        this.#revolutionList = [];
    }

    /** 
    * @callback RevolutionAddedCallback
    * @param {Revolution} revolution - A forradalom objektum, amit feldolgozunk. // Az objektum típusától függően tartalmazza a forradalom nevét, évszámát stb.
    * @returns {void} // Nem ad vissza értéket.
    */ // RevolutionAddedCallback callback definíciója

    /** 
     * @callback RenderTableCallback
     * @param {Revolution[]} filteredList - A szűrt forradalmak listája, amelyet a táblázat renderelésére használnak.
     * @returns {void} // Nem ad vissza értéket.
     */ // RenderTableCallback callback definíciója

    /**
     * Ez a metódus lehetővé teszi egy callback függvény beállítását, amit meghívunk,
     * amikor új forradalom kerül hozzáadásra.
     *
     * @param {RevolutionAddedCallback} callback - Egy függvény, amely egy Revolution objektumot vár bemenetként.
     * Ezt fogjuk később meghívni.
     * @returns {void} Nem ad vissza értéket.
     */
    setRevolutionAddedCallback(callback) {                   // Metódus: új forradalom hozzáadásához szükséges callback beállítása
        this.#addRevolutionCallback = callback;              // Elmenti a callback függvényt a privát #addRevolutionCallback változóba
    }                                                        // Metódus vége: callback későbbi meghívása a forradalom hozzáadásakor

    /**
     * Beállítja a callback függvényt, amely a táblázat újrarendereléséért felel.
     *
     * @param {RenderTableCallback} callback - A callback függvény, amely a szűrt forradalmak listáját fogja fogadni.
     * @returns {void} Nem ad vissza értéket.
     */
    setRenderTableCallback(callback) {                        // Metódus: a táblázat újrarendereléséért felelős callback beállítása
        this.#renderTableCallback = callback;                // Elmenti a callback függvényt a privát #renderTableCallback változóba
    }                                                         // Metódus vége: a render callback később meghívásra kerül a szűrési eredmények alapján

    /**
     * Új forradalom (Revolution objektum) hozzáadása a belső listához, majd a callback meghívása, ha az definiálva van.
     *
     * @param {Revolution} revolution - A Revolution típusú objektum, amelyet hozzá akarunk adni a listához.
     * @returns {void} - Nem ad vissza értéket.
     */
    addRevolution(revolution) {   // Metódus: forradalom objektum hozzáadása
        // Hozzáadjuk az új forradalom objektumot a privát #revolutionList tömbhöz.
        this.#revolutionList.push(revolution);           // A push() metódus hozzáfűzi a revolution objektumot a listához

        // Ellenőrizzük, hogy be van-e állítva a callback, amelyet a forradalom hozzáadásakor kell meghívni.
        if (this.#addRevolutionCallback) {   // Ha létezik az #addRevolutionCallback (nem undefined vagy null)
            // Meghívjuk a forradalom hozzáadási callback függvényt, átadva neki az újonnan hozzáadott revolution objektumot.
            this.#addRevolutionCallback(revolution);     // A callback függvény meghívása a revolution objektummal
        }
    }

    /**
     * Visszaadja a forradalmak listáját.
     *
     * @returns {Revolution[]} - A forradalmak listája.
     */
    getRevolutionList() {   // Metódus: forradalmak listájának lekérése
        // Egyszerűen visszaadja a privát #revolutionList tömb tartalmát.
        return this.#revolutionList; // Visszatér a forradalom objektumokat tartalmazó tömbbel
    }

    /**
     * @callback FilterCallback
     * @param {Revolution} revolution - Egy forradalom objektum a szűréshez.
     * @returns {boolean} - Igaz, ha az adott forradalom objektum megfelel a szűrési feltételeknek, egyébként hamis.
     */

    /**
     * Szűrési művelet végrehajtása a megadott callback alapján, és a táblázat újrarenderelése.
     *
     * @param {FilterCallback} callback - A szűrési feltételt tartalmazó callback függvény, amely eldönti, hogy egy forradalom objektum megfelel-e a feltételnek.
     * @returns {void} - Nem ad vissza értéket.
     */
    filter(callback) { // Metódus: Szűrési művelet végrehajtása a callback alapján
        // Szűrjük a privát #revolutionList tömböt a callback függvény segítségével.
        const filteredList = this.#revolutionList.filter(callback); // A filter() metódus minden elemet átad a callback-nek, majd megtartja azokat, ahol a callback true-t ad vissza

        // Ellenőrizzük, hogy van-e beállítva egy callback a táblázat újrarendereléséhez.
        if (this.#renderTableCallback) { // Ha a #renderTableCallback létezik (nem undefined vagy null)
            // Meghívjuk a renderelésre szolgáló callback függvényt, átadva neki a szűrt listát, hogy a táblázat frissüljön.
            this.#renderTableCallback(filteredList);   // A renderTableCallback függvény meghívása a filteredList paraméterrel a táblázat újrarendereléséhez
        }
    }

    /**
    * Generál egy CSV formátumú szöveget a forradalmak listájából.
    * @returns {string} A forradalmak listája CSV formátumban.
    */
    generateExportString() {
        // A fejléc sor létrehozása
        const eredmeny = ['forradalom;evszam;sikeres']; // A fejléc mezőneveket tartalmazza.

        // Végigiterálunk a belső tömbön (#revolutionList), amely a forradalmak adatait tartalmazza.
        for (const forradalom of this.#revolutionList) {
            // Minden forradalom adatait pontosvesszővel elválasztva hozzáadjuk az eredmény tömbhöz.
            eredmeny.push(`${forradalom.forradalom};${forradalom.evszam};${forradalom.sikeres ? 'igen' : 'nem'}`);
        }

        // A tömb elemeit egyetlen szöveggé alakítjuk, ahol az elemeket új sor választja el.
        return eredmeny.join('\n'); // Az elemeket új sor (`\n`) karakterrel választjuk el.
    }

}
