#!/bin/bash

# Script para generar base de datos,
# proporciona:
#     - Usuario "canaldigital"
#     - Base de datos con 16 columnas
#     - Clona repositorio
#     - Reinicia el servidor

echo ""
echo "*************************************************"
echo ""
echo "Comprobando si /etc/mysql existe..."
echo ""
echo "*************************************************"
echo ""

if [ -d "/etc/mysql" ]; then
    echo ""
    echo "*************************************************"
    echo ""
    echo "MySQL está instalado, proporcione usuario y"
    echo "contraseña "
    echo ""
    echo "*************************************************"
    echo ""
    read -p "Usuario: " usuario
    read -sp "Contraseña: " clave

    sudo mysql -u ${usuario} -p ${clave} -e "CREATE DATABASE `CUSEZAR`;"
    sudo mysql -u ${usuario} -p ${clave} -e "USE `CUSEZAR`;"
    sudo mysql -u ${usuario} -p ${clave} -e "CREATE USER 'canaldigital'@'localhost' IDENTIFIED BY 'Nad95037*Cspor009';"
    sudo mysql -u ${usuario} -p ${clave} -e "GRANT ALL PRIVILEGES ON cusezar TO 'canaldigital'@'localhost';"
    sudo mysql -u ${usuario} -p ${clave} -e "FLUSH PRIVILEGES;"
    sudo mysql -u ${usuario} -p ${clave} -e "CREATE TABLE `clientes` (`fechaDeCreacion` DATE NOT NULL,`codigoConteo` INT NULL AUTO_INCREMENT PRIMARY KEY,`viable` BOOLEAN NULL DEFAULT TRUE,`nombre` VARCHAR(50) NOT NULL,`correo` VARCHAR(50) NULL,`celular` VARCHAR(50) NULL,`medioPublicitario` VARCHAR(50) NOT NULL,`zonaBusqueda` VARCHAR(50) NULL,`proyectoDeInteres` VARCHAR(50) NULL,`gestionDesdeSalaDeVentas` BOOLEAN NULL DEFAULT FALSE,`habeasData` BOOLEAN NULL DEFAULT FALSE,`fechaDeContacto` DATE NULL,`fechaDeContactoEfectivo` DATE NULL,`proyectoCalificado` VARCHAR(50) NULL,`fechaVisitaAgendada` DATE NULL,`fechaVisitaEfectiva` DATE NULL,`estado` VARCHAR(20) NULL,`fechaModificacionEstado` DATE NULL,`asignadoA` VARCHAR(50) NULL) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_unicode_ci;"
    sudo mysql -u ${usuario} -p ${clave} -e "EXIT;"

    echo ""
    echo "*************************************************"
    echo ""
    echo "Se ha creado la base de datos!"
    echo "..."
    echo "Iniciando instalación aplicación"
    echo ""
    echo "*************************************************"
    echo ""

    read -p "Directorio donde se instalará la aplicación" DIR

    echo ""
    echo "*************************************************"
    echo ""
    if [ -d "${DIR}/CRUD-CANAL-CUSEZAR-PHP" ]; then
        # Se ejecuta esta linea si el archivo exite
        echo "*************************************************"
        echo ""
        echo "En búsqueda de nuevas versiones de la aplicación..."
        echo "..."
        cd "${DIR}/CRUD-CANAL-CUSEZAR-PHP"
        git pull

        echo "Actualizado !"
        echo ""
        echo "*************************************************"
        echo ""
    else
        # Se ejecuta esta linea si el archivo no exite
        echo "*************************************************"
        echo ""
        echo "El recurso solicitado no existe, se inicia bús-"
        echo "queda en el repositorio a continuación: "
        echo "https://github.com/jpabloroa/CRUD-CANAL-CUSEZAR-PHP.git..."
        echo "..."
        cd $DIR
        git clone https://github.com/jpabloroa/CRUD-CANAL-CUSEZAR-PHP.git
        cd $filename
        echo "Se genera el directorio $CRUD-CANAL-CUSEZAR-PHP"
        echo ""
        echo "*************************************************"
        echo ""
    fi

    echo ""
    echo "*************************************************"
    echo ""
    echo "Aplicando cambios ..."
    echo "..."
    echo "El servidor debe reiniciarse ..."
    echo "..."
    echo "Reiniciando servidor ..."
    echo ""
    echo "*************************************************"
    echo ""

    sudo systemctl reload apache2

else

    echo ""
    echo "*************************************************"
    echo ""
    echo "MySQL no se encuentr en la ruta /etc..."
    echo "..."
    echo "Finalizando operación..."
    echo ""
    echo "*************************************************"
    echo ""
fi
