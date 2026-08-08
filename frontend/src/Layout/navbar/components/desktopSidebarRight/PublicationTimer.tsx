import { usePublicationStatus } from "@/features/posts/hooks/queries/usePublicationStatus";
import { usePublicationCountdown } from "@/features/posts/hooks/usePublicationCountdown";

import { formatCountdown } from "@/helpers/formatCountdown.helper";

const PublicationTimer = () => {
  const {
    data: publicationStatus,
  } = usePublicationStatus();

  const remaining = usePublicationCountdown(
    publicationStatus?.nextPublicationAt ?? null
  );

  return (
    <div className="
      flex flex-col
      items-center
      font-outfit
    ">
      <h2 className="
        text-white text-[1.4rem]
        font-semibold
      ">
        Tiempo para publicar:
      </h2>

      <div className="
        w-[270px]
        flex flex-col
        items-center justify-center
        bg-[#222222] rounded-2xl
        text-white
        p-2 mt-2
      ">
        {publicationStatus && !publicationStatus.canPublish ? (
          <p className="
            text-[2.8rem]
          ">
            {formatCountdown(remaining)}
          </p>
        ) : (
          <p className="text-[1.3rem]">Ya podes publicar</p>
        )}
      </div>
    </div>
  );
}

export default PublicationTimer;