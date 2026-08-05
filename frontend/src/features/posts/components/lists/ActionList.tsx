import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";

type Props = {
  onClose: () => void;
}

const ActionList = ({ 
  onClose,
}: Props) => {

  return (
   <div 
      onClick={onClose}
      className="
        flex flex-col 
        px-3 py-2 gap-2
        bg-[#202020] rounded
        border border-white/10
      "
    >
      <EditButton />
      <DeleteButton />
    </div>
  );
}

export default ActionList;