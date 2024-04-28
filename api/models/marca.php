<?php

class Marca extends Validator
{
    private $id = null;
    private $nombre = null;
    private $image = null;
    private $ruta = '../images/marcas/';

    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->image = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function getImagen()
    {
        return $this->image;
    }

    public function getRuta()
    {
        return $this->ruta;
    }

    public function createRow()
    {
        $sql = 'INSERT INTO marca(nombre_marca, imagen_marca) VALUES(?, ?)';
        $params = array($this->nombre, $this->image);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca FROM marca ORDER BY nombre_marca';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca FROM marca WHERE id_marca = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->image) ? $this->deleteFile($this->getRuta(), $current_image) : $this->image = $current_image;

        $sql = 'UPDATE marca SET nombre_marca = ?, imagen_marca = ? WHERE id_marca = ?';
        $params = array($this->nombre, $this->image, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM marca WHERE id_marca = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>