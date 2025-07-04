import { apiCall, secureAPI } from "../api/api"

const authService = () => {
    const signup = async (email: string, password: string) => {
        const response = await apiCall.post("auth/register", {
            email: email,
            password: password
        })
        return response.data;
    }
    
    const login = async (email: string, password: string) => {
        const response = await apiCall.post("auth/login", {
            email: email,
            password: password
        })
        const token = response.data.access_token;

        if (token) {
            localStorage.setItem("access_token", token);
        }
        
        return response;
    }
    
    const getCurrentUser = async () => {
        const response = await secureAPI.get("auth/me")
        return response.data;
    }
    
    return {
        signup,
        login,
        getCurrentUser
    }    
}

export default authService