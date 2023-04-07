//Escuchar el evento addEventListener() y escuchar el evento de clic para desplegar la lista
var originalMarginTop = main.style.marginTop;

button.addEventListener('click', function() {
  if (main.style.marginTop !== originalMarginTop) {
    main.style.marginTop = originalMarginTop;
  } else {
    main.style.marginTop = '300px';
  }
});