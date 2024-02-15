import { ThCastleKey } from "@/utilities/th-castle.tsx";
import { ThCastle } from "@/utilities/th-castle.tsx";

interface ThCastleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  castle: ThCastleKey;
  color?: "stage" | "grey" | "tint" | "tint-grey";
}

const ThCastleButton: React.FC<ThCastleButtonProps> = ({
  castle,
  color = "stage",
  ...props
}) => {
  return (
    <button {...props} className={`
      relative w-48 h-48 z-50 transition duration-150 ease-in-out
      hover:scale-110
      active:scale-95 active:duration-100
    `}>
      <ThCastle castle={castle} color={color} className="w-full h-full" />
    </button>
  )
}

export default ThCastleButton;