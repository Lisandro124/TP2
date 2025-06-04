const inputTarea = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');
const filtro = document.getElementById('filtro');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

btnAgregar.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') agregarTarea();
});

filtro.addEventListener('change', mostrarTareas);

inputTarea.addEventListener('input', () => {
  if (inputTarea.classList.contains('error')) {
    inputTarea.classList.remove('error');
  }
});

function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (texto === '') {
    inputTarea.classList.add('error');
    return;
  }

  tareas.push({ texto, completada: false });
  guardarTareas();
  mostrarTareas();
  inputTarea.value = '';
}

function mostrarTareas() {
  listaTareas.innerHTML = '';
  const filtroValor = filtro.value;

  tareas.forEach((tarea, index) => {
    if (
      (filtroValor === 'completadas' && !tarea.completada) ||
      (filtroValor === 'pendientes' && tarea.completada)
    ) {
      return;
    }

    const li = document.createElement('li');
    li.classList.add('fade-in');
    if (tarea.completada) li.classList.add('completada');

    const span = document.createElement('span');
    span.textContent = tarea.texto;

    span.addEventListener('click', () => {
      tareas[index].completada = !tareas[index].completada;
      guardarTareas();
      mostrarTareas();
    });

  const btnEditar = document.createElement('button');
btnEditar.textContent = 'Editar';
btnEditar.classList.add('btn-editar');
btnEditar.addEventListener('click', () => {
  const nuevoTexto = prompt('Editar tarea:', tarea.texto);

  if (nuevoTexto === null) return; // El usuario canceló

  const textoLimpio = nuevoTexto.trim();

  if (textoLimpio === '') {
    alert('El texto de la tarea no puede estar vacío.');
    return;
  }

  tareas[index].texto = textoLimpio;
  guardarTareas();
  mostrarTareas();
});

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      tareas.splice(index, 1);
      guardarTareas();
      mostrarTareas();
    });

    li.appendChild(span);
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
  });
}


function guardarTareas() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

mostrarTareas();

