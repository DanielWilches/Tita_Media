// elementos header
const items = document.getElementsByName('items');
const itemsMain = document.getElementsByName('itemsMain');

const inputHeader = document.getElementById('inputHeader');
const searchBtn = document.getElementsByClassName('header--btn__search');
const cancelBtn = document.getElementsByClassName('header--btn__cancel');
const menu = document.getElementsByClassName('header--nav-opciones');
const barras = document.getElementsByName('barras');
const btnMenu = document.getElementById('btnMenu');
const mainContent = document.getElementById('main--content');
const menuHeader = document.getElementById('menuHeader');
const mainPorfolio = document.getElementById('main--portafolio');
let arrayOfColumnas = []
let count = 0;
let page = 1;

let conexion = new Conexion();
// animacion de busqueda en menu
let inAnimateSearch = () => {
    if (window.matchMedia('(max-width: 990px)').matches) {
        inputHeader.style.animationName = "in-search-movil";
        inputHeader.focus();
        searchBtn[0].style.animationName = 'out-btn';
        cancelBtn[0].style.animationName = 'in-btn'
    } else {
        inputHeader.style.animationName = "search-in";
        inputHeader.focus();
        searchBtn[0].style.animationName = 'out-btn';
        cancelBtn[0].style.animationName = 'in-btn';
    }

    window.addEventListener('resize', event => {
        if (event.target.innerWidth > 990) {
            inputHeader.style.animationName = "in-search-movil";
            inputHeader.focus();
            searchBtn[0].style.animationName = 'out-btn';
            cancelBtn[0].style.animationName = 'in-btn'
        } else {
            inputHeader.style.animationName = "search-in";
            inputHeader.focus();
            searchBtn[0].style.animationName = 'out-btn';
            cancelBtn[0].style.animationName = 'in-btn';
        }
    });



}
let outAnimateSearch = () => {

    if (window.matchMedia('(max-width: 990px)').matches) {
        inputHeader.style.animationName = "out-searcch-movil";
        cancelBtn[0].style.animationName = 'out-btn';
        searchBtn[0].style.animationName = 'in-btn'
        inputHeader.value = null;
    } else {
        inputHeader.style.animationName = "search-out";
        cancelBtn[0].style.animationName = 'out-btn';
        searchBtn[0].style.animationName = 'in-btn'
        inputHeader.value = null;
    }

    window.addEventListener('resize', event => {
        if (event.target.innerWidth > 990) {
            inputHeader.style.animationName = "out-searcch-movil";
            cancelBtn[0].style.animationName = 'out-btn';
            searchBtn[0].style.animationName = 'in-btn'
            inputHeader.value = null;
        } else {
            inputHeader.style.animationName = "search-out";
            cancelBtn[0].style.animationName = 'out-btn';
            searchBtn[0].style.animationName = 'in-btn'
            inputHeader.value = null;
        }
    });
}

let menuMovil = () => {
    count++;
    btnMenu.classList.toggle('fixed-btn-menu');
    barras[0].style.animation = "in-btnH1 .5s ease forwards";
    barras[1].style.animation = "in-btnH2 .5s ease forwards";
    barras[2].style.animation = "in-btnH3 .5s ease forwards";
    menu[0].classList.add('header--movil__activated');
    menu[0].style.animationName = 'in-menu';
    if (count > 1) {
        setTimeout(() => {
            menu[0].classList.remove('header--movil__activated');
        }, 1000);
        menu[0].style.animationName = 'out-menu';
        barras[0].style.animation = "out-btnH1 .5s ease forwards";
        barras[1].style.animation = "out-btnH2 .5s ease forwards";
        barras[2].style.animation = "out-btnH3 .5s ease forwards";
    }
    if (count >= 2) {
        count = 0;
    }
}
let closeMenu = () => {
    count++;
    btnMenu.classList.remove('fixed-btn-menu');
    menu[0].style.animationName = 'out-menu';
    barras[0].style.animation = "out-btnH1 .5s ease forwards";
    barras[1].style.animation = "out-btnH2 .5s ease forwards";
    barras[2].style.animation = "out-btnH3 .5s ease forwards";
    setTimeout(() => {
        menu[0].classList.remove('header--movil__activated');
    }, 1000);

    if (count >= 2) {
        count = 0;
    }

}


let buscar = (event) => {
    // console.log(event)
    if (event.keyCode === 13) {
        console.log(mainPorfolio.offsetTop)
        window.scroll(0, mainPorfolio.offsetTop);
        getImagnes(inputHeader.value)
        outAnimateSearch()
    }
}

// trae imagenes
// input string  / number
let getImagnes = (value, page) => {
    selectItems(items, value);
    selectItems(itemsMain, value);
    let reasult = conexion.getImages(value, page)
        .then(res => {
            let result = res;
            // console.log(result)
            insertImg(result);
        })
}

// agrega la clase al item selecionado
// input objt /  string
let selectItems = (values, query) => {

    values.forEach(e => {
        e.classList.remove('Activate-menu');
        if (e.lastChild.data === query) {
            e.classList.add('Activate-menu');
        }
    })
}

//cargar de primeras imagnes
window.onload = () => {
    getImagnes('all', 1);
}



//inserta imagnes 
// input array
let insertImg = (images) => {
    closeMenu();
    count = 0;
    let newArrays = separarArrglos(images);
    arrayOfColumnas.forEach((elemento, i) => {

        const divColumn = document.createElement('div');
        divColumn.classList.add('main--content__columns')
        mainContent.appendChild(divColumn);

        for (let i = 0; i < elemento.length; i++) {
            console.log()
            const contentImg = document.createElement('div');
            const img = document.createElement('img');
            const solapa = document.createElement('div');
            const textName = document.createElement('p');
            const enlace = document.createElement('a');
            img.src = elemento[i].urls.small;

            if (window.matchMedia('(max-width: 990px)').matches) {// menor a 990
                contentImg.classList.add('main--conent__items');
                contentImg.addEventListener('click', event => {
                    contentImg.classList.toggle('solapa-hover');
                    setTimeout(() => {
                        contentImg.classList.remove('solapa-hover')
                    }, 3000);
                })
            } else {
                contentImg.classList.add('main--conent__items', 'solapa-hover');
            }

            window.addEventListener('resize', event => {
                if (event.target.innerWidth > 990) { // mayor  a 990
                    contentImg.classList.add('main--conent__items', 'solapa-hover');
                } else {
                    contentImg.classList.remove('solapa-hover')
                    contentImg.addEventListener('click', event => {
                        contentImg.classList.toggle('solapa-hover');
                        setTimeout(() => {
                            contentImg.classList.remove('solapa-hover')
                        }, 3000);
                    })
                }
            });

            solapa.classList.add('solapa');
            contentImg.classList.add('main--conent__items');
            contentImg.appendChild(img);
            contentImg.appendChild(solapa);
            solapa.appendChild(textName).innerText = images[0].user.username;
            enlace.href = images[i].links.html;
            enlace.target = '_blank';
            solapa.appendChild(enlace).innerText = "pagina oficial ";
            divColumn.appendChild(contentImg);
        }
    })

}
let separarArrglos = (array) => {
    let arrayTamano = array.length;
    const longitudArray = 4;
    for (let i = 0; i < array.length; i += longitudArray) {
        let peadazo = array.slice(i, i + longitudArray);
        arrayOfColumnas.push(peadazo);
    }
    return arrayOfColumnas;
}

let removeChilds = () => {
    arrayOfColumnas = []
}


let moreImages = () => {
    page++;
    let busqueda = conexion.getLocalStorage();
    // string / number
    getImagnes(busqueda, page);
}
