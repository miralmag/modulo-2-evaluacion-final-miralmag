'use strict';

// Variables globales

const textInput = document.querySelector('.js_text_input');
const searchButton = document.querySelector('.js_search_btn');
const resetButton = document.querySelector('.js_reset_btn');
const ulAnimes = document.querySelector('.js_ul_list');
const ulFavouriteAnimes = document.querySelector('.js_favourites_list');
const resetAllFav = document.querySelector('.js_reset_allfav');
const buttonLog = document.querySelector('.js_log_button');

// Arrays

let animes = [];
let favourites = [];


// FUNCIONES

function handleClickLog(e) {
  e.preventDefault();
console.log(favourites.length);
}

buttonLog.addEventListener('click', handleClickLog);

// Función que pinta la lista de favoritos
function renderFavourites(){
  const badImg = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
  const placeholderImg = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  ulAnimes.innerHTML = '';
  let html = '';
  for (const oneFav of favourites) {
    html += `<li class="js_anime_item item fav_clicked__inlist" id="${oneFav.mal_id}">`;
    if (oneFav.images.jpg.image_url === badImg) {
      html += `<img class="item-image" src="${placeholderImg}">`;
    } else {
      html += `<img class="item-image" src="${oneFav.images.jpg.image_url}"}">`;
    }
    html += `<h3 class="item-title">${oneFav.title}</h3><button id="${oneFav.mal_id}" class="js_reset_one reset_one"><i class="fa-solid fa-trash-can"></i></button></li>`;
  }
  ulFavouriteAnimes.innerHTML = html;
  renderAnimes();
  listenerFavourites();
  listenersResetOne();
}

// Función manejadora del clic en los animes favoritos
function handleClickFavourites(e) {

  const selectedId = parseInt(e.currentTarget.id);
  const animeSelected = animes.find((item) => item.mal_id === selectedId);
  const favouriteAnimeSelected = favourites.findIndex((fav) => fav.mal_id === selectedId);

  if (favouriteAnimeSelected === -1) {
    favourites.push(animeSelected);
  } else {favourites.splice(favouriteAnimeSelected, 1);
  }

  localStorage.setItem ('data', JSON.stringify(favourites));
  renderFavourites();
}


// Función escuchadora (metemos el addEventListener en una función porque necesitamos recorrer el array)
function listenerFavourites() {
  const animeItems = document.querySelectorAll('.js_anime_item');
  for (const oneItem of animeItems) {
    oneItem.addEventListener('click', handleClickFavourites);
  }
}

// Función para pintar la lista de resultados
function renderAnimes() {
  const badImg = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
  const placeholderImg = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

  ulAnimes.innerHTML = '';
  let html = '';
  let favClass = '';
  for (const oneAnime of animes) {

    const favoriteFoundIndex = favourites.findIndex(
      (fav) => oneAnime.mal_id === fav.mal_id
    );
    if (favoriteFoundIndex !== -1) {
      favClass = '--clicked';
    } else {
      favClass = '--search';
    }

    html += `<li class="js_anime_item item item${favClass}" id="${oneAnime.mal_id}">`;
    if (oneAnime.images.jpg.image_url === badImg) {
      html += `<img class="item-image" src="${placeholderImg}">`;
    } else {
      html += `<img class="item-image" src="${oneAnime.images.jpg.image_url}">`;
    }
    html += `<h3 class="item-title">${oneAnime.title}</h3><h4>${oneAnime.score}</h4>`;
    if (oneAnime.score > 7) {
      html += `<h4>Recomendado</h4>`;
    }
    html += `</li>`;
  }
  ulAnimes.innerHTML = html;
  listenerFavourites();
}

// Función manejadora del clic en Buscar
function handleSearch(event) {
  event.preventDefault();
  const textInputValue = textInput.value;
  fetch (`https://api.jikan.moe/v4/anime?q=${textInputValue}`)
    .then ((response) => response.json())
    .then ((data) => {
      animes = data.data;
      renderAnimes();
    });
}

// Función para resetear resultados
function handleReset(event){
  event.preventDefault;
  animes = [];
  renderAnimes();
}

//Función para resetear favoritos y borrarlos de local
function handleResetAllFav(event) {
  event.preventDefault;
  favourites = [];
  let html = '';
  ulFavouriteAnimes.innerHTML = html;
  localStorage.removeItem('data');
}

// Función manejadora del click en los botones de reset individuales (no he conseguido que funcione, pero he dejado el botón porque al pulsar se activa el splice anterior que hicimos en handleClickFavourites)
function handleClickResetOne (e) {
  e.preventDefault;
 console.log(e.currentTarget.id);
const resetOneSelectedId = parseInt(e.currentTarget.id);
const resetOneSelectedIndex = favourites.findIndex((fav) => fav.mal_id === resetOneSelectedId);
console.log(resetOneSelectedIndex);
favourites.splice(resetOneSelectedIndex, 1);
  console.log(favourites);
  localStorage.setItem('data', JSON.stringify(favourites));
renderFavourites();
}

// Función escuchadora de los botones de reset individuales
function listenersResetOne() {
  const allResetOneButtons = document.querySelectorAll('.js_reset_one');
  for (const resetOneButton of allResetOneButtons) {
    resetOneButton.addEventListener('click', handleClickResetOne);
  }}


// Eventos

searchButton.addEventListener('click', handleSearch);
resetButton.addEventListener('click', handleReset);
resetAllFav.addEventListener('click', handleResetAllFav);

// Acciones al cargar la página

function onLoad() {
  const dataLocalStorage = JSON.parse(localStorage.getItem('data'));
  if (dataLocalStorage) {
    favourites = dataLocalStorage;
    renderFavourites();
  }
}
onLoad();