<?php
header('Access-Control-Allow-Origin: http://localhost:8081');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/categoria.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $model = new Categoria;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
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
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setCategoria($_POST['categoria'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif ($model->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría creada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if (!$model->setId($_POST['id'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif ($result['dataset'] = $model->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'update':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setId($_POST['id'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif (!$model->setCategoria($_POST['categoria'])) {
                    $result['exception'] = 'Nombre de categoría incorrecta';
                } elseif ($model->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría modificada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                $_POST = json_decode(file_get_contents("php://input"), true);
                if ($model->setId($_POST['id'])) {
                    if ($model->deleteRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Categoría eliminada correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible';
                break;
        }
        // Se indica el tipo de contenido a retornar en la respuesta y se imprime como JSON.
        header('content-type: application/json; charset=utf-8');
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
