import * as types from "../Action/actionType";

const initialState = {
  // authActions
  loggedIn: false,
  token: null,
  userId: null,

  // products
  productList: [],

  propertyListings: [],
};

const DataReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        loggedIn: action.payload.token && action.payload.userId,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: null,
        userId: null,
      };

    case types.PRODUCTS_LIST:
      return {
        ...state,
        productList: action.payload.products,
      };
    case types.PROPERTY_LISTINGS:
      return {
        ...state,
        property_listings: action.payload,
      };
    default:
      return state;
  }
};
export default DataReducers;
