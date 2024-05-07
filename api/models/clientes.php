<?php

class Clientes extends validator
{
    private $id_cliente = null;
    private $nombre_cliente = null;
    private $apellido_cliente = null;
    private $correo_cliente = null;
    private $clave_cliente = null;
    private $id_estado_cliente = null;

    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_cliente;
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombre()
    {
        return $this->nombre_cliente;
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellido_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getApellido()
    {
        return $this->apellido_cliente;
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCorreo()
    {
        return $this->correo_cliente;
    }

    public function setClave($value)
    {
        if ($this->validatePassword($value)) {
            $this->clave_cliente = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function getClave()
    {
        return $this->clave_cliente;
    }

    public function setEstado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_estado_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getEstado()
    {
        return $this->id_estado_cliente;
    }

    public function checkCorreo($correo)
    {
        $sql = 'SELECT id_cliente FROM cliente WHERE correo_cliente = ?';
        $params = array($correo);
        if ($data = Database::getRow($sql, $params)) {
            $this->id_cliente = $data['id_cliente'];
            $this->id_estado_cliente = $data['estado_cliente'];
            $this->correo_cliente = $correo;
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($clave)
    {
        $sql = 'SELECT clave_cliente FROM cliente WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        $data = Database::getRow($sql, $params);
        if (password_verify($clave, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword($clave)
    {
        $sql = 'UPDATE cliente SET clave_cliente = ? WHERE id_cliente = ?';
        $params = array($this->clave_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function changeState()
    {
        $sql = 'UPDATE cliente SET id_estado_cliente = ? WHERE id_cliente = ?';
        $params = array(2, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ? WHERE id_cliente = ?';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->correo_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO cliente(nombre_cliente, apellido_cliente, correo_cliente, clave_cliente) VALUES(?, ?, ?, ?)';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->correo_cliente, $this->clave_cliente);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, id_estado_cliente FROM cliente';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, id_estado_cliente FROM cliente WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE cliente SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, id_estado_cliente = ? WHERE id_cliente = ?';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->correo_cliente, $this->id_estado_cliente, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM cliente WHERE id_cliente = ?';
        $params = array($this->id_cliente);
        return Database::executeRow($sql, $params);
    }
    
}