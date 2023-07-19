import Swal from "sweetalert2";
import monkeyAngry from "../../assets/img/monoangry.gif";
import monketService from "../../assets/img/monoservice.gif";
import monketDestroy from "../../assets/img/monodestroy.gif";
import disconnect from "../../assets/img/disconnect-removebg-preview.png";

const gifs = [monkeyAngry, monketService, monketDestroy];

export const showConfirmDialog = (
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  confirmCallback
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#002e60",
    cancelButtonColor: "#a60c07",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};

export const showLoadingAlert = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoadingAlert = () => {
  Swal.close();
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const showSimpleAlert = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Ok",
    confirmButtonColor: "#002e60",
  });
};

export const showError400 = (confirmCallback) => {
  Swal.fire({
    title: "¡Ha ocurrido un error!",
    text: "Hubo un error en el servidor al procesar la petición. Por favor, inténtalo de nuevo más tarde.",
    imageUrl: gifs[Math.floor(Math.random() * gifs.length)],
    confirmButtonColor: "#a60c07",
    confirmButtonText: "Regresar",
    allowOutsideClick: false,
    background: `#fff url(${disconnect}) no-repeat bottom`,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
