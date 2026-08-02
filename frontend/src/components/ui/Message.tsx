type Props = {
  error: string | null;
}
const Message = ({ error }: Props) => {
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

export default Message;