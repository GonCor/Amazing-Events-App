/* Traer del DOM los datos que necesito  */

const pastCard = document.querySelector('#upcomingEvents');

/* Aplico la funcion */

let futureCard = createPastEventCards(data.events, data.currentDate);

/* Mostrar las Tarjetas utilizo la const*/

pastCard.innerHTML = futureCard;

function createPastEventCards(array, currentDate) {
  const futureEvents = [];
  const currentDateM= new Date(currentDate);

  for (let i = 0; i < array.length; i++) {
    const eventDate = new Date(array[i].date);
    if (eventDate > currentDateM) {
      futureEvents.push(array[i]);
    }
  }

  let cards = '';
  let count = 0; // contador para saber cuántas tarjetas se han generado
    
  for (const event of futureEvents) {
    if (count % 3 === 0) { // si el contador es divisible por 3, crear una nueva fila
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
    if (count % 3 === 0) { // si el contador es divisible por 3, cerrar la fila
      cards += '</div>';
    }
  }
  if (count % 3 !== 0) { // si el número total de tarjetas no es divisible por 3, cerrar la última fila
    cards += '</div>';
  }

  return cards;
}

  
 