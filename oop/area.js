/**
 * Az Area osztály egy új div elemet hoz létre a fő konténeren belül.
 * Ha a fő konténer még nem létezik, akkor azt létrehozza és hozzáadja a dokumentumhoz.
 */
class Area {
    /**
     * Létrehoz egy új területet a megadott osztálynévvel.
     * @param {string} osztaly - Az új div elemhez tartozó CSS osztály neve.
     */
    constructor(osztaly) {
        // Megkeressük a fő konténer elemet az oldalon, amelynek osztálya 'container'
        let kont = document.querySelector('.container-oop');
        
        // Ha a fő konténer elem nem található, akkor létrehozzuk azt
        if (!kont) {
            // Új div elem létrehozása a fő konténernek
            kont = document.createElement('div');
            
            // Beállítjuk a div 'className' attribútumát 'container'-re
            kont.className = 'container-oop';
            
            // A fő konténer elemet hozzáadjuk a dokumentum <body> részéhez, hogy látható legyen az oldalon
            document.body.appendChild(kont);
        }
        
        // Létrehozunk egy új div elemet, amelyet az Area osztály kezel
        const areaElem = document.createElement('div');
        
        // Beállítjuk az új div 'className' attribútumát a konstruktor paramétereként megadott értékre
        areaElem.className = osztaly;
        
        // Az új területet (areaElem) hozzáadjuk a fő konténerhez, így az a konténer gyerek elemeként jelenik meg
        kont.appendChild(areaElem);
    }
}