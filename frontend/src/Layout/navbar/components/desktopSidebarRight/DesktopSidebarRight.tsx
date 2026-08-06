import PublicationTimer from "./PublicationTimer";
import TopLiked from "./TopLiked";

const DesktopSidebarRight = () => {
  
  return (
    <div className="
      hidden 
      fixed
      top-0 right-0
      h-screen w-[300px]
      tablet:flex tablet:flex-col
      border-l border-[rgba(255,255,255,0.4)]
      p-2
      overflow-y-scroll
    ">
      <div>
        {/* Temporizador */}
        <PublicationTimer />

        {/* Top 3 */}
        <TopLiked />
      </div>
    </div>
  );
}

export default DesktopSidebarRight;