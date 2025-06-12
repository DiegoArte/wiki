document.getElementById('uploadForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const equipo = document.getElementById('equipo').value;
      const sprint = document.getElementById('sprint').value;
      const tipo = document.getElementById('tipo').value;
      const archivo = document.getElementById('archivo').files[0];
      const comentarios = document.getElementById('comentarios').value;

      const lista = document.getElementById('listaArchivos');
      const li = document.createElement('li');
      li.classList.add('archivo-item');
      const url = URL.createObjectURL(archivo);
      li.innerHTML = `<div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                        <strong>${tipo}</strong> – <a href="${url}" target="_blank" class="archivo-enlace">${archivo.name}</a>
                        <br>Equipo: ${equipo}
                        <br>Sprint: ${sprint} 
                        <br><em>${comentarios}</em>
                      </div>`;
      lista.appendChild(li);

      this.reset();
    });