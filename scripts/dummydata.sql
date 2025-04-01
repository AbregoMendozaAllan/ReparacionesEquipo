INSERT INTO Roles (rol) VALUES
    ('Administrador'),
    ('Técnico'),
    ('solicitante Final');
INSERT INTO Funciones (funcion) VALUES
    ('Gestionar Usuarios'),
    ('Gestionar Equipos'),
    ('Asignar Equipos'),
    ('Solicitar Soporte'),
    ('Reparar Equipos');
INSERT INTO Roles_Funciones (id_rol, id_funcion) VALUES
    (1, 1), -- Admin puede gestionar usuarios
    (1, 2), -- Admin puede gestionar equipos
    (1, 3), -- Admin puede asignar equipos
    (1, 4), -- Admin puede solicitar soporte
    (1, 5), -- Admin puede reparar equipos
    (2, 5), -- Técnico puede reparar equipos
    (3, 4); -- solicitante final puede solicitar soporte
INSERT INTO Usuarios (nombre, email, telefono, id_rol) VALUES
    ('Juan Pérez', 'juan@example.com', '123456789', 1),
    ('Ana López', 'ana@example.com', '987654321', 2),
    ('Carlos Gómez', 'carlos@example.com', '555666777', 3);
INSERT INTO Equipos (equipo, tipo, marca, modelo, serie, estado) VALUES
    ('Laptop Dell', 'Laptop', 'Dell', 'XPS 15', '123ABC456', 'Disponible'),
    ('PC Oficina', 'PC', 'HP', 'EliteDesk 800', 'HP987XYZ', 'Disponible'),
    ('Monitor Samsung', 'Monitor', 'Samsung', 'Curved 27"', 'SAMS27CRV', 'Disponible');
INSERT INTO Asignaciones (id_equipo, id_usuario, fecha_asignacion, estado) VALUES
    (1, 3, NOW(), 'Asignado'),
    (2, 3, NOW(), 'Asignado');
INSERT INTO SolicitudesSoporte (id_usuario_solicitante, id_equipo, descripcion_problema, fecha_solicitud, estado) VALUES
    (3, 1, 'La pantalla de la laptop no enciende.', NOW(), 'Pendiente'),
    (3, 2, 'La PC se reinicia sola.', NOW(), 'Pendiente');
INSERT INTO Reparaciones (id_equipo, id_solicitud, id_tecnico_asignado, fecha_reporte, estado) VALUES
    (1, 1, 2, NOW(), 'En espera'),
    (2, 2, 2, NOW(), 'En espera');
INSERT INTO Bitacora_Asignaciones (id_asignacion, fecha, accion, usuario_responsable) VALUES
    (1, NOW(), 'Asignado', 1),
    (2, NOW(), 'Asignado', 1);
INSERT INTO Bitacora_Reparaciones (id_reparacion, fecha, accion, usuario_responsable) VALUES
    (1, NOW(), 'Recibido', 2),
    (2, NOW(), 'Recibido', 2);
INSERT INTO Login (id_usuario, username, password, ultimo_login) VALUES
    (1, 'admin', 'pass1234', NOW()),
    (2, 'tech1', '4321ssap', NULL),
    (3, 'carlos_g', 'contra123', NULL);
