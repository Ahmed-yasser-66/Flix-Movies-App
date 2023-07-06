const global = {
  currentPage: window.location.pathname,
};

//Display 20 popular shows
async function dispalyPopularshows() {
  const { results } = await fetchAPIdata('show/popular');
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="show-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.release_date}</small>
            </p>
          </div>
        `;

    document.getElementById('popular-shows').appendChild(div);
  });
}

//Display 20 popular TV shows
async function dispalyPopularShows() {
  const { results } = await fetchAPIdata('tv/popular');
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
              ${
                show.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.title}"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.title}"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${show.title}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${show.release_date}</small>
              </p>
            </div>
          `;

    document.getElementById('popular-shows').appendChild(div);
  });
}

//Fetch Data From TMBD API
async function fetchAPIdata(endpoint) {
  const API_KEY = '96a65ecbd7d37df355ec6689666cae6f';
  const API_URL = 'https://api.theshowdb.org/3/';

  showSpinner();

  const respone = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await respone.json();

  hideSpinner();

  return data;
}

//Controling the spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight Active Link
function highLightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      dispalyPopularshows();
      break;

    case '/shows.html':
      dispalyPopularshows();
      break;

    case '/show-details.html':
      console.log('This is show-details page');
      break;

    case '/tv-details.html':
      console.log('This is tv-details page');
      break;

    case '/search.html':
      console.log('This is search page');
      break;
  }

  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
