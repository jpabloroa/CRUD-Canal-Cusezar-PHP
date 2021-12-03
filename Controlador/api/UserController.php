<?php
class UserController extends BaseController
{

    public function httpMethod($UrlPaths = [])
    {
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        switch (strtoupper($requestMethod)) {
            case 'GET':
                try {
                    $userModel = new UserModel();

                    $intLimit = 100;
                    if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                        $intLimit = $arrQueryStringParams['limit'];
                    }

                    $arrUsers = $userModel->getUsers($intLimit);
                    $this->sendOutput(200, $arrUsers, [], 'Se cargó(aron) ' . count($arrUsers). ' cliente(s)');
                } catch (Error $e) {
                    $this->sendOutput(500, [], ['Internal Server Error - ' . $e->getMessage()], 'Detalles: ' . $e->getMessage());
                }
                break;
            case 'POST':
                try {
                    $userModel = new UserModel();

                    $data = json_decode(file_get_contents('php://input'), true);
                    $addedUsers = $userModel->addClientes($data);
                    $this->sendOutput(200, [$addedUsers." clientes cargados"], ['Registros agregados correctamente'], 'Se cargó(aron) ' . $addedUsers. ' cliente(s)');
                } catch (Error $e) {
                    $this->sendOutput(500, [], ['Internal Server Error - ' . $e->getMessage()], 'Detalles: ' . $e->getMessage());
                }
                break;
            case 'PUT':
                try {
                    $userModel = new UserModel();

                    $data = json_decode(file_get_contents('php://input'), true);
                    $arrUsers = $userModel->updateCliente($UrlPaths[1], $data);
                    //$this->sendOutput(200, $arrUsers, ['Registro actualizado correctamente'], 'Se cargó(aron) ' . count($arrUsers). ' cliente(s)');
                    $this->sendOutput(200, $data, ['Registro actualizado correctamente'], 'Respuesta!!!!!!');
                } catch (Error $e) {
                    $this->sendOutput(500, [], ['Internal Server Error - ' . $e->getMessage()], 'Detalles: ' . $e->getMessage());
                }
                break;
            case 'DELETE':
                try {
                    $userModel = new UserModel();

                    $arrUsers = $userModel->deleteCliente($UrlPaths[1]);
                    $this->sendOutput(200, $arrUsers, ['Registro eliminado correctamente'], 'Se cargó(aron) ' . count($arrUsers). ' cliente(s)');
                } catch (Error $e) {
                    $this->sendOutput(500, [], ['Internal Server Error - ' . $e->getMessage()], 'Detalles: ' . $e->getMessage());
                }
                break;
            default:
                $this->sendOutput(422, [], ['Unprocessable Entity'], 'Método ' . $requestMethod . ' no definido');
                break;
        }
    }
}
