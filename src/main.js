import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchData } from './js/pixabay-api.js';
import { createGalleryMarkup } from './js/render-functions.js';

const form = document.querySelector('#form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-btn');
let page;
let perPage = 15;
let userInput = '';
let lightbox;

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  animation: 250,
  widthRatio: 0.9,
  scaleImageToRatio: true,
};

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSubmit);
  loadMoreBtn.addEventListener('click', loadMoreImages);
});

async function handleSubmit(event) {
  event.preventDefault();

  userInput = document.getElementById('search').value.trim();

  if (!userInput || userInput === ' ') {
    return throwError('The search field should not be empty');
  }

  page = 1;
  loader.classList.remove('hidden');
  loadMoreBtn.classList.remove('hidden');
  gallery.innerHTML = '';

  try {
    const data = await fetchData(userInput, page, perPage);
    handleData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loader.classList.add('hidden');
  }
}

async function loadMoreImages() {
  page++;
  loader.classList.remove('hidden');

  try {
    const data = await fetchData(userInput, page, perPage);
    handleData(data);
    smoothScroll();
    if (page * perPage >= data.totalHits) {
      showEndMessage();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loader.classList.add('hidden');
  }
}

function showEndMessage() {
  loadMoreBtn.classList.add('hidden');
  throwError("We're sorry, but you've reached the end of search results.");
}

function smoothScroll() {
  const galleryItemHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
}

function throwError(message) {
  iziToast.error({
    title: '',
    backgroundColor: '#EF4040',
    message: message,
    position: 'topRight',
  });
}

function handleData(data) {
  if (data.hits.length === 0) {
    loadMoreBtn.classList.add('hidden');
    throwError('Sorry, there are no images matching your search query. Please try again!');
  } else {
    const markup = createGalleryMarkup(data);
    gallery.insertAdjacentHTML('beforeend', markup);
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', options);
    } else {
      lightbox.refresh();
    }
  }
}
