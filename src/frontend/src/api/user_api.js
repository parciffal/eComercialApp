import ApiManager from "./ApiManager";

export const user_login = async data => {
    try {
        const response = await ApiManager("auth/login/",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
        return response
    } catch (error) {
        return error.response.data
    }
}


export const user_logout = async (accessToken, data) => {
    try {
        console.log(data)
        const result = await ApiManager("auth/logout/",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        });
    } catch (error) {
        return error.response.data
    }
}

export const user_register = async data => {
    try {
        const result = await ApiManager("auth/register/",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        });
    } catch (error) {
        return error.response.data
    }
}

export const get_user_info = async (accessToken) => {
    try {
        const response = await ApiManager("api/profile/",{
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accessToken['accessToken']}`
            },
        });
        console.log(response.data)
        return response
    } catch (error) {
        return error.response.data
    }
}
