import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) return null;

  const isSuccess = notification.type === "success";
  const toastClass = isSuccess ? "toast toast-success" : "toast toast-error";

  return (
    <div className={toastClass} role="alert">
      <FontAwesomeIcon icon={isSuccess ? faCheck : faXmark} className="mr-1" />
      <span>{notification.message}</span>{" "}
    </div>
  );
};

export default Notification;