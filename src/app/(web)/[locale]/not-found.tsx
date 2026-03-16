import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <Image
        src="/error-pokemon.png"
        alt="Not Found"
        width={200}
        height={200}
      />
      <h1>Not Found</h1>
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
