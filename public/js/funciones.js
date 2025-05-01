
document.addEventListener("DOMContentLoaded", () => {
    const enlacesEliminar = document.querySelectorAll(".delete");
    const enlacesEditar = document.querySelectorAll(".edit");
    const botonesActualizar = document.querySelectorAll(".actualizar");

    // Confirmación para eliminar
    enlacesEliminar.forEach((enlace) => {
      enlace.addEventListener("click", (event) => {
        event.preventDefault();
  
        Swal.fire({
          title: "Producto",
          text: "¿Está seguro de eliminar?",
          icon: "question",
          footer: "TIENDA ED - productos",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#2980b9",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#c0392b",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = event.target.getAttribute("href");
          }
        });
      });
    });
  
    // Confirmación para editar
    enlacesEditar.forEach((enlace) => {
      enlace.addEventListener("click", (event) => {
        event.preventDefault();
  
        Swal.fire({
          title: "Producto",
          text: "¿Desea editar este producto?",
          icon: "info",
          footer: "TIENDA ED - productos",
          confirmButtonText: "Sí, editar",
          confirmButtonColor: "#27ae60",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#c0392b",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = event.target.getAttribute("href");
          }
        });
      });
    });

    //actualizar
    botonesActualizar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
          event.preventDefault();
    
          Swal.fire({
            title: "Confirmar actualización",
            text: "¿Está seguro de actualizar este producto?",
            icon: "warning",
            confirmButtonText: "Sí, actualizar",
            confirmButtonColor: "#27ae60",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#c0392b",
          }).then((result) => {
            if (result.isConfirmed) {
              boton.closest("form").submit(); // Envía el formulario manualmente
            }
          });
        });
      });

  });


document.addEventListener("DOMContentLoaded", function() {
  const toggleButton = document.getElementById('toggle-darkmode');
  const body = document.body;

  // Cargar preferencia si existe
  const savedTheme = localStorage.getItem('bs-theme');
  if (savedTheme) {
    body.setAttribute('data-bs-theme', savedTheme);
    toggleButton.textContent = savedTheme === 'dark' ? '☀️ Modo claro' : '🌙 Modo nocturno';
  }

  // Mostrar contenido después de aplicar el tema
  body.style.visibility = 'visible';

  toggleButton.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('bs-theme', newTheme);
    toggleButton.textContent = newTheme === 'dark' ? '☀️ Modo claro' : '🌙 Modo nocturno';
  });
});
