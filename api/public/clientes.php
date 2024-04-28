<?php
require_once('../helpers/database.php');
require_once('../helpers/validator.php');
require_once('../models/clientes.php');

if (isset($_GET['action'])) {
    session_start();

    $cliente = new Clientes;
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'exception' => null, 'username' => null);

    if (isset($_SESSION['id_cliente'])) {
        $result['session'] = 1;
        switch ($_GET['action']) {
            case 'logout':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'getClient':
                if (isset($_SESSION['correo_cliente'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correo_cliente'];
                } else {
                    $result['exception'] = 'Correo de usuario indefinido';
                }
                break;
        }
    } else {
        switch ($_GET['action']) {
            case 'login':
                $_POST = $cliente->validateForm($_POST);
                if (!$cliente->checkCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif ($cliente->checkPassword($_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                    $_SESSION['id_cliente'] = $cliente->getId();
                    $_SESSION['correo_cliente'] = $cliente->getCorreo();
                } else {
                    $result['exception'] = 'Clave incorrecta';
                }
                break;
            case 'register':
                $_POST = $cliente->validateForm($_POST);
                if ($cliente->setNombre($_POST['nombre'])) {
                    if ($cliente->setApellido($_POST['apellido'])) {
                        if ($cliente->setCorreo($_POST['correo'])) {
                            if ($cliente->setClave($_POST['clave'])) {
                                if ($cliente->createRow()) {
                                    $result['status'] = 1;
                                    $result['message'] = 'Cliente registrado correctamente';
                                } else {
                                    $result['exception'] = 'Ocurrió un problema al crear el cliente';
                                }
                            } else {
                                $result['exception'] = 'Clave incorrecta';
                            }
                        } else {
                            $result['exception'] = 'Correo incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Apellido incorrecto';
                    }
                } else {
                    $result['exception'] = 'Nombre incorrecto';
                }
                break;
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
