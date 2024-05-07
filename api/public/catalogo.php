<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/marca.php');
require_once('../models/categoria.php');
require_once('../models/productos.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia las clases correspondientes
    $categoria = new Categoria;
    $producto = new Producto;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);

    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
        case 'readAllCategoria':
            if ($result['dataset'] = $categoria->readAll()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existen categorías para mostrar';
            }
            break;
        case 'readAllMarca':
            if ($result['dataset'] = $marca->readAll()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existen marcas para mostrar';
            }
            break;
        case 'readProductosCategoria':
            if (!$producto->setId($_POST['id_categoria'])) {
                $result['exception'] = 'Categoría incorrecta';
            } elseif ($result['dataset'] = $producto->readProductoCategoria()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existen productos para mostrar';
            }
            break;
        case 'readProductosMarca':
            if (!$producto->setId($_POST['id_marca'])) {
                $result['exception'] = 'Categoría incorrecta';
            } elseif ($result['dataset'] = $producto->readProductoMarca()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No existen productos para mostrar';
            }
            break;
        default:
            $result['exception'] = 'Acción no disponible';
            break;
    }
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
