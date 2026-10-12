import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      role="status"
      className={`notification ${type} fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md overflow-hidden rounded-md bg-foreground text-background shadow-xl`}
    >
      <div className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium">
        <span className={"h-2.5 w-2.5 shrink-0 rounded-full " + (isError ? "bg-red-500" : "bg-green-500")} />
        <span>{message}</span>
      </div>

      <div className={"h-1 origin-left motion-safe:animate-shrink " + (isError ? "bg-red-500" : "bg-green-500")} />
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error"]).isRequired
};

export default Notification;