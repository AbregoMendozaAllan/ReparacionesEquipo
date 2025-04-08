-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               11.7.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for seminario
CREATE DATABASE IF NOT EXISTS `seminario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `seminario`;

-- Dumping structure for table seminario.bitacora_login
CREATE TABLE IF NOT EXISTS `bitacora_login` (
                                                `id` int(11) NOT NULL AUTO_INCREMENT,
                                                `username` varchar(50) NOT NULL,
                                                `time_stamp` timestamp NOT NULL,
                                                `ip_add` varchar(50) DEFAULT '',
                                                `status` enum('SUCCESS','FAILED') NOT NULL,
                                                `error` text DEFAULT NULL,
                                                `user_agent` text DEFAULT NULL,
                                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.bitacora_login: ~19 rows (approximately)
INSERT INTO `bitacora_login` (`id`, `username`, `time_stamp`, `ip_add`, `status`, `error`, `user_agent`) VALUES
                                                                                                             (1, 'admin', '2025-04-07 17:30:27', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (2, 'admin', '2025-04-07 17:34:47', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (4, '154', '2025-04-07 17:43:18', '::ffff:127.0.0.1', 'FAILED', 'Error occurred during login attempt for user: 154. Error message: Invalid username. IP Address: ::ffff:127.0.0.1. User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0. Timestamp: 2025-04-07T17:43:18.628Z', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (5, 'asd', '2025-04-07 17:45:50', '::ffff:127.0.0.1', 'FAILED', 'Error occurred during login attempt for user: asd. Error message: Invalid username. IP Address: ::ffff:127.0.0.1. User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0. Timestamp: 2025-04-07T17:45:50.906Z', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (6, 'admin', '2025-04-07 17:52:57', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (7, 'tecnico1', '2025-04-07 17:55:35', '::ffff:127.0.0.1', 'FAILED', 'Error occurred during login attempt for user: tecnico1. Error message: Invalid username. IP Address: ::ffff:127.0.0.1. User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0. Timestamp: 2025-04-07T17:55:35.925Z', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (8, 'tecnico1', '2025-04-07 17:55:41', '::ffff:127.0.0.1', 'FAILED', 'Error occurred during login attempt for user: tecnico1. Error message: Invalid username. IP Address: ::ffff:127.0.0.1. User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0. Timestamp: 2025-04-07T17:55:41.723Z', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (9, 'tecnico', '2025-04-07 17:55:56', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (10, 'admin', '2025-04-07 18:21:11', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (11, 'admin', '2025-04-07 18:24:04', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (12, 'tecnico', '2025-04-07 18:31:36', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (13, 'admin', '2025-04-08 01:58:24', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (14, 'tecnico', '2025-04-08 01:59:44', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (15, 'admin', '2025-04-08 02:14:42', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (16, 'solicitante1', '2025-04-08 02:38:50', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (17, 'tecnico', '2025-04-08 02:39:19', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (18, 'tecnico5', '2025-04-08 02:40:05', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (19, 'solicitante2', '2025-04-08 02:50:18', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0'),
                                                                                                             (20, 'admin', '2025-04-08 02:50:27', '::ffff:127.0.0.1', 'SUCCESS', 'Null', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0');

-- Dumping structure for table seminario.bitacora_reparaciones
CREATE TABLE IF NOT EXISTS `bitacora_reparaciones` (
                                                       `id_bitacora_reparacion` int(11) NOT NULL AUTO_INCREMENT,
                                                       `id_reparacion` int(11) NOT NULL,
                                                       `fecha` timestamp NULL DEFAULT current_timestamp(),
                                                       `accion` enum('En espera','En reparación','Reparado','Descartado') NOT NULL,
                                                       `usuario_responsable` int(11) NOT NULL,
                                                       PRIMARY KEY (`id_bitacora_reparacion`),
                                                       KEY `id_reparacion` (`id_reparacion`),
                                                       KEY `usuario_responsable` (`usuario_responsable`),
                                                       CONSTRAINT `bitacora_reparaciones_ibfk_1` FOREIGN KEY (`id_reparacion`) REFERENCES `reparaciones` (`id_reparacion`) ON DELETE CASCADE,
                                                       CONSTRAINT `bitacora_reparaciones_ibfk_2` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.bitacora_reparaciones: ~1 rows (approximately)
INSERT INTO `bitacora_reparaciones` (`id_bitacora_reparacion`, `id_reparacion`, `fecha`, `accion`, `usuario_responsable`) VALUES
    (1, 1, '2025-04-08 02:39:07', 'En espera', 9);

-- Dumping structure for table seminario.equipos
CREATE TABLE IF NOT EXISTS `equipos` (
                                         `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
                                         `tipo` enum('Laptop','PC','Monitor','Impresora','Otro') NOT NULL,
                                         `marca` varchar(50) DEFAULT NULL,
                                         `modelo` varchar(50) DEFAULT NULL,
                                         `serie` varchar(50) NOT NULL,
                                         `estado` enum('Disponible','Asignado','En reparación','Descartado') NOT NULL,
                                         `id_usuario_asignado` int(11) DEFAULT NULL,
                                         PRIMARY KEY (`id_equipo`),
                                         UNIQUE KEY `serie` (`serie`),
                                         KEY `FK_equipos_usuarios` (`id_usuario_asignado`),
                                         CONSTRAINT `FK_equipos_usuarios` FOREIGN KEY (`id_usuario_asignado`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.equipos: ~22 rows (approximately)
INSERT INTO `equipos` (`id_equipo`, `tipo`, `marca`, `modelo`, `serie`, `estado`, `id_usuario_asignado`) VALUES
                                                                                                             (2, 'Laptop', 'Dell', 'z785z', '1s34mdsop43', 'Asignado', 3),
                                                                                                             (3, 'Impresora', 'EPSON', 'asd34g', 'sdg31fki43f', 'Asignado', 4),
                                                                                                             (4, 'Laptop', 'Dell', 'Latitude 7400', 'ABC123456789', 'Asignado', 1),
                                                                                                             (5, 'PC', 'HP', 'EliteDesk 800 G6', 'DEF987654321', 'Disponible', NULL),
                                                                                                             (6, 'Monitor', 'Samsung', 'S24R350', 'GHI112233445', 'Disponible', NULL),
                                                                                                             (7, 'Impresora', 'Epson', 'EcoTank L3250', 'JKL556677889', 'Disponible', NULL),
                                                                                                             (8, 'Laptop', 'Lenovo', 'ThinkPad X1 Carbon', 'MNO998877665', 'Asignado', 2),
                                                                                                             (9, 'PC', 'Dell', 'OptiPlex 7080', 'PQR445566778', 'En reparación', NULL),
                                                                                                             (10, 'Monitor', 'LG', '27MK400H-B', 'STU889900112', 'Disponible', NULL),
                                                                                                             (11, 'Impresora', 'HP', 'LaserJet Pro M404dn', 'VWX223344556', 'Disponible', NULL),
                                                                                                             (12, 'Laptop', 'Apple', 'MacBook Air M1', 'YZA667788990', 'Asignado', 3),
                                                                                                             (13, 'PC', 'Custom Build', 'Gaming Rig', 'BCD001122334', 'Disponible', NULL),
                                                                                                             (14, 'Monitor', 'Dell', 'U2720Q', 'EFG445566778', 'Asignado', 1),
                                                                                                             (15, 'Impresora', 'Canon', 'PIXMA G3110', 'HIJ889900112', 'Disponible', NULL),
                                                                                                             (16, 'Laptop', 'HP', 'Spectre x360', 'KLM223344556', 'Disponible', NULL),
                                                                                                             (17, 'PC', 'Lenovo', 'IdeaCentre AIO', 'NOP667788990', 'Asignado', 2),
                                                                                                             (18, 'Monitor', 'Samsung', 'Odyssey G7', 'QRS001122334', 'Disponible', NULL),
                                                                                                             (19, 'Impresora', 'Epson', 'WorkForce WF-2860', 'TUV445566778', 'Disponible', NULL),
                                                                                                             (20, 'Laptop', 'Microsoft', 'Surface Laptop 4', 'WXY889900112', 'Asignado', 3),
                                                                                                             (21, 'PC', 'HP', 'Pavilion Gaming', 'ZAB223344556', 'Disponible', NULL),
                                                                                                             (22, 'Monitor', 'LG', 'UltraGear 27GN950', 'CDE667788990', 'Disponible', NULL),
                                                                                                             (23, 'Impresora', 'Brother', 'HL-L2350DW', 'FGH001122334', 'Disponible', NULL);

-- Dumping structure for table seminario.funciones
CREATE TABLE IF NOT EXISTS `funciones` (
                                           `id_funcion` int(11) NOT NULL AUTO_INCREMENT,
                                           `funcion` varchar(50) NOT NULL,
                                           PRIMARY KEY (`id_funcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.funciones: ~0 rows (approximately)

-- Dumping structure for table seminario.login
CREATE TABLE IF NOT EXISTS `login` (
                                       `id_login` int(11) NOT NULL AUTO_INCREMENT,
                                       `id_usuario` int(11) NOT NULL,
                                       `username` varchar(50) NOT NULL,
                                       `password_hash` varchar(255) NOT NULL,
                                       `ultimo_login` timestamp NULL DEFAULT NULL,
                                       `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
                                       PRIMARY KEY (`id_login`),
                                       UNIQUE KEY `username` (`username`),
                                       KEY `id_usuario` (`id_usuario`),
                                       CONSTRAINT `login_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.login: ~9 rows (approximately)
INSERT INTO `login` (`id_login`, `id_usuario`, `username`, `password_hash`, `ultimo_login`, `fecha_creacion`) VALUES
                                                                                                                  (1, 1, 'admin', '$2b$10$Os35OL0CaiIcyJ39GapHz.mVvwkdgBab112tbBBlujDmWo28QMzy6', '2025-04-08 02:50:27', '2025-04-07 17:24:30'),
                                                                                                                  (2, 2, 'tecnico', '$2b$10$g76qWi7X6/nkw0cnn5sJbehwvXzLg4IrC11X/VJmd0CDtjcAUGrMm', '2025-04-08 02:39:19', '2025-04-07 17:25:07'),
                                                                                                                  (3, 3, 'solicitante1', '$2b$10$9kiw8qbjNTW/vsmulIrJ2uYWAPyAjnBbekynjFXsNS028U3gJh3Uu', '2025-04-08 02:38:50', '2025-04-07 17:26:00'),
                                                                                                                  (4, 4, 'solicitante2', '$2b$10$CdVAiF1h7is5bRkeFEDTLODAGY2bG0pjAGHCICmrVCYWWCJo.qpY.', '2025-04-08 02:50:18', '2025-04-07 17:27:10'),
                                                                                                                  (5, 5, 'solicitante3', '$2b$10$S7T50Dg.Qrz9J27iBH7nTOpCdn9ibXyyogupHTqduqaYC1pn5/ngW', NULL, '2025-04-07 17:27:51'),
                                                                                                                  (6, 6, 'tecnico2', '$2b$10$flI4rO4PmifdDWP7AK4FNOFyYUc0yozDwUDuDxcPK7vIjt7h6PfR2', NULL, '2025-04-07 17:28:58'),
                                                                                                                  (7, 7, 'tecnico3', '$2b$10$o54ewxReftrzPw4bERHXJuSJhOsitfG.tbOcpmyER.LUaKDY5hqji', NULL, '2025-04-07 17:29:24'),
                                                                                                                  (8, 8, 'tecnico4', '$2b$10$BaZK554KWYNuL/lUDGV4c.WQYLb9Fl3I9qg.UuFWfOQkl6ZOM0bsS', NULL, '2025-04-07 17:30:01'),
                                                                                                                  (9, 9, 'tecnico5', '$2b$10$gj2IdC4B5EK0XY6LAHRrjODbLZ1orGP.s9F9gJ2CzbM/Djb802OrC', '2025-04-08 02:40:05', '2025-04-07 17:35:21');

-- Dumping structure for table seminario.reparaciones
CREATE TABLE IF NOT EXISTS `reparaciones` (
                                              `id_reparacion` int(11) NOT NULL AUTO_INCREMENT,
                                              `id_equipo` int(11) NOT NULL,
                                              `id_solicitud` int(11) DEFAULT NULL,
                                              `id_tecnico_asignado` int(11) NOT NULL,
                                              `fecha_reporte` timestamp NULL DEFAULT current_timestamp(),
                                              `fecha_inicio_reparacion` timestamp NULL DEFAULT NULL,
                                              `fecha_finalizacion` timestamp NULL DEFAULT NULL,
                                              `diagnostico` text DEFAULT NULL,
                                              `estado` enum('En espera','En reparación','Reparado','Descartado') NOT NULL DEFAULT 'En espera',
                                              PRIMARY KEY (`id_reparacion`),
                                              KEY `id_equipo` (`id_equipo`),
                                              KEY `id_solicitud` (`id_solicitud`),
                                              KEY `id_tecnico_asignado` (`id_tecnico_asignado`),
                                              CONSTRAINT `reparaciones_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON DELETE CASCADE,
                                              CONSTRAINT `reparaciones_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudessoporte` (`id_solicitud`) ON DELETE SET NULL,
                                              CONSTRAINT `reparaciones_ibfk_3` FOREIGN KEY (`id_tecnico_asignado`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.reparaciones: ~1 rows (approximately)
INSERT INTO `reparaciones` (`id_reparacion`, `id_equipo`, `id_solicitud`, `id_tecnico_asignado`, `fecha_reporte`, `fecha_inicio_reparacion`, `fecha_finalizacion`, `diagnostico`, `estado`) VALUES
    (1, 2, 1, 9, '2025-04-08 02:39:07', NULL, NULL, NULL, 'En espera');

-- Dumping structure for table seminario.roles
CREATE TABLE IF NOT EXISTS `roles` (
                                       `id_rol` int(11) NOT NULL AUTO_INCREMENT,
                                       `rol` varchar(50) NOT NULL,
                                       `descripcion` varchar(50) DEFAULT NULL,
                                       PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id_rol`, `rol`, `descripcion`) VALUES
                                                         (1, 'Administrador', NULL),
                                                         (2, 'Técnico', NULL),
                                                         (3, 'solicitante', NULL);

-- Dumping structure for table seminario.roles_funciones
CREATE TABLE IF NOT EXISTS `roles_funciones` (
                                                 `id_rol` int(11) NOT NULL,
                                                 `id_funcion` int(11) NOT NULL,
                                                 PRIMARY KEY (`id_rol`,`id_funcion`) USING BTREE,
                                                 KEY `FK__funciones` (`id_funcion`),
                                                 CONSTRAINT `FK__funciones` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
                                                 CONSTRAINT `FK__roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.roles_funciones: ~0 rows (approximately)

-- Dumping structure for table seminario.solicitudessoporte
CREATE TABLE IF NOT EXISTS `solicitudessoporte` (
                                                    `id_solicitud` int(11) NOT NULL AUTO_INCREMENT,
                                                    `id_usuario_solicitante` int(11) NOT NULL,
                                                    `id_equipo` int(11) DEFAULT NULL,
                                                    `descripcion_problema` text NOT NULL,
                                                    `fecha_solicitud` timestamp NULL DEFAULT current_timestamp(),
                                                    `estado` enum('Pendiente','En proceso','Resuelto','Cancelado') NOT NULL DEFAULT 'Pendiente',
                                                    PRIMARY KEY (`id_solicitud`),
                                                    KEY `id_usuario_solicitante` (`id_usuario_solicitante`),
                                                    KEY `id_equipo` (`id_equipo`),
                                                    CONSTRAINT `solicitudessoporte_ibfk_1` FOREIGN KEY (`id_usuario_solicitante`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
                                                    CONSTRAINT `solicitudessoporte_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.solicitudessoporte: ~1 rows (approximately)
INSERT INTO `solicitudessoporte` (`id_solicitud`, `id_usuario_solicitante`, `id_equipo`, `descripcion_problema`, `fecha_solicitud`, `estado`) VALUES
    (1, 3, 2, 'no enciende', '2025-04-08 02:39:07', 'Pendiente');

-- Dumping structure for table seminario.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
                                          `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
                                          `nombre` varchar(50) NOT NULL,
                                          `email` varchar(50) NOT NULL,
                                          `telefono` varchar(20) DEFAULT NULL,
                                          `id_rol` int(11) NOT NULL,
                                          PRIMARY KEY (`id_usuario`),
                                          UNIQUE KEY `email` (`email`),
                                          KEY `FK_usuarios_roles` (`id_rol`),
                                          CONSTRAINT `FK_usuarios_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table seminario.usuarios: ~9 rows (approximately)
INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `telefono`, `id_rol`) VALUES
                                                                                   (1, 'Admi Nistrador', 'administrador@sth.com', '12345678', 1),
                                                                                   (2, 'Tec Nico', 'tecnico@sth.com', '87654321', 2),
                                                                                   (3, 'Soli Citante Uno', 'solicitante1@sth.com', '74185263', 3),
                                                                                   (4, 'Soli Citante Dos', 'solicitante2@sth.com', '96458232', 3),
                                                                                   (5, 'Soli Citante Tres', 'solicitante3@sth.com', '91735684', 3),
                                                                                   (6, 'Tec Nico Dos', 'tecnico2@sth.com', '85212356', 2),
                                                                                   (7, 'Tec Nico Tres', 'tecnico3@sth.com', '45321295', 2),
                                                                                   (8, 'Tec Nico Cuatro', 'tecnico4@sth.com', '851234753', 2),
                                                                                   (9, 'Tec Nico Cinco', 'tecnico5@sth.com', '12368547', 2);

-- Dumping structure for trigger seminario.after_insert_reparacion
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER after_insert_reparacion
    AFTER INSERT ON reparaciones
    FOR EACH ROW
BEGIN
    INSERT INTO bitacora_reparaciones (
        id_reparacion,
        fecha,
        accion,
        usuario_responsable
    )
    VALUES (
               NEW.id_reparacion,
               NOW(),
               NEW.estado,
               NEW.id_tecnico_asignado
           );
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger seminario.after_reparacion_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER after_reparacion_update
    AFTER UPDATE ON reparaciones
    FOR EACH ROW
BEGIN
    IF OLD.estado != NEW.estado THEN
        INSERT INTO bitacora_reparaciones (id_reparacion, fecha, accion, usuario_responsable)
        VALUES (NEW.id_reparacion, NOW(), NEW.estado, NEW.id_tecnico_asignado);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
