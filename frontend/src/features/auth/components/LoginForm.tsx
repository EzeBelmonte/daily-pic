import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../hooks/useLogin";
import { loginSchama, type LoginSchema } from "../schemas/auth.schema";
import { Input, Button, AlertError } from "@/components";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchama),
  });

  const { loginUser, error } = useLogin();

  async function onSubmit(data: LoginSchema) {
    await loginUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

      <Input 
        id="identifier"
        placeholder="Usuario o correo electrónico"
        error={errors.identifier?.message}
        {...register("identifier")}
      />

      <Input 
        id="password"
        placeholder="Contraseña"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <AlertError error={error} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-[110px]
          border border-[#127a60] 
          bg-[#3baf92] 
          text-white font-semibold 
          px-2 rounded
        "
      >
        Ingresar
      </Button>

    </form>
  );
}

export default LoginForm;