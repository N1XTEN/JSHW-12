import axios from 'axios';
const API_KEY = 'YOUR_PIXABAY_API_KEY';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;  

export async function fetchData(userInput, page, perPage) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=42026920-e619b387ca2127f1aff40b8e2&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}