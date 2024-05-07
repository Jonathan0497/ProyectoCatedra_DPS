<?php
/*
*	Clase para manejar las tablas pedidos y detalle_pedido de la base de datos.
*   Es clase hija de Validator.
*/
class Pedidos extends Validator
{

    // Variables para la tabla pedidos.
    private $id_pedido = null;
    private $fecha_venta = null;
    private $total = null;
    private $id_cliente = null;
    private $id_estado_pedido = null;

    // Variables para la tabla detalle_pedido.
    private $id_detalle_pedido = null;
    private $producto = null;
    private $cantidad = null;

    public function setId($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->id_pedido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id_pedido;
    }

    public function setFechaVenta($value)
    {
        if($this->validateDate($value)) {
            $this->fecha_venta = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getFechaVenta()
    {
        return $this->fecha_venta;
    }

    public function setTotal($value)
    {
        if($this->validateMoney($value)) {
            $this->total = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getTotal()
    {
        return $this->total;
    }

    public function setIdCliente($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getIdCliente()
    {
        return $this->id_cliente;
    }

    public function setIdEstadoPedido($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->id_estado_pedido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getIdEstadoPedido()
    {
        return $this->id_estado_pedido;
    }

    public function setIdDetalle($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->id_detalle_pedido = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getIdDetalle()
    {
        return $this->id_detalle_pedido;
    }

    public function setProducto($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getProducto()
    {
        return $this->producto;
    }

    public function setCantidad($value)
    {
        if($this->validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCantidad()
    {
        return $this->cantidad;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    // Método para verificar si existe un pedido en proceso para seguir comprando, de lo contrario se crea uno.

    public function startOrder()
    {
        $this->id_estado_pedido = 1;

        $sql = 'SELECT id_pedido
                FROM pedido
                WHERE id_estado_pedido = ? AND id_cliente = ?';
        $params = array($this->id_estado_pedido, $_SESSION['id_cliente']);
        if ($data = Database::getRow($sql, $params)) {
            $this->id_pedido = $data['id_pedido'];
            return true;
        } else {
            $sql = 'INSERT INTO pedido(id_estado_pedido, id_cliente)
                    VALUES(?, ?)';
            $params = array($this->id_estado_pedido, $_SESSION['id_cliente']);
            // Se obtiene el ultimo valor insertado en la llave primaria de la tabla pedidos.
            if ($this->id_pedido = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO detalle_pedido(id_producto, precio_unitario, cantidad, id_pedido)
                VALUES(?, (SELECT precio_producto FROM producto WHERE id_producto = ?), ?, ?)';
        $params = array($this->producto, $this->producto, $this->cantidad, $this->id_pedido);
        return Database::executeRow($sql, $params);
    }

    public function readOrderDetails()
    {
        $sql = 'SELECT id_detalle_pedido, nombre_producto, precio_unitario, cantidad
                FROM detalle_pedido
                INNER JOIN producto USING(id_producto)
                WHERE id_pedido = ?';
        $params = array($this->id_pedido);
        return Database::getRows($sql, $params);
    }

    public function updateDetail()
    {
        $sql = 'UPDATE detalle_pedido
                SET cantidad = ?
                WHERE id_detalle_pedido = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle_pedido,  $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedido
                WHERE id_detalle_pedido = ? AND id_pedido = ?';
        $params = array($this->id_detalle_pedido,  $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }

    public function finishOrder()
    {
        $this->id_estado_pedido = 2;
        date_default_timezone_set('America/El_Salvador');
        $date = date('Y-m-d');
        $sql = 'UPDATE pedido
                SET id_estado_pedido = ?, fecha_venta = ?
                WHERE id_pedido = ?';
        $params = array($this->id_estado_pedido, $date, $_SESSION['id_pedido']);
        return Database::executeRow($sql, $params);
    }
}