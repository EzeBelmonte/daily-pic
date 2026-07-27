import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { Button } from "@/components";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <h1 className="titleSection mt-10">Ingresar</h1>

      <div className="w-full flex flex-col gap-5 px-5 mt-10">
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
  );
}

export default LoginPage;