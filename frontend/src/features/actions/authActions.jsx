import { axiosinstance } from "../../config/axiosinstance"
import { addUser, removeUser } from "../reducers/authSlice";


export const userRegisterApi = (data) => async (dispatch) => {

    try {

        const response = await axiosinstance.post("/api/user/register", data);

        if (response) {
            return response.data
        }
    } catch (error) {
        console.log("error in register api");
    };
};

export const userLoginApi = (data) => async (dispatch) => {
    try {

        const response = await axiosinstance.post("/api/user/login", data);

        if (response) {
            dispatch(addUser(response.data.user));
            // return response.data;
        }
    } catch (error) {
        console.log("error in login api", error);
    };
};

export const userLogoutApi = () => async (dispatch) => {
    try {

        const response = await axiosinstance.get("/api/user/logout");

        if (response) {
            dispatch(removeUser());
        }
    } catch (error) {
        console.log("error in the logout", error);
    };
};