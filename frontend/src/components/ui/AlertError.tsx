type AlertProps = {
  error: string | null;
}
const AlertError = ({ error }: AlertProps) => {

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </>
  );
}

export default AlertError;