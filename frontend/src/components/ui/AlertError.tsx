type Props = {
  error: string | null;
};

const AlertError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <p className="text-sm text-red-500">
      {error}
    </p>
  );
};

export default AlertError;
