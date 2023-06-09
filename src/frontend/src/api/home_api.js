import ApiManager from "./ApiManager";

export const get_categories = async data => {
    try {
        const response = await ApiManager("api/category/",{
            method: "GET",
            headers: {
                'content-type': 'application/json',
            }
        });
        return response
    } catch (error) {
        return error.response.data
    }
}

export const get_products = async data => {
    try {
        const response = await ApiManager("api/product/",{
            method: "GET",
            headers: {
                'content-type': 'application/json',
            }
        });
        return response
    } catch (error) {
        return error.response.data
    }
}

