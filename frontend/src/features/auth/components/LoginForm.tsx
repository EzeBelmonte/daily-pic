import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useLogin } from "@/app/hooks/mutations/useLogin";

import { loginSchema, type LoginSchema } from "@daily-pic/shared/schemas";
import { Input, Button, AlertError } from "@/components";

import { getErrorMessage } from "@/utils/getErrorMessage";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const navigate = useNavigate();

  async function onSubmit(data: LoginSchema) {
    await loginMutation.mutateAsync(data);

    navigate("/feed");
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

      <AlertError error={
        loginMutation.error
          ? getErrorMessage(loginMutation.error)
          : null
      } />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-[110px]
          border border-[#127a60] 
          bg-[#3baf92] 
          text-white font-semibold 
          py-1 rounded
        "
      >
        Ingresar
      </Button>

    </form>
  );
}

export default LoginForm;