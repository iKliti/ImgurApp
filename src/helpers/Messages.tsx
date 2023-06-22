import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
    closeButton: true,
    newestOnTop: true,
    positionClass: "toast-bottom-center",
    preventDuplicates: false,
    onclick: undefined,
    showDuration: 300, 
    hideDuration: 1000, 
    timeOut: 5000, 
    extendedTimeOut: 1000, 
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

export const successMsg = (message: string): void => {
  toastr.success(message);
};

export const infoMsg = (message: string): void => {
  toastr.info(message);
};

export const warningMsg = (message: string): void => {
  toastr.warning(message);
};

export const errorMsg = (message: string): void => {
  toastr.error(message);
};
