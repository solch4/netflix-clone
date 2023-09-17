import { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useBillboard from "@/hooks/useBillboard";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id as string);
  }, [data?.id, openModal]);

  return (
    <div className="relative h-[56.25vw]">
      {data ? (
        <>
          <video
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted
            loop
            poster={data.thumbnailUrl}
            src={data.videoUrl}
          />
          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-white text-xl md:text-5xl lg:text-6xl font-bold h-full w-1/2 drop-shadow-xl">
              {data.title}
            </p>
            <p className="text-white text-[0.5rem] md:text-lg mt-3 md:mt-8 w-[90%] md:w-4/5 lg:w-1/2 drop-shadow-xl">
              {data.description}
            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              <PlayButton movieId={data.id} />
              <button
                className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
                onClick={handleOpenModal}
              >
                <AiOutlineInfoCircle className="mr-1" />
                More info
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Billboard;
