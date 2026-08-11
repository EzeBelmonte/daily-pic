import { useNavigate } from "react-router-dom";

import Logo from "@/components/branding/Logo";

import LoginForm from "../components/LoginForm";
import { Button } from "@/components";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="
      h-screen 
      flex flex-col
      justify-center items-center
    ">
      <div className="
        w-full 
        grid grid-cols-1
        p-3
        sm:grid-cols-2
        sm:items-center
      ">
  
          <Logo 
            className="w-full flex items-center justify-center"
            iconClassName="w-[90px] md:w-[120px] lg:w-[170px]"
            textClassName="text-white text-[3rem] md:text-[3.2rem] lg:text-[3.7rem]"
          />

        <div className="
          flex flex-col
          gap-3 px-5 mt-10
        ">
          <h2 className="
            hidden sm:block
            text-[1.5rem] 
            font-outfit font-semibold
            text-white
          ">
            Inicia sesión
          </h2>
          <LoginForm />

          <Button 
            type="button"
            className="text-blue-400"
            onClick={() => navigate("/register")}
          >
            ¿No tenés cuenta?
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;