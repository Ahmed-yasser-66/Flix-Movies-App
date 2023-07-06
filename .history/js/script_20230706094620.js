const global = {
  currentPage: window.location.pathname,
};

console.log(global.currentPage);

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('This is Home');
      break;

    case '/shows.html':
      console.log('This is shows page');
      break;

    case '/movie-details.html':
      console.log('This is movie-details page');
      break;

    case '/tv-details.html':
      console.log('This is tv-details page');
      break;

    case '/search.html':
      console.log('This is search page');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
