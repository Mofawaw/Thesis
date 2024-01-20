import { useState } from "react";
import ThStar, { ThStarProps } from "../custom/th-star.tsx";
import animal from "@/assets/images/animal-1.png";

interface ThStarUserProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
}

const ThStarUser: React.FC<ThStarUserProps> = ({
  width,
  height,
  ...props
}) => {
  const [starCorners, setStarCorners] = useState<ThStarProps['corners']>(4);

  const handleClick = () => {
    setStarCorners(prevStarCorners => {
      const nextStarCorners = prevStarCorners === 24 ? 3 : (prevStarCorners + 1 as ThStarProps['corners']);
      return nextStarCorners;
    })
  }

  return (
    <button {...props}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={
        `relative w-56 h-56 z-50 drop-shadow-xl transition duration-150 ease-in-out
        hover:scale-110
        active:scale-95 active:duration-100`
      }
      onClick={handleClick}
    >
      <div className="w-full h-full animate-th-spin-slow">
        <ThStar corners={starCorners} className="th-bg-gradient w-full h-full" />
      </div>
      <img src={animal} className="absolute w-[40%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" alt="Animal" />
    </button>
  )
}

export default ThStarUser;