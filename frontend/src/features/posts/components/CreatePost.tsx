import CreatePostForm from "./CreatePostForm";

type Props = {
  onClose: () => void;
}

const CreatePost = ({ onClose }: Props) => {

  return (
    <div className="
      w-full sm:w-[550px]
      p-4 mt-5
      bg-[rgba(0,65,109,0.5)]
      border border-white/20 rounded
    ">
      <h3 className="text-white font-semibold mb-7">Crear publicación</h3>
      <CreatePostForm onClose={onClose} />
    </div>
  );
}

export default CreatePost;