<?php
/*
*	Clase para manejar la tabla categorias de la base de datos.
*   Es clase hija de Validator.
*/
class Categoria extends Validator
{
    // Declaración de atributos (propiedades).
    private $id_categoria_producto = null;
    private $categoria_producto = null;

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */

    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_categoria_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_categoria_producto;
    }

    public function setCategoria($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->categoria_producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCategoria()
    {
        return $this->categoria_producto;
    }

    public function createRow()
    {
        $sql = 'INSERT INTO categoria_producto(categoria_producto) VALUES(?)';
        $params = array($this->categoria_producto);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, categoria_producto FROM categoria_producto';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria_producto, categoria_producto FROM categoria_producto WHERE id_categoria_producto = ?';
        $params = array($this->id_categoria_producto);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE categoria_producto SET categoria_producto = ? WHERE id_categoria_producto = ?';
        $params = array($this->categoria_producto, $this->id_categoria_producto);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM categoria_producto WHERE id_categoria_producto = ?';
        $params = array($this->id_categoria_producto);
        return Database::executeRow($sql, $params);
    }
}