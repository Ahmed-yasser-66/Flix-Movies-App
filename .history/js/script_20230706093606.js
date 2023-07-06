const global = {
  currentPage: window.location.pathname,
};

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
      console.log('This is Home');
      break;
  }
}

init();
