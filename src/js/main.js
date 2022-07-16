'use strict';

// Variables globales

const textInput = document.querySelector('.js_text_input');
const searchButton = document.querySelector('.js_search_btn');
const resetButton = document.querySelector('.js_reset_btn');
const ulAnimes = document.querySelector('.js_ul_list');
let animeList = [];
let favouriteAnimeList = [];

// Funciones

function renderFavourites() {
    
}

function handleClickFavourites(event){
    console.log(event.currentTarget.id);
    const selectedItem = event.currentTarget.id;
    favouriteAnimeList.push(selectedItem);
    console.log(favouriteAnimeList);
    renderFavourites();
}

function listenerFavourites() {
  const animeItems = document.querySelectorAll('.js_anime_item');
  for (const oneItem of animeItems) {
    oneItem.addEventListener('click', handleClickFavourites);
  }
}

function renderAnimes(){
  let html = '';
  for (const eachAnime of animeList) {
    if (eachAnime.images.jpg.image_url !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {html += `<li class="js_anime_item" id="${eachAnime.mal_id}"><img src=${eachAnime.images.jpg.image_url}><h3>${eachAnime.title}</h3></li>`;
    } else {
      html += `<li class="js_anime_item" id="${eachAnime.mal_id}"><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h3>${eachAnime.title}</h3></li>`;
    }
    ulAnimes.innerHTML = html;
  }
  listenerFavourites();
}

function handleClick(event) {
  event.preventDefault();
  const textInputValue = textInput.value;
  fetch (`https://api.jikan.moe/v4/anime?q=${textInputValue}`)
    .then ((response) => response.json())
    .then ((data) => {
      animeList = data.data;
      renderAnimes();
    })
}

// Eventos

searchButton.addEventListener('click', handleClick);

// Acciones al cargar la página
