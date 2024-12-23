import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {base_url, createToken} from "../../utils/constants.ts";
import {RootState} from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${base_url}/user`, {
            method: 'Post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 409) {
            throw new Error(`user ${user.login} already exists`)
        }
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        const data = await response.json();
        const token = createToken(user.login, user.password);
        return {token, user: data}
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${base_url}/login`, {
            method: 'Post',
            headers: {
                Authorization: token
            }

        })
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        const data = await response.json();
        return {token, user: data}
    }
)

export const updateUser = createAsyncThunk<UserProfile, UserData, { state: RootState }>(
    'user/update',
    async (user, {getState}) => {
        const response = await fetch(`${base_url}/user`, {
            method: 'Put',
            headers: {
                Authorization: getState().token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        if (!response.ok) {
            throw new Error(`Something went wrong`)
        }
        return await response.json();
    }
)

export const changePassword = createAsyncThunk<string, { oldPassword: string, newPassword: string }, { state: RootState }>(
    'user/changePassword',
    async ({ oldPassword, newPassword }, { getState }) => {
        const username = getState().user.login;

        const authHeader = createToken(username,oldPassword)
        const response = await fetch(`${base_url}/account/user/password`, {
            method: 'PUT',
            headers: {
                Authorization: authHeader,
                'X-Password': newPassword,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to change password');
        }
        return 'Password changed successfully';
    }
);


