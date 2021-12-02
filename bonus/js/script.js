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
function endGame(my_this,bombs_index,clicked_index) {
    const divScore = createDiv('div-score');
    my_this.classList.add('bomb');
    const squareAll = document.querySelectorAll('.square');
    for(let j=0;j<squareAll.length;j++) {
        squareAll[j].classList.add('pointer-events-none');
        if(bombs_index.includes(j)) {
            squareAll[j].classList.add('bomb');
        }
    }
    divScore.innerHTML = `Il tuo punteggio &egrave;: ${clicked_index.length}`;
    // stampa punteggio
    return divScore;
}
function printGrid(row, col) {
    let dim = row * col;
    // acquissco container
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
            ///da creare funzione o condizione migliore....MA codice funziona
            if (bombs_index.includes(parseInt(this.innerHTML)) || clicked_index.length == clicked_index_max_length - 1) {
                // se numero presente in lista generati ==> bomba
                divScore = endGame(this,bombs_index,clicked_index);
                container.prepend(divScore);
            } else {
                this.classList.add('click');
                clicked_index.push(i);
            }
        });
        container.appendChild(square);
    }
}
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
            break;
        default:
            // modifiche impreviste, setta a zero per non creare griglia, non soddisfando la condizione del ciclo for sottostante
            row = 0;
            col = 0;
    }
    return [row,col];
}
function generateGrid(difficulty) {
    // attribuisci a row e col valori diversi a seconda della difficoltá
    row = gridSetup(difficulty)[0];
    col = gridSetup(difficulty)[1];
    printGrid(row, col);
}
//genera numero casuale tra un min e un max(il numero di celle disponibili)
function intGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getDim(difficulty) {
    row = gridSetup(difficulty)[0];
    col = gridSetup(difficulty)[1];
    return row * col;
}
function generateBomb() {
    // ciclo: genero sempre 16 bombe
    const numBomb = 48;
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
    // console.log(bombs_index, 'length: ', bombs_index.length);
    return bombs_index;
}
// CREAZIONE ELEMENTI DOM
function createDiv(mainClass) {
    const div = document.createElement('div');
    div.classList.add(mainClass);
    return div;
}
function createOption(value) {
    let option = document.createElement('option');
    option.value = value;
    return option;
}
function createDom(body) {
    // creo header
    const header = document.createElement('header');
    header.classList.add('header');
    //header-left
    const headerLeft = createDiv('header-left');
    // logo
    const logo = document.createElement('img');
    let logo_src = 'img/logo-boolean.png';
    logo.src = logo_src;
    logo.alt = 'logo di Boolean';
    logo.id = 'logo';
    // titolo
    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = 'Campo Minato';
    //  header-right
    const headerRight = createDiv('header-right');
    // span
    const span_header = document.createElement('span');
    span_header.classList.add('difficulty');
    span_header.innerHTML = 'Difficolt&aacute;: ';
    // select
    const select = document.createElement('select');
    select.name = 'select-difficulty';
    const optionEasy = createOption('easy');
    optionEasy.innerHTML = 'easy';
    // select.append(optionEasy);
    const optionMedium = createOption('medium');
    optionMedium.innerHTML = 'medium';
    // select.append(optionMedium);
    const optionHard = createOption('hard');
    optionHard.innerHTML = 'hard';
    // button
    const button = document.createElement('button');
    button.classList.add('btn-play');
    button.innerHTML = 'Play';
    //main
    const main = document.createElement('main');
    main.classList.add('main');
    const container = createDiv('container');
    // footer
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const copyright = createDiv('copyright');
    const span_footer = document.createElement('span');
    span_footer.classList.add('copyright');
    span_footer.innerHTML = 'Made with <i class="fas fa-heart"></i> by <a href="#" class="subline-link">Boolean</a>';
    // FINE: ----CREAZIONE ELEMENTI DOM
    //elementi inseriti in index.html
    headerLeft.append(logo, title);
    select.append(optionEasy, optionMedium, optionHard);
    headerRight.append(span_header, select, button);
    header.append(headerLeft, headerRight);
    main.append(container);
    footer.append(copyright);
    copyright.append(span_footer);
    //prepend per mantenere script a fondo pagina
    body.prepend(header, main, footer);
    return button;
}

// PROGRAMMA
const body = document.querySelector('body');
//ottengo bottone gioco
let button = createDom(body);
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