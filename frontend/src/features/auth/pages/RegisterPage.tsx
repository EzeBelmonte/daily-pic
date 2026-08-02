import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {

  return (
    <div className="
      min-h-screen 
      flex flex-col
      justify-center items-center
    ">
      <div className="
        w-full 
        grid grid-cols-1
        p-3
        md:grid-cols-2
        md:items-center
      ">
        {/* Fomulario */}
        <div className="w-full px-5 md:px-10">
          <h2 className="
            text-[1.5rem] 
            font-outfit font-semibold
            text-white
            mb-5
          ">
            Registrate
          </h2>

          <RegisterForm />
        </div>

        {/* Nota */}
<div
  className="
    bg-yellow-400/20 rounded-2xl
    border border-yellow-300/50
    text-white
    space-y-3
    mt-10 md:mt-0
    p-5
  "
>
  <h2 className="font-semibold text-[1.2rem] mb-5">IMPORTANTE</h2>

  <p>
    · Se recomienda que la contraseña <span className="font-bold">no sea la misma</span> que utiliza en otras aplicaciones, redes sociales o plataformas.
  </p>

  <p>
    · Tanto el <span className="font-bold">nombre</span> como el <span className="font-bold">apellido</span> serán visibles para todas las personas que utilicen esta aplicación.
  </p>

  <p>
    · Toda imagen que publique será visible para todos los usuarios de la plataforma, a menos que configure su perfil como privado. En ese caso, solo sus contactos podrán verla.
  </p>

  <p>
    · Se recomienda publicar contenido con discreción. Cada usuario es responsable del contenido que comparte en la plataforma.
  </p>

  <p>
    · No publique contenido que infrinja la ley, vulnere derechos de terceros o incumpla las normas de la comunidad. El contenido que incumpla estas condiciones podrá ser eliminado y la cuenta podrá ser suspendida.
  </p>
</div>
      </div>
    </div>
  );
}

export default RegisterPage;