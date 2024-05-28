import Section from "./Section"
import { LeftLine, RightLine } from "./design/Pricing";
import AuthForm from "./AuthForm";

const NewAccount = () => {
  return (
    <Section crosses className="overflow-hidden" id="/signups" customPaddings="py-5">      
      <div className="container relative z-2 flex justify-center">
        <div className="relative">
          <AuthForm type="Register"/>
          <LeftLine />
          <RightLine />
        </div>
      </div>
    </Section>
  )
}

export default NewAccount;