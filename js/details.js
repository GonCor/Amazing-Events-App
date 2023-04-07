const detailCard= document.querySelector('#details');
detailCard.innerHTML = detailsCard(data.events);

function detailsCard(array) {
    let cards = '';
    
    for (const event of array) {
      
      cards += `
        <div class="row" id="${event._id}">
              <div class="col-md-6 my-5">
                <img src="${event.image}" class="card-img-details" alt="${event.name}">
              </div>
              <div class="col-md-6 my-5">
                <div class="card-body">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">
                    <strong>Date:</strong>${event.date}<br>
                    <strong>Description:</strong>${event.description}<br>
                    <strong>Category:</strong> ${event.category}<br>
                    <strong>Place:</strong> ${event.place}<br>
                    <strong>Capacity:</strong> ${event.capacity}<br>
                    <strong>Assistance or Estimate:</strong> ${event.assistance != null ? event.assistance : event.estimate}<br>
                    <strong>Price:</strong> $${event.price}
                  </p>
                </div>
              </div>
            </div>
            `
    };
    return cards;
  }