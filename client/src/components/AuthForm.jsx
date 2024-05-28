import { form } from "../constants";
import Input from "./Input";
import { useState } from "react";

const AuthForm = ({type}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    // setIsDisabled(true);
    console.log({email, password});
  };

  return (
    <div className="flex">
      {form.map((item) => (
        item.title === type ? (
          <div
            key={item.id}
            className="w-[19rem] max-lg:w-full
            h-full px-6 bg-n-8 border border-n-6 rounded-[2rem]
            lg:w-auto py-8 my-4 text-color-1 "
          >
            <h4 className="h4 mb-4 text-center">{item.title}</h4>
            <div className="h-auto mb-6">
              <ul>
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start py-5 border-t border-n-6"
                  >
                    <Input 
                    type={feature === "Email" ? "text" : (showPassword ? 'text' : 'password')} 
                    handleChange={feature === "Email" ? setEmail : setPassword}
                    name={feature}
                    placeholder={feature}
                    >
                  </Input>
                  </li>
                ))}
              </ul>
            </div> 
            <div className="flex flex-col items-center">
              <p className="font-montserrat font-semibold
              text-slate-gray mb-5
              text-sm cursor-pointer"
              onClick={togglePasswordVisibility}>
              {!showPassword ? "Show Password" : "Hide Password"}
              </p>
              <button className="px-8 py-4 border flex
              font-montserrat text-lg leading-none bg-black
              rounded-full text-white border-stroke-1"
              disabled={isDisabled}
              onClick={handleSubmit}>
                  {type}
              </button>
            </div>
          </div>          
        ) : null
      ))}
    </div>
  );
};

export default AuthForm;
