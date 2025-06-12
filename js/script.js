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
      li.innerHTML = `<strong>${tipo}</strong> – <a href="${url}" target="_blank" class="archivo-enlace">${archivo.name}</a> <br>Sprint: ${sprint}, Equipo: ${equipo}<br><em>${comentarios}</em>`;
      lista.appendChild(li);

      this.reset();
    });