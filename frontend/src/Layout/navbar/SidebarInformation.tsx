import PublicationTimer from "./components/timer/PublicationTimer";

const SidebarInformation = () => {

  return (
    <div className="
      hidden tablet:flex
      w-full min-h-screen
      border-l border-white/20
      flex-col items-center
      p-2
    ">
      <PublicationTimer />
    </div>
  );
}

export default SidebarInformation;