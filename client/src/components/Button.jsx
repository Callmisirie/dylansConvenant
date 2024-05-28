import ButtonSvg from "../assets/svg/ButtonSvg";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const Button = ({ className, href, onClick, children, px, white }) => {
  const { hash } = useLocation();
  const LinkType = hash ? HashLink : Link;

  const classes = `button relative inline-flex 
  items-center justify-center h-11 transition-colors 
  hover:text-color-1 ${px || "px-7"} ${white ? "text-n-8" : "text-n-1"} ${
    className || ""
  }`;

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => {
    
    return (
      <LinkType to={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </LinkType>      
    )
  };
  return href ? renderLink() : renderButton();
};

export default Button;
