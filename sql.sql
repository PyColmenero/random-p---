CREATE DATABASE agenciaseguros_php CHARSET utf8mb4 COLLATE utf8mb4_spanish2_ci;
CREATE TABLE clientes(
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    nombreCliente VARCHAR(45),
    apellido1Cliente VARCHAR(45),
    apellido2Cliente VARCHAR(45),
    dniCliente VARCHAR(9),
    tlfCliente VARCHAR(9),
    mailCliente VARCHAR(150),
    domicilioCliente VARCHAR(150)
);
CREATE TABLE empleados (
    idEmpleado INT AUTO_INCREMENT PRIMARY KEY,
    nombreEmpleado VARCHAR(45),
    apellido1Empleado VARCHAR(45),
    apellido2Empleado VARCHAR(45),
    dniEmpleado VARCHAR(9),
    tlfEmpleado INT,
    mailEmpleado VARCHAR(255),
    domicilioEmpleado VARCHAR(255),
    idJefeFK INT REFERENCES empleados(idEmpleado)
);
CREATE TABLE seguros (
    idSeguro INT AUTO_INCREMENT PRIMARY KEY,
    precioSeguro INT,
    cubrimientoSeguro VARCHAR(255)
);
CREATE TABLE seguros_obligatorios(
    idSeguroObligatorio INT AUTO_INCREMENT PRIMARY KEY,
    requisitosSeguroObligatorio VARCHAR(255),
    idSeguroFK INT REFERENCES seguros(idSeguro),
    idClienteFK INT REFERENCES clientes(idCliente),
    idEmpleadoFK INT REFERENCES empleados(idEmpleado)
);
CREATE TABLE seguros_voluntarios (
    idSeguroVoluntario INT AUTO_INCREMENT PRIMARY KEY,
    duracionSeguroVoluntario INT,
    idSeguroFK INT REFERENCES seguros(idSeguro),
    idEmpleadoFK INT REFERENCES empleados(idEmpleado),
    idClienteFK INT REFERENCES clientes(idCliente)
);
INSERT INTO empleados
VALUES(
        NULL,
        'Lucas',
        'Don Aire',
        'Chamorro',
        '38497555R',
        954732839,
        'lucasin@gmail.com',
        'Av. Pueblo Saharaui, 7A, 7B, 41008 Sevilla'
    ),
    (
        NULL,
        'Alba',
        'Romero',
        'Aguilar',
        '36475829O',
        946233990,
        'studiumnostudium@gmail.com',
        'Rambla de Espinar nº892'
    );
CREATE TABLE videosmusicales(
    idVideoMusical INT AUTO_INCREMENT PRIMARY KEY,
    nombreVideoMusical VARCHAR(255),
    artistasVideoMusical VARCHAR(255),
    idProductoFK INT,
    FOREIGN KEY(idProductoFK) REFERENCES productos(idProducto)
);
SELECT SUM(precioProducto),
    dniAbonado
FROM beneficiarios
    JOIN abonados ON abonados.idAbonado = beneficiarios.idAbonadoFK
    JOIN visualizaciones ON beneficiarios.idBeneficiario = visualizaciones.idBeneficiarioFK
    JOIN productos ON visualizaciones.idProductoFK = productos.idProducto
GROUP BY idAbonado;
ALTER TABLE abonados
ADD correoElectronicoAbonado VARCHAR(50)
AFTER direccionAbonado;
DELETE FROM visualizaciones
WHERE minutoExactoVisualizacion < 30;
FLUSH PRIVILEGES;

REVOKE SELECT ON `tele+`.`productos` FROM 'userTelePlus'@'%';
FLUSH PRIVILEGES;