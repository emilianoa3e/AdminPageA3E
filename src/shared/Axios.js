import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const requestHandler = (request) => {
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";

  return request;
};

const errorResponseHandler = (error) => {
  return Promise.reject({ ...error });
};

const successResponseHandler = (response) => {
  return Promise.resolve(response.data);
};

instance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => successResponseHandler(response),
  (error) => errorResponseHandler(error)
);

export default instance;
