import axios from "axios";
import instance from "../shared/Axios";

export const loginPost = async (email, password) => {
  const dataJson = {
    email,
    password,
  };

  try {
    const data = await axios.post(
      instance.defaults.baseURL + "/auth/signin",
      dataJson
    );

    return data.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const renewToken = async (dispatch) => {
  const token = localStorage.getItem("token") || null;

  if (token) {
    try {
      const resp = await axios.post(
        instance.defaults.baseURL + "/auth/renew-token",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.data) {
        const data = resp.data;
        const token = data.token;
        const fullname = data.fullname;
        const id = data.id;
        const email = data.email;
        const role = data.role;

        localStorage.setItem("token", token);

        dispatch({
          type: "LOGIN",
          payload: {
            fullname,
            id,
            email,
            role,
          },
        });
      } else {
        localStorage.removeItem("token");
        dispatch({
          type: "LOGOUT",
        });
      }

      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      dispatch({
        type: "LOGOUT",
      });

      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    }
  } else {
    dispatch({
      type: "LOGOUT",
    });
  }
};
