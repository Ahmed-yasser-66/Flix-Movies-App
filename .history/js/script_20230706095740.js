const global = {
  currentPage: window.location.pathname,
};

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
      console.log('This is Home');
      highLightActiveLink();
      break;

    case '/shows.html':
      console.log('This is shows page');
      highLightActiveLink();
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
