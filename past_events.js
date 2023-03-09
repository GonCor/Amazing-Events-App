const eventsCards = document.querySelector('#pastEvents');
 // Variab le global con todos los eventos
 const allEvents = data.events; 
 //Obtener la fecha actual y la fecha límite para filtrar los eventos antiguos
 const currentDate = new Date(data.currentDate);

 const pastEvents = allEvents.filter(event => new Date(event.date) < currentDate);

 
 const cardsContainer = document.querySelector('#pastEvents');
 
 cardsContainer.innerHTML = createCardsContainer(pastEvents);



// Obtener el formulario de búsqueda
const searchForm = document.querySelector('.search-form');


// Escuchar el evento "submit" del formulario
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe
  
  // Obtener el valor del campo de búsqueda
  const searchValue = searchForm.querySelector('input').value;
  console.log(searchValue); // Mostrar el valor del campo de búsqueda en la consola
 
  // Obtener la lista de categorías seleccionadas
  const checkboxes = Array.from(document.querySelectorAll('.category-checkbox input[type="checkbox"]'));
  const selectedCategories = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  
  // Actualizar las cartas mostradas en función de los valores de búsqueda y categoría
  updateCards(selectedCategories, searchValue);
});


// Función que actualiza el contenido de la sección de eventos
function updateCards(selectedCategories, searchValue = '') {
  const filteredEvents = allEvents.filter((event) => {
    return selectedCategories.some((category) => {
      if (typeof category === 'string') {
        return category.trim().toLowerCase() === event.category.trim().toLowerCase();
      }
      return false;
    }) && (event.name.toLowerCase().includes(searchValue.toLowerCase()) || event.description.toLowerCase().includes(searchValue.toLowerCase()));
  });

  // Obtener el elemento de las tarjetas y el elemento del mensaje
  const cardsContainer = document.querySelector('#pastEvents');
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
  
  // Escucho el checkbox
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selectedCategories = Array.from(checkboxes).filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    console.log(selectedCategories);
    if (selectedCategories.length > 0) {
      updateCards(selectedCategories);
    } else {
      eventsCards.innerHTML = createCardsContainer(allEvents);
    }
  });
});
  

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
            <a href="details.html" class="btn btn-primary">See More</a>
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

