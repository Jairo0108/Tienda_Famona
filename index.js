let productos = [
    {
      id: 1,
      name: "jamon",
      precio: 9.99,
      descripcion: "El mejor jamon del condado.",
      imagen: "image/jamon.jpg",
    },
    {
      id: 2,
      name: "pollo",
      precio: 2.99,
      descripcion: "El mas fresco. ",
      imagen: "image/pollo.jpg",
    },
    {
      id: 3,
      name: "tocineta",
      precio: 3.99,
      descripcion: "Para tus antojos del dia a dia. ",
      imagen: "image/tocineta.jpg",
    },
  ];
  let rolUsuario = "Cliente";
  let usuarioAutenticado = false;
  
  document.addEventListener("DOMContentLoaded", () => {
    const contProductos = document.getElementById("productos");
    const agregarProductosForm = document.getElementById("agregar_producto_form");
  
    window.login = function () {
      const usuario = prompt("Ingrese el rol de usuario (Cliente o Admin):");
      if (
        usuario &&
        (usuario.toLowerCase() === "cliente" || usuario.toLowerCase() === "admin")
      ) {
        rolUsuario = usuario.toLowerCase();
        usuarioAutenticado = true;
        initPage();
      } else {
        alert("Rol de usuario no válido. Ingrese Cliente o Admin.");
      }
    };
  
    function initPage() {
      mostrarProductos();
      if (usuarioAutenticado && rolUsuario === "admin") {
        agregarProductosForm.style.display = "block";
      } else {
        agregarProductosForm.style.display = "none";
      }
    }
    initPage();
  
    //mostrar productos
    function mostrarProductos() {
      contProductos.innerHTML = "";
      productos.forEach((producto) => {
        const tarjetaProducto = document.createElement("div");
        tarjetaProducto.classList.add("tarjeta-producto");
        tarjetaProducto.innerHTML = `
              <img src="${producto.imagen}" alt="Imagen del producto">
              <h3>${producto.name}</h3>
              <p>${producto.precio}</p>
              <p>${producto.descripcion}</p>
              ${
                usuarioAutenticado === true
                  ? `<button onclick='editProducto(${producto.id})'>Editar</button>
              <button onclick='eliminarProducto(${producto.id})'>Eliminar</button>`
                  : ""
              }
              `;
        contProductos.appendChild(tarjetaProducto);
      });
    }
    //mostras en pantall al cargar el documento
    mostrarProductos();
  
    function agregarProducto() {
      const nombre_producto = document.getElementById('nombre-producto').value;
      const precio_producto = document.getElementById('precio-producto').value;
      const descripcion_producto = document.getElementById('descripcion-producto').value;
      const imagen_url_input = document.getElementById('imagen-url');
      const imagen_file_input = document.getElementById('imagen-file');
  
      if (nombre_producto && !isNaN(precio_producto) && descripcion_producto) {
          let imagen_producto;
  
          if (imagen_url_input.value.trim() !== '') {
              imagen_producto = imagen_url_input.value;
          } else if (imagen_file_input.files.length > 0) {
              const imagen_producto_file = imagen_file_input.files[0];
              imagen_producto = URL.createObjectURL(imagen_producto_file);
          } else {
              alert('Por favor, seleccione una URL o un archivo de imagen.');
              return;
          }
  
          const nuevoProducto = {
              id: productos.length + 1,
              name: nombre_producto,
              precio: precio_producto,
              descripcion: descripcion_producto,
              imagen: imagen_producto
          }
  
          productos.push(nuevoProducto);
          mostrarProductos();
          clearForm();
      } else {
          alert('Por favor, complete todos los campos y seleccione una URL o un archivo de imagen.');
      }
  }
  
    window.editProducto = function (productoId) {
      const productoEditado = prompt(
        "Editar nombre, precio, descripcion del producto. (Separados por coma )",
        productos.find((p) => p.id === productoId).name +
          ", " +
          productos.find((p) => p.id === productoId).precio +
          ", " +
          productos.find((p) => p.id === productoId).descripcion
      );
  
      if (productoEditado) {
        const [nombreEditado, precioEditado, descripcionEditado] = productoEditado
          .split(",")
          .map((item) => item.trim());
        if (nombreEditado && !isNaN(precioEditado) && descripcionEditado != "") {
          productos = productos.map((producto) => {
            if (producto.id === productoId) {
              return {
                ...producto,
                name: nombreEditado,
                precio: parseFloat(precioEditado),
                descripcion: descripcionEditado,
              };
            }
            return producto;
          });
          mostrarProductos();
        } else {
          alert("Ingrese los datos solicitados. ");
        }
      }
    };
  
    window.eliminarProducto = function (productoId) {
      const confirmarEliminacion = confirm("Seguro desea eliminar este producto");
      if (confirmarEliminacion) {
        productos = productos.filter((producto) => producto.id !== productoId);
        mostrarProductos();
      }
    };
  
    function clearForm() {
      if (
        agregarProductosForm &&
        typeof agregarProductosForm.reset === "function"
      ) {
        agregarProductosForm.reset();
      } else {
        console.error("No se pudo resetear el formulario.");
      }
    }
  
    agregarProductosForm.addEventListener("submit", function (event) {
      event.preventDefault();
      agregarProducto();
    });
  });