SET @db := 'seminario';
SET @trigger := 'after_insert_reparacion';

SELECT COUNT(*) INTO @trigger_exists
FROM information_schema.TRIGGERS
WHERE TRIGGER_SCHEMA = @db AND TRIGGER_NAME = @trigger;

SET @drop_stmt = IF(@trigger_exists > 0,
                    CONCAT('DROP TRIGGER ', @db, '.', @trigger),
                    'SELECT "Trigger does not exist"');

PREPARE stmt FROM @drop_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

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
END;
//

DELIMITER ;
