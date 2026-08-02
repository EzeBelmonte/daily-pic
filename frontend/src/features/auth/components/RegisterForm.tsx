import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { useRegister } from "../hooks/useRegister";
import { registerSchema, type RegisterSchema } from "../schemas/auth.schema";
import { Input, Button, AlertError } from "@/components";

import { getErrorMessage } from "@/utils/getErrorMessage";

const RegisterForm = () => {
  const {
    register, // Función que conecta un <input> con React Hook Form.
    handleSubmit,
    formState: {
      errors,
      isSubmitting, // Mientras el formulario está enviándose al backend: isSubmitting === true
    },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const navigate = useNavigate();

  async function onSubmit(data: RegisterSchema) {
    try {
      await registerMutation.mutateAsync(data);

      navigate("/login");
    } catch (error) {
      // No hacemos nada.
      // TanStack ya guardó el error en registerMutation.error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input 
        id="name"
        placeholder="Nombre/s"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input 
        id="lastname"
        placeholder="Apellido/s (Opcional)"
        error={errors.lastname?.message}
        {...register("lastname")}
      />

      <Input 
        id="email"
        placeholder="Correo electrónico"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input 
        id="username"
        placeholder="Usuario"
        error={errors.username?.message}
        {...register("username")}
      />

      <Input 
        id="password"
        placeholder="Contraseña"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input 
        id="repeatPassword"
        placeholder="Repetir la contraseña"
        type="password"
        error={errors.repeatPassword?.message}
        {...register("repeatPassword")}
      />

      {registerMutation.isError && (
        <AlertError
            error={getErrorMessage(registerMutation.error)}
        />
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-[110px]
          border border-[#125c7a] 
          bg-[#3b8aaf] 
          text-white font-semibold 
          px-2 py-1 rounded
        "
      >
        Registrarse
      </Button>

    </form>
  );
}

export default RegisterForm;