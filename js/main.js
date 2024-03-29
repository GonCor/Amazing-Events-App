  const eventsCards = document.querySelector('#newCards');
  const search = document.querySelector('.form-control');
  let allEvents = [];
  let selectedCategories = []; // Declarar la variable en el ámbito global y asignarle un valor vacío

  //Creamos la Promesa con el fetch
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataApi => {
      allEvents = dataApi.events;
      eventsCards.innerHTML = createCardsContainer(allEvents);
    })
    .catch(error => console.error(error));      

  // Obtener el formulario de búsqueda
  const searchForm = document.querySelector('.search-form');

  //funcion filtrar tarjetas
  search.addEventListener('input', () => {
    const searchValue = search.value.trim().toLowerCase();
    console.log(searchValue)
    
    updateCards(selectedCategories, searchValue);
  }); 

  // Escuchar el evento "submit" del formulario
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
      
    // Obtener el valor del campo de búsqueda
    const searchValue = searchForm.querySelector('input').value;
    console.log(searchValue); // Mostrar el valor del campo de búsqueda en la consola
    
    // Obtener la lista de categorías seleccionadas
    const checkboxes = Array.from(document.querySelectorAll('.category-checkbox input[type="checkbox"]'));
    selectedCategories = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value); // Actualizar el valor de la variable seleccionada
      
    // Actualizar las cartas mostradas en función de los valores de búsqueda y categoría
    updateCards(selectedCategories, searchValue);
  });

  // Escucho el checkbox
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      selectedCategories = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value); // Actualizar el valor de la variable seleccionada
      console.log(selectedCategories);
      if (selectedCategories.length > 0) {
        updateCards(selectedCategories);
      } else {
        eventsCards.innerHTML = createCardsContainer(allEvents);
      }
    });
  });

//agregar un evento al botón, puedes usar el método addEventListener() y escuchar el evento de clic
var originalMarginTop = main.style.marginTop;

button.addEventListener('click', function() {
  if (main.style.marginTop !== originalMarginTop) {
    main.style.marginTop = originalMarginTop;
  } else {
    main.style.marginTop = '500px';
  }
});


  // Función que actualiza el contenido de la sección de eventos
  function updateCards(selectedCategories, searchValue = '') {
    let filteredEvents = [];
    if (selectedCategories.length > 0) {
      filteredEvents = allEvents.filter((event) => {
        return selectedCategories.some((category) => {
          if (typeof category === 'string') {
            return category.trim().toLowerCase() === event.category.trim().toLowerCase();
          }
          return false;
        }) && (event.name.toLowerCase().includes(searchValue.toLowerCase()) || event.description.toLowerCase().includes(searchValue.toLowerCase()));
      });
    } else {
      filteredEvents = allEvents.filter((event) => {
        return event.name.toLowerCase().includes(searchValue.toLowerCase()) || event.description.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
        
    // Obtener el elemento de las tarjetas y el elemento del mensaje
    const cardsContainer = document.querySelector('#newCards');
    const messageContainer = document.querySelector('#noResultsMessage');

    // Si el resultado filtrado es un arreglo vacío, mostrar el mensaje y ocultar las tarjetas
    if (filteredEvents.length === 0) {
      cardsContainer.style.display = 'none';
      messageContainer.style.display = 'block';
    } else { // De lo contrario, mostrar las tarjetas y ocultar el mensaje
      messageContainer.style.display = 'none';
      cardsContainer.style.display = 'block';
      cardsContainer.innerHTML = createCardsContainer(filteredEvents);
    }
  }

  function createCardsContainer(array) {
    let cards = '';
    let count = 0;
    for (const event of array) {
      if (count % 3 === 0) {
        cards += '<div class="row">';
      }
      cards += `
        <div class="col-md-4">
          <div class="card">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.category}</p>
              <p class="card-text">$${event.price}</p>
              <button data-target="${event._id}" class="btn btn-primary btn-details">See More</button>
            
              </div>
          </div>
        </div>
      `;
      
      count++;
      if (count % 3 === 0) {// si el contador es divisible por 3, cerrar la fila
        cards += '</div>';
      }
    }
    if (count % 3 !== 0) {
      cards += '</div>';
    }

    return cards;
  }

