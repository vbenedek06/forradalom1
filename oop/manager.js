// Egy osztályt definiálunk RevolutionHandler néven, amely a forradalmak kezeléséért felel.
class RevolutionHandler {
    // Privát mező, amely egy tömböt tárol a Revolution objektumok számára.
    #revolutionList;

    // Privát mező, amely egy callback függvényt tárol – ezt hívjuk majd meg, ha új forradalmat adunk hozzá.
    #onRevolutionAdded;

    // A konstruktor metódus automatikusan lefut, amikor létrehozunk egy új RevolutionHandler példányt.
    constructor() {
        // Inicializáljuk a privát mezőt üres tömbként, ide kerülnek majd a forradalmak.
        this.#revolutionList = [];
    }

    /**
     * Ez a metódus lehetővé teszi egy callback függvény beállítását, amit meghívunk, amikor új forradalom kerül hozzáadásra.
     *
     * @param {(revolution: Revolution) => void} callback -
     * Egy függvény, amely egy Revolution objektumot vár bemenetként. Ezt fogjuk később meghívni.
     */
    setRevolutionAddedCallback(callback) {
        // A megadott callback függvényt elmentjük a privát mezőbe.
        this.#onRevolutionAdded = callback;
    }

    /**
     * Új forradalom (Revolution objektum) hozzáadása a belső listához, majd a callback meghívása, ha az definiálva van.
     *
     * @param {Revolution} revolution - A Revolution típusú objektum, amelyet hozzá akarunk adni a listához.
     */
    addRevolution(revolution) {
        // Hozzáadjuk az új Revolution objektumot a belső tömbhöz.
        this.#revolutionList.push(revolution);

        // Ellenőrizzük, hogy be van-e állítva callback. Ha igen, akkor meghívjuk azt a most hozzáadott objektummal.
        if (this.#onRevolutionAdded) {
            this.#onRevolutionAdded(revolution);
        }
    }
}
