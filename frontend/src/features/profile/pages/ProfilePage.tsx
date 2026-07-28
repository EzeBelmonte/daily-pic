import { useParams } from "react-router-dom";

const ProfilePage = () => {

  const { username } = useParams();

  const style = "flex flex-col px-1 sm:px-2 md:px-3 lg:px-10";

  if (username) {
    return (
      <div className={style}>
      </div>
    );
  }

  return (
    <div className={style}>
    
    </div>
  );
}

export default ProfilePage;