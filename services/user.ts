import axios from "axios";

const baseUrl = 'http://localhost:3000/api';

export const updateUserProfile = async () => {

}

export const getUserProfile = async (uid: string) => {
    return await axios.get(`${baseUrl}/user/${uid}`);
}