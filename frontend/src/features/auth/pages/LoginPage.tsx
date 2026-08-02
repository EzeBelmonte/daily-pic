import { useNavigate } from "react-router-dom";

import Logo from "@/components/ui/Logo";

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
          className="w-[200px] sm:w-[250px] md:w-[300px]"
          centered
          textX={50}
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