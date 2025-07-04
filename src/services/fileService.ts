import {secureAPI} from "../api/api"

const useFileService = () => {
    const uploadFile = async (formData:any) => {
        const response = await secureAPI.post("files/upload", formData)
        return response.data;
    }
    const getFiles = async () => {
        const response = await secureAPI.get("files/")
        return response.data;
    }
    const deleteFile = async (fileId:number) => {
        const response =  await secureAPI.delete(`files/${fileId}`)
        return response.data;
    }
    return {
        uploadFile,
        getFiles,
        deleteFile
    }
}

export default useFileService
