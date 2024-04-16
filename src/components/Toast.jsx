import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const autoClose = 3000;

export const notify = ({ type, text }) => {
  switch (type) {
    case "default":
      toast(text);
      break;
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "error":
      toast.error(text);
      break;
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  );
};

export default Toast;
