const eventsCard= document.querySelector('#cardsConteiner');
let newCard= createCard(data.events)

eventsCard.innerHTML = newCard;

function createCard(arrayData) {
    let cards ='';
    for (const event of arrayData) {
        cards += `
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                 <div class="card">
                    <img src="${event.image}" class="card-img-top" alt="${event.name}">
                    <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.category}</p>
                    <p class="card-text">$${event.price}</p>
                </div>
            </div>
        </div>    
    </div>        
  `;
    }
    return cards;
}
