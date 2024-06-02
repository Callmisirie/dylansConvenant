const Input = ({ type, value, placeholder, handleChange }) => {
  return (
    <>
      <input
        className="p-2.5 my-2
      border border-stroke-1 w-[16rem] bg-transparent
      rounded-xl text-center font-code"
        type={type}
        value={value.length <= 15 ? value : value.slice(0, 15)}
        onChange={(e) => {
          if (e.target.value.length <= 15) {
            handleChange(e.target.value);
          }
        }}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
