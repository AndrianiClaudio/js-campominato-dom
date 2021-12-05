// vitare problemi con l'inizializzazione di git). L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. : bomba:
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.

// BONUS:
// 1 - quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2 - quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
/**
 * 
 * @param {*} my_this this,indica lo square cliccato.
 * @param {*} bombs_index array contentente indici in cui sono presenti le nostre bombe.
 * @param {*} clicked_index array contente indici square cliccati. 
 * @returns div che stampa il punteggio e con tutte le bombe visualizzate.
 */
function endGame(my_this,bombs_index,clicked_index,msg) {
    const divScore = createDiv('div-score');
    // my_this.classList.add('bomb');
    const squareAll = document.querySelectorAll('.square');
    for(let j=0;j<squareAll.length;j++) {
        squareAll[j].classList.add('pointer-events-none');
        if(bombs_index.includes(j)) {
            squareAll[j].classList.add('bomb');
        }
    }
    divScore.innerHTML = msg + clicked_index.length;
    // stampa punteggio
    return divScore;
}
/**
 * 
 * @param {*} row #righe
 * @param {*} col #colonne
 */
function printGrid(row, col) {
    let dim = row * col;
    // acquisisco container
    const container = document.querySelector('.container');
    //rimuovo ogni possibile griglia precedente, se é presente
    container.innerHTML = '';
    const clicked_index = [];
    let bombs_index = generateBomb();
    let clicked_index_max_length = dim - bombs_index.length;
    for (let i = 0; i < dim; i++) {
        //creo il mio square
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `calc(100% / ${col})`;
        square.style.height = `calc(100% / ${row})`;
        // aggiungi un quadrato col numero
        square.innerHTML = i + 1;
        // click su cella
        square.addEventListener('click', function () {
            if (!bombs_index.includes(parseInt(this.innerHTML) -1) && clicked_index.length <= clicked_index_max_length) {
                this.classList.add('click');
                this.classList.add('pointer-events-none');
                clicked_index.push(i);
                if (clicked_index.lengthS == clicked_index_max_length) {
                    divScore = endGame(this, bombs_index, clicked_index, 'Complimenti! Hai Vinto. Punteggio massimo ottenuto: ');
                    container.prepend(divScore);
                }
            } else {
                // se numero presente in lista generati ==> bomba
                divScore = endGame(this, bombs_index, clicked_index, 'Hai ottenuto un punteggio pari a ');
                container.prepend(divScore);
            }
        });
        container.appendChild(square);
    }
}
/**
 * 
 * @param {*} difficulty  attuale difficolta del gioco(string: easy-medium-hard)
 * @returns array[#righe,#colonne]
 */
function gridSetup (difficulty) {
    let row;
    let col;
    switch (difficulty) {
        case 'easy':
            row = 10;
            col = 10;
            break;
        case 'medium':
            row = 9;
            col = 9;
            break;
        case 'hard':
            row = 7;
            col = 7;
            // row = 2;
            // col = 2;
            break;
        default:
            // modifiche impreviste, setta a zero per non creare griglia, non soddisfando la condizione del ciclo for sottostante
            row = 0;
            col = 0;
    }
    return [row,col];
}
/**
 * 
 * @param {*} difficulty attuale difficolta del gioco(string: easy-medium-hard)
 */
function generateGrid(difficulty) {
    // attribuisci a row e col valori diversi a seconda della difficoltá
    row = gridSetup(difficulty)[0];
    col = gridSetup(difficulty)[1];
    printGrid(row, col);
}
//genera numero casuale tra un min e un max(il numero di celle disponibili)
/**
 * 
 * @param {*} min posizione cella iniziale
 * @param {*} max posizione cella finale
 * @returns generazione numero casuale
 */
function intGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 
 * @param {*} difficulty attuale difficolta del gioco(string: easy-medium-hard)
 * @returns dimensione: righe x colonne
 */
function getDim(difficulty) {
    row = gridSetup(difficulty)[0];
    col = gridSetup(difficulty)[1];
    return row * col;
}
/**
 * 
 * @returns array contente gli indici delle bombe
 */
function generateBomb() {
    // ciclo: genero sempre 16 bombe
    const numBomb = 16;
    // const numBomb = 0;
    const bombs_index = [];
    for (let i = 0; i < numBomb; i++) {
        const dim = getDim(select.value);
        let number = intGen(0, dim);
        // se doppione rigenero numero
        while (bombs_index.includes(number)) {
            number = intGen(0, dim);
        }
        bombs_index.push(number);
    }
    // console.log(bombs_index);
    return bombs_index;
}

/**
 * PROGRAMMA
 *  */
createDom(); // in altro file
//ottengo bottone gioco
const button = document.querySelector('.btn-play');
//azione play
const select = document.querySelector('select');
//cambia griglia al click sul bottone
button.addEventListener('click', function () {
    //creo griglia a seconda delle dimenzioni
    switch (select.value) {
        default: generateGrid(select.value);
    }
});
// cambia griglia al change della select
select.addEventListener('change', function () {
    switch (select.value) {
        default: generateGrid(select.value);
        // let bombs_index = generateBomb();
    }
})