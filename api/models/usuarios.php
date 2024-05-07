<?php
class Usuarios extends Validator
{
    // Declaración de atributos (propiedades).
    private $id_usuario = null;
    private $nombre_usuario = null;
    private $apellido_usuario = null;
    private $alias_usuario = null;
    private $correo_usuario = null;
    private $clave_usuario = null;
    private $dui = null;
    private $telefono = null;
    private $estado_usuario = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_usuario;
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 75)) {
            $this->nombre_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombre()
    {
        return $this->nombre_usuario;
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 1, 75)) {
            $this->apellido_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getApellido()
    {
        return $this->apellido_usuario;
    }

    public function setAlias($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->alias_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getAlias()
    {
        return $this->alias_usuario;
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCorreo()
    {
        return $this->correo_usuario;
    }

    public function setClave($value)
    {
        if ($this->validatePassword($value)) {
            $this->clave_usuario = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function getClave()
    {
        return $this->clave_usuario;
    }

    public function setTelefono($value)
    {
        if ($this->validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function setEstado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->estado_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getEstado()
    {
        return $this->estado_usuario;
    }

    public function setDui($value)
    {
        if ($this->validateDui($value)) {
            $this->dui = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getDui()
    {
        return $this->dui;
    }

    /*
    *   Métodos para gestionar la cuenta del usuario.
    */

    public function checkUser($alias)
    {
        $sql = 'SELECT id_usuario FROM usuario WHERE alias_usuario = ?';
        $params = array($alias);
        if ($data = database::getRow($sql, $params)) {
            $this->id_usuario = $data['id_usuario'];
            $this->alias_usuario = $alias;
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_usuario FROM usuario WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_usuario'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE usuario SET clave_usuario = ? WHERE id_usuario = ?';
        $params = array($this->clave_usuario, $_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, correo_usuario, alias_usuario
                FROM usuario
                WHERE id_usuario = ?';
        $params = array($_SESSION['id_usuario']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE usuarios
                SET nombre_usuario = ?, apellido_usuario = ?, correo_usuario = ?, telefono = ?, dui = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre_usuario, $this->apellido_usuario, $this->correo_usuario, $this->telefono, $this->dui, $_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    public function createRow()
    {
        //nombre apellido correo telefono dui alias clave
        $sql = 'INSERT INTO usuario(nombre_usuario, apellido_usuario, alias_usuario, correo_usuario, clave_usuario, telefono, dui)
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre_usuario, $this->apellido_usuario, $this->alias_usuario, $this->correo_usuario, $this->clave_usuario, $this->telefono, $this->dui);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, alias_usuario, correo_usuario, telefono, dui, id_estado_usuario
                FROM usuario
                ORDER BY nombre_usuario';
        $params = null;
        return Database::getRows($sql, $params);
    }


    public function readOne()
    {
        $sql = 'SELECT id_usuario, nombre_usuario, apellido_usuario, alias_usuario, correo_usuario, telefono, dui, id_estado_usuario
                FROM usuario
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE usuario
                SET nombre_usuario = ?, apellido_usuario = ?, alias_usuario = ?, correo_usuario = ?, telefono = ?, dui = ?, id_estado_usuario = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre_usuario, $this->apellido_usuario, $this->alias_usuario, $this->correo_usuario, $this->telefono, $this->dui, $this->estado_usuario, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM usuario
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::executeRow($sql, $params);
    }
}