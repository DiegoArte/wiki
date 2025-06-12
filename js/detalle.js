document.addEventListener('DOMContentLoaded', function() {
  const registrosContainer = document.getElementById('registrosContainer');

  // Realiza una solicitud para obtener todos los registros desde el backend
  fetch('/api/registros')
    .then(response => response.json()) // Convierte la respuesta en formato JSON
    .then(registros => {

      registros.forEach(registro => {
        // Crea un nuevo div para cada registro
        const registroDiv = document.createElement('div');
        registroDiv.classList.add('registro');
        registroDiv.style.display = 'flex';
        registroDiv.style.marginBottom = '20px';

        // Crea un div para mostrar los datos del registro
        const datosDiv = document.createElement('div');
        datosDiv.classList.add('datos');
        datosDiv.style.flex = '1';
        datosDiv.innerHTML = `
          <h2>Información del Artefacto</h2>
          <ul>
            <li><strong>Equipo:</strong> ${registro.equipo}</li>
            <li><strong>Sprint:</strong> ${registro.sprint}</li>
            <li><strong>Tipo de Artefacto:</strong> ${registro.tipo}</li>
            <li><strong>Comentarios:</strong> ${registro.comentarios}</li>
          </ul>
        `;

        // Crea un div para mostrar la vista previa del documento
        const vistaPreviaDiv = document.createElement('div');
        vistaPreviaDiv.classList.add('vistaPrevia');
        vistaPreviaDiv.style.flex = '1';
        vistaPreviaDiv.style.paddingLeft = '20px';
        vistaPreviaDiv.innerHTML = `
          <h2>Vista Previa del Documento</h2>
          <div class="vistaPreviaDocumento" style="border: 1px solid #ccc; padding: 10px;">
            <iframe src="${registro.archivoPath}" style="width: 100%; height: 200px;"></iframe>
          </div>
          <a href="${registro.archivoPath}" class="descargarDocumento" download="${registro.archivoName}" style="display: block; margin-top: 10px;">Descargar Documento</a>
        `;

        registroDiv.appendChild(datosDiv);
        registroDiv.appendChild(vistaPreviaDiv);

        registrosContainer.appendChild(registroDiv);
      });
    })
    .catch(error => {
      console.error('Error al cargar los registros:', error);
    });
});
