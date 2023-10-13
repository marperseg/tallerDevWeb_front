function reloadScroll() {
  location.reload();
}

// Link banner superior
descargar_cv.addEventListener('click', (e) => {
  //Prevenir comportamiento por defecto del evento
  e.preventDefault();

  //Llamado a función que solicita el archivo
  getCV();
});

// Botón home
descargar_cv_btn.addEventListener('click', (e) => {
  //Prevenir comportamiento por defecto del evento
  e.preventDefault();

  //Llamado a función que solicita el archivo
  getCV();
});

function getCV() {
  fetch('http://localhost:8468/getCV', {
    method: 'GET',
  })
    .then((res) => {
      // Se recibió una respuesta exitosa con el archivo.
      if (res.status == 200) return res.blob();
      // Se recibió una respuesta con un error en formato json.
      if (res.status == 404) return res.json();
    })
    .then((res_2) => {
      // Se recibió un mensaje de error en la respuesta con código 404 y se procesó como json.
      if (res_2.err && res_2.err.status == 404) throw new Error(res_2.mensaje);

      // Se recibió correctamente el archivo PDF y se procesó como blob.
      let url = URL.createObjectURL(res_2);
      let w = window.open(url);
    })
    .catch((err) => {
      window.alert(err);
    });
}
