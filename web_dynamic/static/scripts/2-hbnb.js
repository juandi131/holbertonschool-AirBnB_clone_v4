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
