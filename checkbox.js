/* Traigo los datos del DOM */
const eventsCard= document.querySelector('#categories');

/* Aplico la funcion */
const categorias = categoriesCheckbox(data.events); // Obtener las categorías
const checkboxesHtml = generarCheckboxes(categorias); // Generar los checkboxes

eventsCard.innerHTML = checkboxesHtml; // Agregar los checkboxes al HTML

function categoriesCheckbox(array) {
    let categories = [];
  
    // Recorrer todas las cartas en el archivo data.js
    for (let i = 0; i < array.length; i++) {
      // Obtener la categoría de la carta actual
      let category = array[i].category;
  
      // Si la categoría actual no está en el array de categorías, agregarla
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
  
    // Devolver el array de categorías
    return categories;
  };

  function generarCheckboxes(categorias) {
    let checkboxesHtml = "";
    for (let i = 0; i < categorias.length; i++) {
      const categoria = categorias[i];
      const checkboxHtml = `
      
      <div class="col-md-3 col-sm-3">
        <div class="category-checkbox">
          <input class="form-check-input" type="checkbox" id="checkbox${i+1}" value="${categoria}">
          <label class="form-check-label" for="inlineCheckbox${i+1}">${categoria}</label>
        </div>
      </div>
      `;
      checkboxesHtml += checkboxHtml;
    }
    return `
    <div class="row">
      ${checkboxesHtml}
    </div>
  `;
  }
  
