import React from "react";
import { isEmpty } from "lodash";
import { Movie } from "@prisma/client";
import MovieCard from "./MovieCard";

interface Props {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<Props> = ({ data, title }: Props) => {
  if (isEmpty(data)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
