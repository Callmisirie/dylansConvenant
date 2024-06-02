const TextArea = ({ type, value, setValue, placeholder }) => {
  return (
    <div
      className="flex flex-col justify-center items-center 
    rounded-lg w-full my-2"
    >
      <textarea
        className="gap-5 p-2.5 bg-transparent
        border border-stroke-1 text-sm w-full
        rounded-md text-center font-code"
        type={type}
        value={value.length <= 30 ? value : value.slice(0, 30)}
        onChange={(e) => {
          if (e.target.value.length <= 30) {
            setValue(e.target.value);
          }
        }}
        placeholder={placeholder}
      />
      <p
        className="font-montserrat text-xs
        leading-8"
      >
        Max char - {value.length}/30
      </p>
    </div>
  );
};

export default TextArea;
