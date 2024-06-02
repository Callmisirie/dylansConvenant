const Input = ({ type, value, placeholder, handleChange }) => {
  return (
    <input
      className="p-2.5 my-2
    border border-stroke-1 max-w-fit bg-transparent
    rounded-xl text-center font-code"
      type={type}
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default Input;
