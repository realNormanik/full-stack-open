import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="stack">
      <button className={visible ? "ghost" : "create"} onClick={toggleVisibility}>
        {visible ? "cancel" : "create new blog"}
      </button>

      <div className="reveal" data-open={visible}>
        {props.children}
      </div>
    </div>
  );
};

export default Togglable;