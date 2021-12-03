<?php
class Database
{
    protected $connection = null;

    public function __construct()
    {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);

            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function select($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params[0], $params[1]);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    public function insert($query = "", $params = [])
    {
        try {
            //$stmt = $this->executeStatementMultipleParams($query, $params);
            $stmt = $this->executeStatementMultipleParams($query);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    private function executeStatement($query = "", $typeValue = "", $value = "")
    {
        try {
            $stmt = $this->connection->prepare($query);

            if ($stmt === false) {
                throw new Exception("No es posible ejecutar la sentencia: " . $query);
            }

            if (strlen($typeValue) == 1) {
                $stmt->bind_param($typeValue, $value);
            } else {
                throw new Exception("Error de sintáxis, compruebe el tamaño del typeOfValues y params ");
            }

            $stmt->execute();

            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    private function executeStatementMultipleParams($query = "", $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);

            if ($stmt === false) {
                throw new Exception("No es posible ejecutar la sentencia: " . $query);
            }

            if ($params && count($params) >= 1) {
                $stmt->bind_param(
                    "ibssssssbbiisiisis",
                    // Parametros
                    $params[0],
                    $params[1],
                    $params[2],
                    $params[3],
                    $params[4],
                    $params[5],
                    $params[6],
                    $params[7],
                    $params[8],
                    $params[9],
                    $params[10],
                    $params[11],
                    $params[12],
                    $params[13],
                    $params[14],
                    $params[15],
                    $params[16],
                    $params[17],
                    $params[18]
                );
            } else {
                throw new Exception("Error de sintáxis, compruebe el tamaño de params ");
            }

            $stmt->execute();

            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    private function executeStatementWithOutBinding($query = "")
    {
        try {
            $stmt = $this->connection->prepare($query);

            if ($stmt === false) {
                throw new Exception("No es posible ejecutar la sentencia: " . $query);
            }

            $stmt->execute();

            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
/*
$params->fechaDeCreacion,
                    $params->viable,
                    $params->nombre,
                    $params->correo,
                    $params->celular,
                    $params->medioPublicitario,
                    $params->zonaBusqueda,
                    $params->proyectoDeInteres,
                    $params->gestionDesdeSalaDeVentas,
                    $params->habeasData,
                    $params->fechaDeContacto,
                    $params->fechaDeContactoEfectivo,
                    $params->proyectoCalificado,
                    $params->fechaVisitaAgendada,
                    $params->fechaVisitaEfectiva,
                    $params->estado,
                    $params->fechaModificacionEstado,
                    $params->asignadoA
 */