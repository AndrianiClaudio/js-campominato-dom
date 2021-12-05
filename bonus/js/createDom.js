// CREAZIONE ELEMENTI DOM
/**
 * 
 * @param {*} mainClass nome classe da aggiungere
 * @returns div creato con classe
 */
function createDiv(mainClass) {
    const div = document.createElement('div');
    div.classList.add(mainClass);
    return div;
}
/**
 * 
 * @param {*} value value da applicare alla option da creare
 * @returns option con value
 */
function createOption(value) {
    let option = document.createElement('option');
    option.value = value;
    return option;
}


function createDom() {
    const body = document.querySelector('body');
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
}