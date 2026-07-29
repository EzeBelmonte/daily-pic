type Props = {
  error: string | null;
}
const AlertError = ({ error }: Props) => {
  if (!error) return null;

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