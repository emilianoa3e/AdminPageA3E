import axios from "axios";

export const loginPost = async (email, password) => {
  const dataJson = {
    email,
    password,
  };

  try {
    const data = await axios.post(
      "http://localhost:8080/api/auth/signin",
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
    dispatch({
      type: "LOGIN",
      payload: {
        fullname: "",
        id: 0,
        email: "",
        role: 0,
      },
    });
  } else {
    dispatch({
      type: "LOGOUT",
    });
  }

  dispatch({
    type: "IS_LOADING",
    payload: false,
  });
};
