import ThStar from "../custom/ThStar";
import animal1 from "../../assets/images/animal-1.png";
import { useState } from "react";

export default function ThStarIconButton({ width, height, ...props }: { width: number, height: number, [key: string]: any }) {
  const [starCorners, setStarCorners] = useState<3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18>(4);

  const handleClick = () => {
    console.log("set")
    setStarCorners((prevStarCorners: any) => {
      return prevStarCorners === 18 ? 3 : prevStarCorners + 1
    })
  }

  return (
    <button
      style={{ width: `${width}px`, height: `${height}px` }}
      className={
        `relative w-56 h-56 z-50 drop-shadow-xl transition duration-150 ease-in-out
        hover:scale-110
        active:scale-95 active:translate-y-1 active:duration-100`
      }
      onClick={handleClick}
      {...props}
    >
      <div className="w-full h-full animate-th-spin-slow">
        <ThStar corners={starCorners} className="th-bg-gradient w-full h-full" />
      </div>
      <img src={animal1} className="absolute w-28 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" alt="Animal" />
    </button>
  )
}
