import ApiManager from "./ApiManager";

// Get all products

export const get_user_items = async accesToken => {
    try {
        console.log(accesToken)
        const response = await ApiManager("api/items/",{
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accesToken}`
            },
            
        });
        return response
    } catch (error) {
        return error.response.data
    }
}

// Get a specific product

export const get_user_items_id = async (accesToken, id) => {
    try {
        const response = await ApiManager(`api/items/${id}/`,{
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accesToken}`
            },
            
        });
        return response
    } catch (error) {
        return error.response.data
    }
}

// Create a new product

export const create_user_item = async (accesToken, productData) => {
    try {
        const response = await ApiManager(`api/items/`,{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${accesToken}`,
                
            },
            data: productData
        });
        return response
    } catch (error) {
        return error.response.data
    }
}


// Update a product

export const update_user_item = async (accessToken, productId, updatedProductData) => {
    try {
      const response = await ApiManager(`api/items/${productId}/`,{
        method: "PATCH",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        data: updatedProductData,
      });
      return response;
    } catch (error) {
      return error.response.data;
    }
}
  


// Delete a product

export const delete_user_item = async (accessToken, productId) => {
    try {
      const response = await ApiManager(`api/items/${productId}/`,{
        method: "DELETE",
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      return error.response.data;
    }
  }