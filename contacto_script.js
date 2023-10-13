form.addEventListener('submit', (e) => {
  // Prevenir acción por defecto del evento 'submit'
  e.preventDefault();

  // Extracción de valores desde el evento del formulario
  const body = {
    nombre: e.target[0].value,
    email: e.target[1].value,
    asunto: e.target[2].value,
    mensaje: e.target[3].value,
  };

  // Llamado a función que envía los datos
  submitForm(body);
});

function submitForm(body) {
  // console.log(body);
  fetch('http://localhost:8468/postMensaje', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(() => {
      darAlerta(0);
    })
    .then((res) => {
      darAlerta(res);
    });
}

function darAlerta(res) {
  let alerta = document.getElementById('alerta');
  let texto = document.getElementById('texto');

  texto.innerHTML = res.mensaje;

  if (!res) {
    alerta.style.background = 'rgb(160, 160, 160)';
    texto.innerHTML = 'Algo salió mal, intente nuevamente...';
  } else {
    if (res.code === 201) {
      alerta.style.background = 'rgb(142, 234, 142)';
    } else if (res.code === 500) {
      alerta.style.background = 'rgb(233, 127, 127)';
    } else {
      alerta.style.background = 'rgb(160, 160, 160)';
      texto.innerHTML = 'Algo salió mal, intente nuevamente...';
    }
  }

  alerta.style.visibility = 'visible';
}

function ocultar() {
  let alerta = document.getElementById('alerta');
  alerta.style.visibility = 'hidden';
}
