import { axiosinstance } from "../config/axiosinstance"

// -------------upload user certificate api------------
export const uploadUserCertificateApi = async (data) =>{
    try {
        const response = await axiosinstance.post("/api/user/upload-certificate",data);
        if(response){
        return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};

// ------------get my certificate api-------
export const getMyCertificatesApi = async ()=>{
    try {
        const response = await axiosinstance.get("/api/user/get/my-certificates");
        if(response){
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};