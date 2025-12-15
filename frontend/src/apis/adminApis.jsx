import { axiosinstance } from "../config/axiosinstance";

// ----------------upload excel api-----------
export const UploadExcelApi = async (data) => {
    try {
        const response = await axiosinstance.post("/api/admin/upload-excel", data);
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};

// -----------uploading student certificate api---------
export const uploadStudentCertificateApi = async(data)=>{
    try {
        const response = await axiosinstance.post("/api/admin/upload/student-certificate", data);
        if(response){
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};