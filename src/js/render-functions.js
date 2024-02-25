
export function createGalleryMarkup(data) {
    return data.hits
      .map(data => {
        return `<li class="gallery-item"><a href="${data.webformatURL}">
            <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
            <div class='comments'>
            <p><b>Likes: </b>${data.likes}</p>
            <p><b>Views: </b>${data.views}</p>
            <p><b>Comments: </b>${data.comments}</p>
            <p><b>Downloads: </b>${data.downloads}</p>
            </div>
            </li>`;
      })
      .join('');
  }