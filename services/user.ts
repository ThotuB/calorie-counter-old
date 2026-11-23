import axios from 'axios';
import { ProfileDto } from 'types/profile';

const baseUrl = '/api';

export const updateUserProfile = async ({ uid, ...profile }: ProfileDto): Promise<void> => {
    await axios.put(`${baseUrl}/user/profile/${uid}`, profile);
};

export const getUserProfile = async (uid: string) => {
    return await axios.get<ProfileDto>(`${baseUrl}/user/profile/${uid}`);
};

export const isAdmin = async (uid: string): Promise<boolean> => {
    const res = await axios.get<{ isAdmin: boolean }>(`${baseUrl}/user/admin/${uid}`);
    return res.data.isAdmin;
};

export const makeUserAdminWithToken = async (uid: string, token: string): Promise<void> => {
    await axios.post(`${baseUrl}/user/admin`, { uid }, { params: { token } });
};
