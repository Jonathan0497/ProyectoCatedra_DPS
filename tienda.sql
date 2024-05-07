-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 05-05-2024 a las 06:16:59
-- Versión del servidor: 8.2.0
-- Versión de PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE IF NOT EXISTS `calificacion` (
  `id_calificacion` int NOT NULL AUTO_INCREMENT,
  `valoracion` int NOT NULL,
  `comentario` varchar(150) DEFAULT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_calificacion`),
  KEY `id_producto` (`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

DROP TABLE IF EXISTS `categoria_producto`;
CREATE TABLE IF NOT EXISTS `categoria_producto` (
  `id_categoria_producto` int NOT NULL AUTO_INCREMENT,
  `categoria_producto` varchar(150) NOT NULL,
  PRIMARY KEY (`id_categoria_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(150) NOT NULL,
  `apellido_cliente` varchar(150) NOT NULL,
  `clave_cliente` varchar(150) NOT NULL,
  `correo_cliente` varchar(150) NOT NULL,
  `id_estado_cliente` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `correo_cliente` (`correo_cliente`),
  KEY `id_estado_cliente` (`id_estado_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre_cliente`, `apellido_cliente`, `clave_cliente`, `correo_cliente`, `id_estado_cliente`) VALUES
(1, 'Jonathan', 'Mendoza', '$2y$10$nZxGsJVEdQiwmzREqKdiROa3ky5RcybN02II4F1HtEiE85YhCFlvS', 'jm@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `id_detalle_pedido` int NOT NULL,
  `precio_unitario` decimal(5,2) DEFAULT NULL,
  `cantidad` int NOT NULL,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  PRIMARY KEY (`id_detalle_pedido`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_producto` (`id_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_cliente`
--

DROP TABLE IF EXISTS `estado_cliente`;
CREATE TABLE IF NOT EXISTS `estado_cliente` (
  `id_estado_cliente` int NOT NULL AUTO_INCREMENT,
  `estado_cliente` varchar(150) NOT NULL,
  PRIMARY KEY (`id_estado_cliente`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estado_cliente`
--

INSERT INTO `estado_cliente` (`id_estado_cliente`, `estado_cliente`) VALUES
(1, 'activo'),
(2, 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
CREATE TABLE IF NOT EXISTS `estado_pedido` (
  `id_estado_pedido` int NOT NULL AUTO_INCREMENT,
  `estado_pedido` varchar(150) NOT NULL,
  PRIMARY KEY (`id_estado_pedido`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estado_pedido`
--

INSERT INTO `estado_pedido` (`id_estado_pedido`, `estado_pedido`) VALUES
(1, 'Pendiente'),
(3, 'Entregado'),
(4, 'Cancelado'),
(2, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_producto`
--

DROP TABLE IF EXISTS `estado_producto`;
CREATE TABLE IF NOT EXISTS `estado_producto` (
  `id_estado_producto` int NOT NULL AUTO_INCREMENT,
  `estado_producto` varchar(150) NOT NULL,
  PRIMARY KEY (`id_estado_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_usuario`
--

DROP TABLE IF EXISTS `estado_usuario`;
CREATE TABLE IF NOT EXISTS `estado_usuario` (
  `id_estado_usuario` int NOT NULL AUTO_INCREMENT,
  `estado_usuario` varchar(150) NOT NULL,
  PRIMARY KEY (`id_estado_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estado_usuario`
--

INSERT INTO `estado_usuario` (`id_estado_usuario`, `estado_usuario`) VALUES
(1, 'activo'),
(2, 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `subtotal` decimal(6,2) DEFAULT NULL,
  `cantidad_productos` int DEFAULT NULL,
  `total_pago` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `id_pedido` (`id_pedido`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
CREATE TABLE IF NOT EXISTS `marca` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(100) NOT NULL,
  `imagen_marca` blob,
  PRIMARY KEY (`id_marca`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_marca`, `nombre_marca`, `imagen_marca`) VALUES
(1, 'Sony', NULL),
(2, 'Microsoft', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int NOT NULL,
  `fecha_venta` date DEFAULT NULL,
  `total_venta` decimal(6,2) DEFAULT NULL,
  `id_cliente` int NOT NULL,
  `id_estado_pedido` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_pedido`),
  KEY `id_estado_pedido` (`id_estado_pedido`),
  KEY `id_cliente` (`id_cliente`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(150) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio_producto` decimal(5,2) NOT NULL,
  `cantidad_disponible` int NOT NULL,
  `imagen_producto` blob NOT NULL,
  `id_categoria_producto` int NOT NULL,
  `id_marca` int NOT NULL,
  `id_estado_producto` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria_producto` (`id_categoria_producto`),
  KEY `id_marca` (`id_marca`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado_producto` (`id_estado_producto`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(150) NOT NULL,
  `apellido_usuario` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alias_usuario` varchar(150) NOT NULL,
  `clave_usuario` varchar(150) NOT NULL,
  `dui` varchar(10) NOT NULL,
  `correo_usuario` varchar(150) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `id_estado_usuario` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `dui` (`dui`),
  UNIQUE KEY `correo_usuario` (`correo_usuario`),
  UNIQUE KEY `telefono` (`telefono`),
  KEY `id_estado_usuario` (`id_estado_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `alias_usuario`, `clave_usuario`, `dui`, `correo_usuario`, `telefono`, `id_estado_usuario`) VALUES
(1, 'Jonathan', 'Mendoza', 'JonaMendo', '$2y$10$V2dfsywLi/5Fw9T.UJRrWuF5TEu80zCO4GrRZ31z71RoTaRIjDnu.', '06305938-5', 'jm@gmail.com', '7202-2904', 1),
(2, 'Carlos', 'Villalobos', 'Carlos', '$2y$10$ABrOPoqOQNNgn8w3w50izeNn5jodsXD1CRI1iXtRSFS.jtINIAn86', '06305938-6', 'cv@gmail.com', '7777-7777', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
