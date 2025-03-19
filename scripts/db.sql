CREATE DATABASE reparacionesequipo
CHARACTER SET utf8mb4
COLLATE utf8mb4_uca1400_ai_ci;

USE reparacionesequipo;


CREATE TABLE `roles` (
                         `id_rol` INT(11) NOT NULL AUTO_INCREMENT,
                         `rol` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                         `descripcion` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                         PRIMARY KEY (`id_rol`) USING BTREE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
ENGINE=InnoDB
;
CREATE TABLE `funciones` (
                             `id_funcion` INT(11) NOT NULL AUTO_INCREMENT,
                             `funcion` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                             PRIMARY KEY (`id_funcion`) USING BTREE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `roles_funciones` (
                                   `id_rol` INT(11) NOT NULL,
                                   `id_funcion` INT(11) NOT NULL,
                                   PRIMARY KEY (`id_rol`, `id_funcion`) USING BTREE,
                                   INDEX `FK__funciones` (`id_funcion`) USING BTREE,
                                   CONSTRAINT `FK__funciones` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`) ON UPDATE NO ACTION ON DELETE NO ACTION,
                                   CONSTRAINT `FK__roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `usuarios` (
                            `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
                            `nombre` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                            `email` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                            `telefono` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                            `id_rol` INT(11) NOT NULL,
                            PRIMARY KEY (`id_usuario`) USING BTREE,
                            UNIQUE INDEX `email` (`email`) USING BTREE,
                            INDEX `FK_usuarios_roles` (`id_rol`) USING BTREE,
                            CONSTRAINT `FK_usuarios_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `equipos` (
                           `id_equipo` INT(11) NOT NULL AUTO_INCREMENT,
                           `equipo` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           `tipo` ENUM('Laptop','PC','Monitor','Impresora','Otro') NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           `marca` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           `modelo` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           `serie` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           `estado` ENUM('Disponible','Asignado','En reparación','Descartado') NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                           PRIMARY KEY (`id_equipo`) USING BTREE,
                           UNIQUE INDEX `serie` (`serie`) USING BTREE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `asignaciones` (
                                `id_asignacion` INT(11) NOT NULL AUTO_INCREMENT,
                                `id_equipo` INT(11) NOT NULL,
                                `id_usuario` INT(11) NOT NULL,
                                `fecha_asignacion` TIMESTAMP NULL DEFAULT current_timestamp(),
                                `fecha_devolucion` TIMESTAMP NULL DEFAULT NULL,
                                `estado` ENUM('Asignado','Devuelto') NOT NULL DEFAULT 'Asignado' COLLATE 'utf8mb4_uca1400_ai_ci',
                                PRIMARY KEY (`id_asignacion`) USING BTREE,
                                INDEX `id_equipo` (`id_equipo`) USING BTREE,
                                INDEX `id_usuario` (`id_usuario`) USING BTREE,
                                CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON UPDATE RESTRICT ON DELETE CASCADE,
                                CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE RESTRICT ON DELETE CASCADE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `solicitudessoporte` (
                                      `id_solicitud` INT(11) NOT NULL AUTO_INCREMENT,
                                      `id_usuario_solicitante` INT(11) NOT NULL,
                                      `id_equipo` INT(11) NULL DEFAULT NULL,
                                      `descripcion_problema` TEXT NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                                      `fecha_solicitud` TIMESTAMP NULL DEFAULT current_timestamp(),
                                      `estado` ENUM('Pendiente','En proceso','Resuelto','Cancelado') NOT NULL DEFAULT 'Pendiente' COLLATE 'utf8mb4_uca1400_ai_ci',
                                      PRIMARY KEY (`id_solicitud`) USING BTREE,
                                      INDEX `id_usuario_solicitante` (`id_usuario_solicitante`) USING BTREE,
                                      INDEX `id_equipo` (`id_equipo`) USING BTREE,
                                      CONSTRAINT `solicitudessoporte_ibfk_1` FOREIGN KEY (`id_usuario_solicitante`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE RESTRICT ON DELETE CASCADE,
                                      CONSTRAINT `solicitudessoporte_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON UPDATE RESTRICT ON DELETE SET NULL
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `reparaciones` (
                                `id_reparacion` INT(11) NOT NULL AUTO_INCREMENT,
                                `id_equipo` INT(11) NOT NULL,
                                `id_solicitud` INT(11) NULL DEFAULT NULL,
                                `id_tecnico_asignado` INT(11) NOT NULL,
                                `fecha_reporte` TIMESTAMP NULL DEFAULT current_timestamp(),
                                `fecha_inicio_reparacion` TIMESTAMP NULL DEFAULT NULL,
                                `fecha_finalizacion` TIMESTAMP NULL DEFAULT NULL,
                                `diagnostico` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                                `estado` ENUM('En espera','En reparación','Reparado','Descartado') NOT NULL DEFAULT 'En espera' COLLATE 'utf8mb4_uca1400_ai_ci',
                                PRIMARY KEY (`id_reparacion`) USING BTREE,
                                INDEX `id_equipo` (`id_equipo`) USING BTREE,
                                INDEX `id_solicitud` (`id_solicitud`) USING BTREE,
                                INDEX `id_tecnico_asignado` (`id_tecnico_asignado`) USING BTREE,
                                CONSTRAINT `reparaciones_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON UPDATE RESTRICT ON DELETE CASCADE,
                                CONSTRAINT `reparaciones_ibfk_2` FOREIGN KEY (`id_solicitud`) REFERENCES `solicitudessoporte` (`id_solicitud`) ON UPDATE RESTRICT ON DELETE SET NULL,
                                CONSTRAINT `reparaciones_ibfk_3` FOREIGN KEY (`id_tecnico_asignado`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE RESTRICT ON DELETE CASCADE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `bitacora_asignaciones` (
                                         `id_bitacora_asignacion` INT(11) NOT NULL AUTO_INCREMENT,
                                         `id_asignacion` INT(11) NOT NULL,
                                         `fecha` TIMESTAMP NULL DEFAULT current_timestamp(),
                                         `accion` ENUM('Asignado','Reasignado','Devuelto') NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                                         `usuario_responsable` INT(11) NOT NULL,
                                         PRIMARY KEY (`id_bitacora_asignacion`) USING BTREE,
                                         INDEX `id_asignacion` (`id_asignacion`) USING BTREE,
                                         INDEX `usuario_responsable` (`usuario_responsable`) USING BTREE,
                                         CONSTRAINT `bitacora_asignaciones_ibfk_1` FOREIGN KEY (`id_asignacion`) REFERENCES `asignaciones` (`id_asignacion`) ON UPDATE RESTRICT ON DELETE CASCADE,
                                         CONSTRAINT `bitacora_asignaciones_ibfk_2` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE RESTRICT ON DELETE CASCADE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE `bitacora_reparaciones` (
                                         `id_bitacora_reparacion` INT(11) NOT NULL AUTO_INCREMENT,
                                         `id_reparacion` INT(11) NOT NULL,
                                         `fecha` TIMESTAMP NULL DEFAULT current_timestamp(),
                                         `accion` ENUM('Recibido','Diagnóstico','En reparación','Reparado','Descartado') NOT NULL COLLATE 'utf8mb4_uca1400_ai_ci',
                                         `usuario_responsable` INT(11) NOT NULL,
                                         PRIMARY KEY (`id_bitacora_reparacion`) USING BTREE,
                                         INDEX `id_reparacion` (`id_reparacion`) USING BTREE,
                                         INDEX `usuario_responsable` (`usuario_responsable`) USING BTREE,
                                         CONSTRAINT `bitacora_reparaciones_ibfk_1` FOREIGN KEY (`id_reparacion`) REFERENCES `reparaciones` (`id_reparacion`) ON UPDATE RESTRICT ON DELETE CASCADE,
                                         CONSTRAINT `bitacora_reparaciones_ibfk_2` FOREIGN KEY (`usuario_responsable`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE RESTRICT ON DELETE CASCADE
)
    COLLATE='utf8mb4_uca1400_ai_ci'
    ENGINE=InnoDB
;
CREATE TABLE Login (
                       id_login INT PRIMARY KEY AUTO_INCREMENT,
                       id_usuario INT NOT NULL,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL, -- Hashed password for security
                       ultimo_login TIMESTAMP NULL,
                       fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);
