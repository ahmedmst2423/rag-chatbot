import {secureAPI} from "../api/api"

const chatService = ()=>{
    const chat = async (query:string,sessionId:number | null) => {
        const url = sessionId ? `chat/${sessionId}` : "chat";
        const response = await secureAPI.post(url, {
            query:query
        })
        return response.data.message;
    }

    const newSession = async () => {
        const response = await secureAPI.post("/new_session");
        return response.data;
    }

    const deleteSession = async (sessionId:number) => {
        const response = await secureAPI.delete(`chat/sessions/${sessionId}`);
        return response.data;
    }

    const getSessions = async () => {
        const response = await secureAPI.get("/sessions");
        return response.data;
    }
    const getChatHistory = async (sessionId:number) => {
        const response = await secureAPI.get(`chat/history/${sessionId}`);
        console.log("Chat History Response:", response.data);
        return response.data;
    }


    
    return {
        chat,
        getSessions,
        newSession,
        deleteSession,
        getChatHistory
    }
}

export default chatService;