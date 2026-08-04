import PublicationTimer from "./components/timer/PublicationTimer";

const SidebarInformation = () => {

  return (
    <div className="hidden tablet:flex">
      <div className="
        fixed
        top-0 right-0
        h-screen w-[300px]
        border-l border-[rgba(255,255,255,0.4)]
        p-2
      ">
        <PublicationTimer />
      </div>
    </div>
  );
}

export default SidebarInformation;