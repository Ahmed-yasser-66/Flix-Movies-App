const global = {
  currentPage: window.location.pathname,
};

console.log(global.currentPage);

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
      console.log('This is Home');
      break;
    case '/search.html':
      console.log('This is search page');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
