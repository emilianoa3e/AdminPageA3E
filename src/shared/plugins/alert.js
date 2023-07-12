import Swal from "sweetalert2";

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
    cancelButtonColor: "rgb(221, 51, 51)",
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
