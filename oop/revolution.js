class Revolution {
    // Privát mező a forradalom nevének tárolására
    // Ez a mező tartalmazza a forradalom nevét, és nem érhető el közvetlenül kívülről.
    #forradalom;

    // Privát mező az évszám tárolására
    // Ez a mező tartalmazza a forradalom eseményének évét, és nem érhető el közvetlenül kívülről.
    #evszam;

    // Privát mező annak tárolására, hogy a forradalom sikeres volt-e
    // Ez a mező tárolja, hogy a forradalom sikeres volt-e (true) vagy sem (false).
    #sikeres;

    /**
     * Getter metódus a forradalom nevének lekérésére
     * Ez a metódus lehetővé teszi, hogy hozzáférjünk a #forradalom privát mezőhöz.
     * @returns {string} A forradalom neve
     */
    get forradalom() {
        // A getter metódus visszaadja a #forradalom privát mező értékét
        return this.#forradalom;
    }

    /**
     * Getter metódus az évszám lekérésére
     * Ez a metódus lehetővé teszi, hogy hozzáférjünk a #evszam privát mezőhöz.
     * @returns {string} Az évszám
     */
    get evszam() {
        // A getter metódus visszaadja a #evszam privát mező értékét
        return this.#evszam;
    }

    /**
     * Getter metódus annak lekérésére, hogy sikeres volt-e a forradalom
     * Ez a metódus lehetővé teszi, hogy hozzáférjünk a #sikeres privát mezőhöz.
     * @returns {boolean} Igaz, ha sikeres volt a forradalom, hamis, ha nem
     */
    get sikeres() {
        // A getter metódus visszaadja a #sikeres privát mező értékét
        return this.#sikeres;
    }

    /**
     * Konstruktor – új Revolution objektum létrehozása a megadott adatokkal
     * Ez a metódus a forradalom nevét, évszámát és sikerességét inicializálja,
     * amikor létrejön a Revolution objektum.
     * @param {string} forradalom - A forradalom neve, amit a konstruktorban megadunk
     * @param {string} evszam - Az évszám, amikor a forradalom történt
     * @param {boolean} sikeres - (Opcionális) A forradalom sikeressége (true vagy false)
     *                             Az alapértelmezett érték: true, tehát alapból sikeresnek tekintjük
     */
    constructor(forradalom, evszam, sikeres = true) {
        // Az objektum inicializálásakor beállítjuk a forradalom nevét
        // A forradalom paraméter értéke kerül tárolásra a #forradalom privát mezőben
        this.#forradalom = forradalom;

        // Az objektum inicializálásakor beállítjuk az évszámot
        // Az évszam paraméter értéke kerül tárolásra a #evszam privát mezőben
        this.#evszam = evszam;

        // Az objektum inicializálásakor beállítjuk a sikerességet
        // Ha a sikeres paraméter nincs megadva, akkor alapértelmezettként true-t adunk neki
        // A sikeres paraméter értéke kerül tárolásra a #sikeres privát mezőben
        this.#sikeres = sikeres;
    }
}
