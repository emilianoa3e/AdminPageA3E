import { Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { Form as FormBt } from "react-bootstrap";
import { TextInput } from "../shared/TextInput";
import {
  Toast,
  showConfirmDialog,
  showLoadingAlert,
} from "../../shared/plugins/alert";
import * as Yup from "yup";
import CustomButton from "../shared/CustomButton";

export const ModalCreateClient = ({props, show, handleClose, handleSave}) => {

  const objectSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
  });
};
