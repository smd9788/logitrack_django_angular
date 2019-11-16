import axios from "axios";
import { createMessage } from "./messages";

import {
  GET_CUSTOMERS,
  DELETE_CUSTOMER,
  ADD_CUSTOMER,
  GET_ERRORS
} from "./types";

// GET CUSTOMERS
export const getCustomers = () => dispatch => {
  axios
    .get("/api/customers/")
    .then(res => {
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE CUSTOMER
export const deleteCustomer = id => dispatch => {
  axios
    .delete(`/api/customers/${id}/`)
    .then(res => {
      dispatch(createMessage({ deleteCustomer: "Customer Deleted" }));
      dispatch({
        type: DELETE_CUSTOMER,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD CUSTOMER
export const addCustomer = customer => dispatch => {
  axios
    .post("/api/customers/", customer)
    .then(res => {
      dispatch(createMessage({ addCustomer: "Customer Added Successfully" }));
      dispatch({
        type: ADD_CUSTOMER,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};