const eventsCards = document.querySelector('#newCards');
const allEvents = data.events; // Variable global con todos los eventos

// Crea la sección de eventos con todos los elementos
eventsCards.innerHTML = createCardsContainer(allEvents);



// Función que actualiza el contenido de la sección de eventos
function updateCards(selectedCategories) {
  const filteredEvents = allEvents.filter((event) => {
    return selectedCategories.some((category) => {
      if (typeof category === 'string') {
        return category.trim().toLowerCase() === event.category.trim().toLowerCase();
      }
      return false;
    });
  });
  console.log(filteredEvents); // Verifica los eventos filtrados
  eventsCards.innerHTML = createCardsContainer(filteredEvents);
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
  

/* // Llama a la función updateCards al cargar la página con todas las categorías seleccionadas
document.addEventListener('DOMContentLoaded', function() {
  updateCards(allEvents);
}); */


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

