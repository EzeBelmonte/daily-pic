import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {

  return (
    <div className="flex flex-col items-center">
      <h1 className="titleSection mt-10">Registrate</h1>

      <div className="w-full px-5 mt-10">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;