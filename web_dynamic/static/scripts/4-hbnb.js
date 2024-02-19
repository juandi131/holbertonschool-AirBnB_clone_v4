document.addEventListener('DOMContentLoaded', function () {
  // Variable para almacenar los IDs de las amenidades seleccionadas
  const amenities = {};

  
  // Función para actualizar el estado de la API
  function updateApiStatus() {
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      if (data.status === "OK") {
          $('div#api_status').addClass('available');
      } else {
          $('div#api_status').removeClass('available');
      }
    });
  }

  updateApiStatus();

  function createArticle (place) {
    const article = `
            <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest}</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;
    return article;
  }
  

  $('#searchButton').click(function () {
      // Obtén la lista de IDs de amenidades seleccionadas
      const amenityIDs = Object.keys(amenities);

      // Realiza una solicitud POST a places_search con la lista de amenidades
      $.ajax({
          type: "POST",
          url: "http://localhost:5001/api/v1/places_search/",
          contentType: 'application/json',
          data: JSON.stringify({ amenities: amenityIDs }), // Envía los IDs de las amenidades seleccionadas
          success: function (data) {
              // Maneja la respuesta como lo desees, por ejemplo, mostrando los lugares en el HTML
              $(".places").empty(); // Limpia los resultados anteriores
              for (const place of data) {
                  const article = createArticle(place);
                  $(".places").append(article);
              }
              console.log("success");
          },
          error: function (error) {
              console.error("Error:", error);
          }
      });
  });

  // Escuchar cambios en los checkboxes
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id')
    
    if ($(this).is(':checked')) {
      // Si el checkbox está marcado, agregamos el ID a la lista
      if (!(amenityID in amenities)) {
        amenities[amenityID] = $(this).attr('data-name');
      }
    } else {
      // Si el checkbox no está marcado, lo eliminamos de la lista
      if (amenityID in amenities) {
        delete amenities[amenityID];
      }
    }

    // Actualizar el contenido del elemento h4
    $('div.amenities > h4').text(Object.values(amenities).join(', '));
  });
});
