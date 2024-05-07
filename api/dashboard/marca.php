<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/marca.php');

// Manejar la solicitud OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $model = new Marca;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
     
    // Se definen los casos posibles para las acciones de la API.
    switch ($_GET['action']) {
        case 'readAll':
            if ($result['dataset'] = $model->readAll()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'No hay datos registrados';
            }
            break;
        case 'create':
            // Asumiendo que los datos se envían como JSON desde React Native
            $_POST = json_decode(file_get_contents("php://input"), true);
            $_POST = $model->validateForm($_POST);
            if (!$model->setNombre($_POST['nombre'])) {
                $result['exception'] = 'Nombre incorrecto';
            } elseif ($model->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Marca creada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'readOne':
            if (!$model->setId($_POST['id'])) {
                $result['exception'] = 'Marca incorrecta';
            } elseif ($result['dataset'] = $model->readOne()) {
                $result['status'] = 1;
            } elseif (Database::getException()) {
                $result['exception'] = Database::getException();
            } else {
                $result['exception'] = 'Marca inexistente';
            }
            break;
        case 'update':
            // Asumiendo que los datos se envían como JSON desde React Native
            $_POST = json_decode(file_get_contents("php://input"), true);
            $_POST = $model->validateForm($_POST);
            if (!$model->setId($_POST['id'])) {
                $result['exception'] = 'Marca incorrecta';
            } elseif (!$model->setNombre($_POST['nombre'])) {
                $result['exception'] = 'Nombre incorrecto';
            } elseif ($model->updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Marca modificada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        case 'delete':
            $_POST = json_decode(file_get_contents("php://input"), true); 
            if (!$model->setId($_POST['id'])) {
                $result['exception'] = 'Identificador de marca incorrecto';
            } elseif (!$data = $model->readOne()) {
                $result['exception'] = 'Marca inexistente';
            } elseif ($model->deleteRow()) {
                $result['status'] = 1;
                $result['message'] = 'Marca eliminada correctamente';
            } else {
                $result['exception'] = Database::getException();
            }
            break;
        
        default:
            $result['exception'] = 'Acción no disponible dentro de la sesión';
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
?>
