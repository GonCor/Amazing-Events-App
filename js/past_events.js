const eventsCards = document.querySelector('#pastEvents');
const cardsContainer = document.querySelector('#pastEvents');
const searchForm = document.querySelector('.search-form');
const checkboxes = document.querySelectorAll('.category-checkbox input[type="checkbox"]');
const dateInput = document.querySelector('#date-input');

let allEvents = [];
let selectedCategories = [];

//Creamos la Promesa con el fetch
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(dataApi => {
    allEvents = dataApi.events;
    // Filtrar eventos pasados
    const currentDate = new Date();
    const pastEvents = allEvents.filter(event => new Date(event.date) < currentDate);
    cardsContainer.innerHTML = createCardsContainer(pastEvents);
  })
  .catch(error => console.error(error));

//funcion filtrar tarjetas
searchForm.querySelector('input').addEventListener('input', () => {
  const searchValue = searchForm.querySelector('input').value.trim().toLowerCase();
  console.log(searchValue)
  
  updateCards(selectedCategories, searchValue);
}); 

// Escuchar el evento "submit" del formulario
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe
    
  // Obtener el valor del campo de búsqueda
  const searchValue = searchForm.querySelector('input').value.trim().toLowerCase();
  console.log(searchValue); // Mostrar el valor del campo de búsqueda en la consola
  
  // Obtener la lista de categorías seleccionadas
  selectedCategories = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value); // Actualizar el valor de la variable seleccionada
    
  // Actualizar las cartas mostradas en función de los valores de búsqueda y categoría
  updateCards(selectedCategories, searchValue);
});

// Escucho el checkbox
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

// Función que actualiza el contenido de la sección de eventos
function updateCards(selectedCategories, searchValue = '') {
  // Filtrar eventos pasados
  const currentDate = new Date();
  let pastEvents = allEvents.filter(event => new Date(event.date) < currentDate);
  
  let filteredEvents = [];
  
  // Filtrar por categorías seleccionadas y búsqueda
  if (selectedCategories.length > 0) {
    filteredEvents = pastEvents.filter((event) => {
      return selectedCategories.some((category) => {
        if (typeof category === 'string') {
          return category.trim().toLowerCase() === event.category.trim().toLowerCase();
        }
        return false;
      }) && (event.name.toLowerCase().includes(searchValue) || event.description.toLowerCase().includes(searchValue));
    });
  } else {
    filteredEvents = pastEvents.filter((event) => {
      return event.name.toLowerCase().includes(searchValue) || event.description.toLowerCase().includes(searchValue);
    });
  }
      
  // Obtener el elemento de las tarjetas y el elemento del mensaje
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

// Escucha el evento click del botón
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-details')) { 
    const eventId = event.target.getAttribute('data-target'); // Obtiene el ID del evento del atributo "data-target"
    const url = `details.html?#${eventId}`; // Construye la URL para redirigir al usuario a details.html con el ID del evento como parámetro
    window.location.href = url; // Redirige al usuario a la página details.html con el ID del evento como parámetro
  }
});
