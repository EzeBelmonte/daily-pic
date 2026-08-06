import EditPostForm from "../forms/EditPostForm";

type Props = {
  onClose: () => void;
}

export default function EditPost({ onClose }: Props) {

  return (
    <div className="
      w-full
      p-4 mt-5
      bg-[rgba(0,65,109,0.5)]
      border border-white/20 rounded
    ">

      <h3 className="text-white font-semibold mb-7">Crear publicación</h3>
      <EditPostForm onClose={onClose} />
      
    </div>
  );
}