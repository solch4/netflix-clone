import { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { User } from "@prisma/client";

interface Props {
  movieId: string;
}

const FavoriteButton: React.FC<Props> = ({ movieId }: Props) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    if (currentUser) {
      let response;

      if (isFavorite) {
        response = await axios.delete<User>(`/api/favorite?movieId=${movieId}`);
      } else {
        response = await axios.post<User>("/api/favorite", { movieId });
      }

      const updatedFavoriteIds = response.data.favoriteIds;

      mutate({
        ...currentUser,
        favoriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    }
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button
      onClick={toggleFavorites}
      className="text-white cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon size={25} />
    </button>
  );
};

export default FavoriteButton;
