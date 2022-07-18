'use strict';

// Variables globales

const textInput = document.querySelector('.js_text_input');
const searchButton = document.querySelector('.js_search_btn');
const resetButton = document.querySelector('.js_reset_btn');
const ulAnimes = document.querySelector('.js_ul_list');
const ulFavouriteAnimes = document.querySelector('.js_favourites_list');
const resetAllFav = document.querySelector('.js_reset_allfav');

// Arrays

let animeList = [];
let favouriteAnimeList = [];


// FUNCIONES

// Función que pinta la lista de favoritos
function renderFavourites() {
  let html = '';
  for (const oneFav of favouriteAnimeList) {
    if (oneFav.images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {html += `<li class="js_anime_item item" id="${oneFav.mal_id}"><img class="item-image" src=${oneFav.images.jpg.image_url}><h3 class="item-title">${oneFav.title}</h3><button class="reset_one js_reset_one"><i class="fa-solid fa-trash"></i></button></li>`;
    } else {
      html += `<li class="js_anime_item item" id="${oneFav.mal_id}"><img class="item-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h3 class="item-title">${oneFav.title}</h3><button class="reset_one js_reset_one"><i class="fa-solid fa-trash"></i></button></li>`;
    }
    ulFavouriteAnimes.innerHTML = html;
  }
}

// Función manejadora del clic en los animes favoritos
function handleClickFavourites(event){
  const selected = event.currentTarget;
  selected.classList.add('fav_clicked');
  
  const selectedId = parseInt(event.currentTarget.id);
  const animeSelected = animeList.find((anime) => anime.id === selectedId);
  const favouriteAnimeSelected = favouriteAnimeList.findIndex((fav) => fav.mal_id === selectedId);

  if (favouriteAnimeSelected === -1) {
    favouriteAnimeList.push(animeSelected);
  } else {;
    favouriteAnimeList.splice(animeSelected, 1);
  }

  localStorage.setItem('data', JSON.stringify(favouriteAnimeList));
  renderFavourites();
  listenerFavourites();
}

// Función escuchadora (metemos el addEventListener en una función porque necesitamos recorrer el array)
function listenerFavourites() {
  const animeItems = document.querySelectorAll('.js_anime_item');
  for (const oneItem of animeItems) {
    oneItem.addEventListener('click', handleClickFavourites);
  }
}

// Función para pintar la lista de resultados
function renderAnimes(){
  ulAnimes.innerHTML = '';
  let html = '';
  for (const eachAnime of animeList){
    if (eachAnime.images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {html += `<li class="js_anime_item item" id="${eachAnime.mal_id}"><img class="item-image" src=${eachAnime.images.jpg.image_url}><h3 class="item-title">${eachAnime.title}</h3></li>`;
    } else {
      html += `<li class="js_anime_item item" id="${eachAnime.mal_id}"><img class="item-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h3 class="item-title">${eachAnime.title}</h3></li>`;
    }}
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
      animeList = data.data;
      renderAnimes();
    });
}

function handleReset(event){
  event.preventDefault;
  animeList = [];
  renderAnimes();
}

function handleResetAllFav(event) {
  event.preventDefault;
  favouriteAnimeList = [];
  let html = '';
  ulFavouriteAnimes.innerHTML = html;
  localStorage.removeItem('data');
}


// Eventos

searchButton.addEventListener('click', handleSearch);
resetButton.addEventListener('click', handleReset);
resetAllFav.addEventListener('click', handleResetAllFav);

// Acciones al cargar la página

function onLoad() {
  const dataLocalStorage = JSON.parse(localStorage.getItem('data'));
  if (dataLocalStorage) {
    favouriteAnimeList = dataLocalStorage;
    renderFavourites();
  }
}
onLoad();