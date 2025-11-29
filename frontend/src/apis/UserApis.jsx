import { axiosinstance } from "../config/axiosinstance"


export const registerApi = async (formData) => {
    try {
        const res = await axiosinstance.post("/api/user/register", formData);
        if(res){
            return res.data;
        }
    } catch (error) {
        console.log("error in register api");
    };
};