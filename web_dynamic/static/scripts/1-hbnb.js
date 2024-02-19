document.addEventListener('DOMContentLoaded', function () {
  // Variable para almacenar los IDs de las amenidades seleccionadas
  const amenities = {};

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
