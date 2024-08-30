import http from "../../axios-http-caller";
import { LoginException } from "./exceptions/LoginException";
import enviroment from "../../../../enviroment.json";

class LoginServices{

    login = async (request) => {
        let url = enviroment.REACT_APP_VALIDATE_ACCESS
        try {
            const response = await http(url, 'POST', request);
            return { success: true, data: response.data.data, message: response.message }
        } catch (error) {
            return LoginException(error)
        }  
    }

    logout = async () => {
        let url = enviroment.REACT_APP_LOGOUT
        try {
            const response = await http(url, 'DELETE');
            return { success: true, data: response.data.data, message: response.message }
        } catch (error) {
            return LoginException(error)
        }  
    }
}

export default new LoginServices();