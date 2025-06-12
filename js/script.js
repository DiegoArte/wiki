document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Crea un objeto para enviar los datos del formulario 
  const formData = new FormData();
  formData.append('equipo', document.getElementById('equipo').value);
  formData.append('sprint', document.getElementById('sprint').value);
  formData.append('tipo', document.getElementById('tipo').value);
  formData.append('archivo', document.getElementById('archivo').files[0]);
  formData.append('comentarios', document.getElementById('comentarios').value);

  console.log('Datos del formulario:', {
    equipo: formData.get('equipo'),
    sprint: formData.get('sprint'),
    tipo: formData.get('tipo'),
    archivo: formData.get('archivo').name,
    comentarios: formData.get('comentarios')
  });

  
  // Envía los datos al servidor 
  fetch('api.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {

    console.log('Registro guardado:', data);
    alert('Registro guardado exitosamente.');

    this.reset();

    window.location.href = 'detalle.html';
  })
  .catch(error => {
    console.error('Error al guardar el registro:', error);
  });
});
