import { axiosinstance } from "../../config/axiosinstance"
import { addUser, removeUser } from "../reducers/authSlice";


export const userRegisterApi = (data) => async (dispatch) => {

    try {

        const response = await axiosinstance.post("/api/user/register", data);

        if (response) {
            return response.data
        }
    } catch (error) {
        throw error.response?.data || error
    };
};

export const userLoginApi = (data) => async (dispatch) => {
    try {

        const response = await axiosinstance.post("/api/user/login", data);

        if (response) {
            dispatch(addUser(response.data.user));
            return response.data;
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};

export const userLogoutApi = () => async (dispatch) => {
    try {

        const response = await axiosinstance.get("/api/user/logout");

        if (response) {
            dispatch(removeUser());
        }
    } catch (error) {
        throw error.response?.data || error;
    };
};

export const changePasswordApi = (data) => async (dispatch) => {
    try {
        const response = await axiosinstance.post("/api/user/change-password", data);
        if(response){
            return response.data;
        }

    } catch (error) {
        throw error.response?.data || error;
    }
}