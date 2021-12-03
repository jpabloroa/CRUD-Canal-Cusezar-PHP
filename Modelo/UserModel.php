<?php
require_once PROJECT_ROOT_PATH . "/Modelo/Database.php";

class UserModel extends Database
{
    public function getUsers($limit = 100)
    {
        return $this->select(
            "SELECT * FROM clientes ORDER BY fechaDeCreacion ASC LIMIT ?",
            ["i", $limit]
        );
    }

    public function addClientes($clientes = [])
    {
        $count = 0;
        foreach ($clientes as $cliente) {
            $cliente["fechaDeCreacion"] = date("Y-m-d");
            $result = $this->insert(
                "INSERT INTO clientes (
                fechaDeCreacion,
                nombre,
                correo,
                celular,
                medioPublicitario,
                proyectoDeInteres
            ) VALUES (?,?,?,?,?,?)",
                $cliente
            );
            if ($result) {
                $count++;
            }
        }
        return $count;
    }

    public function updateCliente($parametro, $cliente = [])
    {
        if (!is_numeric($parametro)) {
            throw new Exception("Error de sintáxis, compruebe si parametro es de tipo numérico ");
        }
        /*foreach($cliente as $param){
            $cliente[$param] = ()?null:$cliente[$param];
        }*/
        return $this->insert_update(
            "UPDATE clientes SET 
            viable = ?,
            nombre = ?,
            correo = ?,
            celular = ?,
            medioPublicitario = ?,
            zonaBusqueda = ?,
            proyectoDeInteres = ?,
            gestionDesdeSalaDeVentas = ?,
            habeasData = ?,
            fechaDeContacto = ?,
            fechaDeContactoEfectivo = ?,
            proyectoCalificado = ?,
            fechaVisitaAgendada = ?,
            fechaVisitaEfectiva = ?,
            estado = ?,
            fechaModificacionEstado = ?,
            asignadoA = ?
            WHERE codigoConteo = ?",
            $cliente
        );
    }
    public function deleteCliente($parametro = 0)
    {
        return $this->select(
            "DELETE FROM clientes WHERE codigoConteo = ?",
            ["i", $parametro]
        );
    }
}


class Cliente
{
    public $fechaDeCreacion;
    public $viable;
    public $nombre;
    public $correo;
    public $celular;
    public $medioPublicitario;
    public $zonaBusqueda;
    public $proyectoDeInteres;
    public $gestionDesdeSalaDeVentas;
    public $habeasData;
    public $fechaDeContacto;
    public $fechaDeContactoEfectivo;
    public $proyectoCalificado;
    public $fechaVisitaAgendada;
    public $fechaVisitaEfectiva;
    public $estado;
    public $fechaModificacionEstado;
    public $asignadoA;
}
