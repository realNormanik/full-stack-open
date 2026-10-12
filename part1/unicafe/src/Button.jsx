const Button = ({ text, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${color}`}
    >
      {text}
    </button>
  );
};

export default Button;