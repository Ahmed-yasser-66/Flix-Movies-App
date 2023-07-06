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
  }
}

document.addEventListener('DOMContentLoaded', init);
