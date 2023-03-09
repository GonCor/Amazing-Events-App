function filterByCategory() {
  const selectedCategory = categoryFilter.value;
  let filteredEvents = data.events;
  if (selectedCategory !== 'all') {
    filteredEvents = data.events.filter(event => event.category === selectedCategory);
  }
  const newCard = createCard(filteredEvents);
  eventsCards.innerHTML = newCard;
}



const categoriasSeleccionadas = [];

const checkboxes = document.querySelectorAll('.category-checkbox');
for (const checkbox of checkboxes) {
  if (checkbox.checked) {
    categoriasSeleccionadas.push(checkbox.value);
  }
}

