import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "../hooks/useRegister";
import { registerSchema, type RegisterSchema } from "../schemas/auth.schema";
import { Input, Button, AlertError } from "@/components";

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

  const { registerUser, error } = useRegister();

  async function onSubmit(data: RegisterSchema) {
    await registerUser(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

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

      <AlertError error={error} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-[110px]
          border border-[#125c7a] 
          bg-[#3b8aaf] 
          text-white font-semibold 
          px-2 rounded
        "
      >
        Registrarse
      </Button>

    </form>
  );
}

export default RegisterForm;