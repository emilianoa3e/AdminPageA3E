export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogged: true,
        fullName: action.payload.fullName,
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.role,
      };

    case "LOGOUT":
      return {
        isLogged: false,
        id: "",
        fullName: "",
        email: "",
        role: "",
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        fullName: action.payload.fullName,
        email: action.payload.email,
      };

    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};
