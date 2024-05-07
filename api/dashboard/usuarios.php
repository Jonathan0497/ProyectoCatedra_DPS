<?php
//header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: http://localhost:8081');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');

require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/usuarios.php');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $model = new Usuarios;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_usuario'])) {
        $result['session'] = 1;
        // Se definen los casos posibles para las acciones de la API.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['alias_usuario'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['alias_usuario'];
                } else {
                    $result['exception'] = 'Alias de usuario indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $usuario->readProfile()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Usuario inexistente';
                }
                break;
            case 'editProfile':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$model->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$model->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$model->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono incorrecto';
                } elseif (!$model->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI incorrecto';
                } elseif ($model->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'changePassword':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $usuario->validateForm($_POST);
                if (!$usuario->setId($_SESSION['id_usuario'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$usuario->checkPassword($_POST['actual'])) {
                    $result['exception'] = 'Clave actual incorrecta';
                } elseif ($_POST['nueva'] != $_POST['confirmar']) {
                    $result['exception'] = 'Claves nuevas diferentes';
                } elseif (!$usuario->setClave($_POST['nueva'])) {
                    $result['exception'] = $usuario->getPasswordError();
                } elseif ($usuario->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $model->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay usuarios registrados';
                }
                break;
            case 'create':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$model->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$model->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$model->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono incorrecto';
                } elseif (!$model->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI incorrecto';
                } elseif (!$model->setAlias($_POST['alias'])) {
                    $result['exception'] = 'Alias incorrecto';
                } elseif (!$model->setClave($_POST['clave'])) {
                    $result['exception'] = $model->getPasswordError();
                } elseif ($model->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario creado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'readOne':
                if ($model->setId($_POST['id'])) {
                    if ($result['dataset'] = $model->readOne()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Usuario inexistente';
                    }
                } else {
                    $result['exception'] = 'Usuario incorrecto';
                }
                break;
            case 'update':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setId($_POST['id'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$model->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$model->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$model->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$model->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono incorrecto';
                } elseif (!$model->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI incorrecto';
                } elseif (!$model->setAlias($_POST['alias'])) {
                    $result['exception'] = 'Alias incorrecto';
                } elseif (!$model->setEstado($_POST['estado'])) {
                    $result['exception'] = 'estado incorrecto';
                } elseif ($model->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario modificado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                $_POST = json_decode(file_get_contents("php://input"), true);
                if ($_POST['id'] == $_SESSION['id_usuario']) {
                    $result['exception'] = 'No se puede eliminar a sí mismo';
                } elseif (!$usuario->setId($_POST['id'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$usuario->readOne()) {
                    $result['exception'] = 'Usuario inexistente';
                } elseif ($usuario->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario eliminado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        switch ($_GET['action']) {
            case 'readUsers':
                if ($model->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existe al menos un usuario registrado';
                } else {
                    $result['exception'] = 'No existen usuarios registrados';
                }
                break;
            case 'logIn':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->checkUser($_POST['alias'])) {
                    $result['exception'] = 'Alias incorrecto';
                } elseif ($model->checkPassword($_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                    $_SESSION['id_usuario'] = $model->getId();
                    $_SESSION['alias_usuario'] = $model->getAlias();
                } else {
                    $result['exception'] = 'Clave incorrecta';
                }
                break;
            case 'register':
                $_POST = json_decode(file_get_contents("php://input"), true);
                $_POST = $model->validateForm($_POST);
                if (!$model->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$model->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido incorrecto';
                } elseif (!$model->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$model->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Teléfono incorrecto';
                } elseif (!$model->setDui($_POST['dui'])) {
                    $result['exception'] = 'DUI incorrecto';
                } elseif (!$model->setAlias($_POST['alias'])) {
                    $result['exception'] = 'Alias incorrecto';
                } elseif (!$model->setClave($_POST['clave'])) {
                    $result['exception'] = $model->getPasswordError();
                } elseif ($model->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Usuario creado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible sin sesión';
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
