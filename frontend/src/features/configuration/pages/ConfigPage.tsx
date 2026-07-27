import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@/app/hooks/useUser";

import {
  configSchema,
  type ConfigSchema,
} from "../schemas/config.schema";

import { cn } from "@/utils/cn";

import {
  Input,
  Textarea,
  Button,
  AlertError,
  Image,
  ImageUpload,
  ImagePreview,
} from "@/components";

const ConfigPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ConfigSchema>({
    resolver: zodResolver(configSchema),
  });

  const {
    completeUser,
    getUser,
    updateUser,
    error,
  } = useUser();

  // Estado de la privacidad
  const [privacy, setPrivacy] = useState(false);

  // Imagen seleccionada
  const [image, setImage] = useState<File | null>(null);

  // Obtener perfil al montar el componente
  useEffect(() => {
    getUser();
  }, [getUser]);

  // Cuando llega el perfil, rellenar el formulario
  useEffect(() => {
    if (!completeUser) return;

    reset({
      name: completeUser.name ?? "",
      lastname: completeUser.lastname ?? "",
      bio: completeUser.bio ?? "",
    });

    setPrivacy(completeUser.isPrivate);
  }, [completeUser, reset]);

  // Enviar formulario
  async function onSubmit(data: ConfigSchema) {
    data.isPrivate = privacy;

    await updateUser(image, data);
  }

  // Cambiar privacidad
  const handlePrivacy = () => {
    setPrivacy((prev) => !prev);
  };

  // Recién ahora hacemos el return condicional
  if (!completeUser) {
    return <p className="text-white">No existe el perfil</p>;
  }

  return (
    <section className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] flex flex-col gap-4 sm:w-[400px]"
      >
        {/* Imagen */}
        <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mx-auto">
          {!image ? (
            <Image
              src={completeUser.profileImageUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePreview
              file={image}
              setImage={setImage}
              className="w-full h-full"
              imageClassName="w-full h-full object-cover object-top"
              buttonClassName="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}

          {!image && (
            <ImageUpload
              onSelect={setImage}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>

        <Input
          id="nickname"
          placeholder="Nickname"
          type="text"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="nickname"
          placeholder="Nickname"
          type="text"
          error={errors.lastname?.message}
          {...register("lastname")}
        />

        <Textarea
          id="bio"
          placeholder="Biografía"
          error={errors.bio?.message}
          className="w-full sm:w-[400px] mx-auto mb-3"
          {...register("bio")}
        />

        <div className="text-white flex gap-3">
          <p>Privacidad</p>

          <Button
            type="button"
            onClick={handlePrivacy}
            className={cn(
              "w-[100px] rounded cursor-pointer transition-colors duration-200",
              privacy ? "bg-amber-600" : "bg-green-600"
            )}
          >
            {privacy ? "Privado" : "Público"}
          </Button>
        </div>

        <AlertError error={error} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            w-[110px]
            border border-[#125c7a]
            bg-[#3b8aaf]
            rounded
            text-white
            font-semibold
            px-2 mt-10
            cursor-pointer
          "
        >
          Actualizar
        </Button>
      </form>
    </section>
  );
};

export default ConfigPage;