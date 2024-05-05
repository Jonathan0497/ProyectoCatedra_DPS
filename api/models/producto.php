<?php

class Producto extends Validator
{
    // Declaración de atributos (propiedades).
    private $id_producto = null;
    private $nombre_producto = null;
    private $descripcion = null;
    private $precio_producto = null;
    private $cantidad_disponible = null;
    private $id_categoria_producto = null;
    private $id_marca = null;
    private $id_estado_producto = null;
    private $id_usuario = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_producto;
    }

    public function setNombre($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->nombre_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombre()
    {
        return $this->nombre_producto;
    }

    public function setDescripcion($value)
    {
        if ($this->validateAlphanumeric($value, 1, 200)) {
            $this->descripcion = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function setPrecio($value)
    {
        if ($this->validateMoney($value)) {
            $this->precio_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getPrecio()
    {
        return $this->precio_producto;
    }

    public function setCantidad($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->cantidad_disponible = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCantidad()
    {
        return $this->cantidad_disponible;
    }

    public function setCategoria($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_categoria_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCategoria()
    {
        return $this->id_categoria_producto;
    }

    public function setMarca($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_marca = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getMarca()
    {
        return $this->id_marca;
    }

    public function setEstado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_estado_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getEstado()
    {
        return $this->id_estado_producto;
    }

    public function setUsuario($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_usuario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getUsuario()
    {
        return $this->id_usuario;
    }

    /*
    *   Métodos para operar con la tabla producto.
    */

    public function createRow()
    {
        $sql = 'INSERT INTO producto(nombre_producto, descripcion_producto, precio_producto, cantidad_disponible, id_categoria_producto, id_marca, id_estado_producto, id_usuario) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre_producto, $this->descripcion, $this->precio_producto, $this->cantidad_disponible, $this->id_categoria_producto, $this->id_marca, $this->id_estado_producto, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_disponible, id_categoria_producto, id_marca, id_estado_producto, id_usuario 
                FROM producto';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_disponible, id_categoria_producto, id_marca, id_estado_producto, id_usuario 
                FROM producto 
                WHERE id_producto = ?';
        $params = array($this->id_producto);
        return Database::getRow($sql, $params);
    }

    public function readProductoMarca()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_disponible, id_categoria_producto, id_marca, id_estado_producto, id_usuario 
        FROM producto WHERE id_marca = ?';
        $params = array($this->id_marca);
        return Database::getRow($sql, $params);
    }

    public function readProductoCategoria()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_disponible, id_categoria_producto, id_marca, id_estado_producto, id_usuario 
        FROM producto WHERE id_categoria_producto = ?';
        $params = array($this->id_categoria_producto);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE producto 
                SET nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, cantidad_disponible = ?, id_categoria_producto = ?, id_marca = ?, id_estado_producto = ?, id_usuario = ? 
                WHERE id_producto = ?';
        $params = array($this->nombre_producto, $this->descripcion, $this->precio_producto, $this->cantidad_disponible, $this->id_categoria_producto, $this->id_marca, $this->id_estado_producto, $this->id_usuario, $this->id_producto);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM producto 
                WHERE id_producto = ?';
        $params = array($this->id_producto);
        return Database::executeRow($sql, $params);
    }
}
?>