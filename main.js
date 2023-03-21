const eventsCard= document.querySelector('#newCards');
let newCard= createCard(data.events);

eventsCard.innerHTML = newCard;

function createCard(array) {
    let cards = '';
    let count = 0; // contador tarjetas 
    for (const event of array) {
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
  

/* function createCard(array) {
    let cards ='';
    for (const event of array) {
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
    }
    return cards;
}

 */

