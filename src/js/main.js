'use strict';

// Variables globales

const textInput = document.querySelector('.js_text_input');
const searchButton = document.querySelector('.js_search_btn');
const resetButton = document.querySelector('.js_reset_btn');
const ulAnimes = document.querySelector('.js_ul_list');
const ulFavouriteAnimes = document.querySelector('.js_favourites_list');
const resetAllFav = document.querySelector('.js_reset_allfav');
let animeList = [];
let favouriteAnimeList = [];


// Funciones

function renderFavourites() {
  let html = '';
  for (const eachfav of favouriteAnimeList) {
    if (eachfav.images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {html += `<li class="js_anime_item" id="${eachfav.mal_id}"><img src=${eachfav.images.jpg.image_url}><h3>${eachfav.title}</h3></li>`;
    } else {
      html += `<li class="js_anime_item" id="${eachfav.mal_id}"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h3>${eachfav.title}</h3></li>`;
    }
    ulFavouriteAnimes.innerHTML = html;
  }
}


function handleClickFavourites(event){

  const selectedId = parseInt(event.currentTarget.id);
  const animeSelected = animeList.find((anime) => anime.mal_id === selectedId);
  const favouriteAnimeSelected = favouriteAnimeList.findIndex((fav) => fav.mal_id === selectedId);

  if (favouriteAnimeSelected === -1) {
    favouriteAnimeList.push(animeSelected);
  } else {favouriteAnimeList.splice(favouriteAnimeSelected, 1);
  }
  localStorage.setItem('data', JSON.stringify(favouriteAnimeList));
  renderFavourites();
  renderAnimes();
  listenerFavourites();
}

function listenerFavourites() {
  const animeItems = document.querySelectorAll('.js_anime_item');
  for (const oneItem of animeItems) {
    oneItem.addEventListener('click', handleClickFavourites);
  }
}

function renderAnimes(){
  let html = '';
  // let favouriteClass = '';
  // for (const eachFavAnime of favouriteAnimeList) {

  //   const selectedIndex = favouriteAnimeList.findIndex((fav) => eachFavAnime.id === fav.id);

  //   if (selectedIndex === -1){
  //     favouriteClass = '';
  //   } else {
  //     favouriteClass = 'favourite_clicked';
  //   }}

  for (const eachAnime of animeList) {
    if (eachAnime.images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {html += `<li class="js_anime_item" id="${eachAnime.mal_id}"><img src=${eachAnime.images.jpg.image_url}><h3>${eachAnime.title}</h3></li>`;
    } else {
      html += `<li class="js_anime_item" id="${eachAnime.mal_id}"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h3>${eachAnime.title}</h3></li>`;
    }
    ulAnimes.innerHTML = html;
  }
  listenerFavourites();
}

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