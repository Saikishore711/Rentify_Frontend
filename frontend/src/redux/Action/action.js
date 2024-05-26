import * as types from "./actionType";
import axios from "axios";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { toast } from "react-toastify";

const headers = {
  "Content-type": "application/json",
  Authorization: `${GLOBAL_CONSTANTS?.token}`,
};

// ?get-----------------------------------------------------------
const getProductListData = (data) => ({
  type: types.PRODUCTS_LIST,
  payload: data,
});

export const loadProductListData = () => {
  return function (dispatch) {
    axios
      .get(`https://dummyjson.com/products?limit=5`)
      .then((resp) => {
        dispatch(getProductListData(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

// ?post--------------------------------------------------------
export const forget_password = (data, callback) => {
    return function () {
      let headers = {
        "Content-type": "application/json",
      };
      axios
        .post(
          `${GLOBAL_CONSTANTS.backend_host}api/v1/ondc/forget_password`,
          JSON.stringify(data),
          { headers }
        )
        .then((resp) => {
          callback(resp.data);
        })
        .catch(() => {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
        });
    };
  };


  export const login_api = async (data) => {
    try {
      const response = await axios.post(
        `${GLOBAL_CONSTANTS?.backend_host}api/auth/login`,
        JSON.stringify(data),
        { headers }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  export const register_api = async (data) => {
    try {
      const response = await axios.post(
        `${GLOBAL_CONSTANTS?.backend_host}api/auth/register`,
        JSON.stringify(data),
        { headers }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  export const getProperties = async () => {
    try{
      const response = await axios.get(
        `${GLOBAL_CONSTANTS?.backend_host}api/properties/buyer`,
        {headers}
      );
      return response?.data;
    }catch(err){
      console.error("Error fetching properties",err);
      return false;

    }
  }


