import axios from "axios";
const API_URL = "http://localhost:3001/api/user"
import { createUserState } from "../interfaces/form-states";
let localStorage = window.localStorage


    const login = async (userName:string, password: string) => {
        let user
        const response = await axios.post(`${API_URL}/signIn`, {
            userName,
            password
        });
        let token = response.data.token
        if (token) {
            let splitToken = token.split('.')
            user = JSON.parse(atob(splitToken[1]))
            localStorage.setItem('user', JSON.stringify(response.data.token));

        }
      
        return user;
    }

    const createUser = async (accountInfo: createUserState) => {
        let { userName, password, email } = accountInfo
        return await axios.post(`${API_URL}/createUser`, {
            userName, password, email
        })
    }

    const getCurrentUser = () => {
        let jwt = localStorage.getItem('user')
        if(jwt != null || jwt != undefined){
            let parsedToken = JSON.parse(jwt)
            
            let tokens = parsedToken.token.split('.')
            let decodedUser = atob(tokens[1])
            
            return JSON.parse(decodedUser)
        } else {
            return 'No one is currently signed In'
        }
    }
    const logout = () => {
        localStorage.removeItem('user')

    }

const AuthService = {
    login,
    logout,
    createUser,
    getCurrentUser
}

export default AuthService