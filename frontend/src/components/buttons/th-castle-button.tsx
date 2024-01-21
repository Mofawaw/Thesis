import { ThCastleKey } from "@/utilities/th-castle.tsx";
import { ThCastle } from "@/utilities/th-castle.tsx";

interface ThCastleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  castle: ThCastleKey;
  grey?: boolean;
}

const ThCastleButton: React.FC<ThCastleButtonProps> = ({
  castle,
  grey = false,
  ...props
}) => {
  return (
    <button {...props} className={`
      relative w-56 h-56 z-50 transition duration-150 ease-in-out
      hover:scale-110
      active:scale-95 active:duration-100
    `}>
      <ThCastle castle={castle} grey={grey} className="w-full h-full" />
    </button>
  )
}

export default ThCastleButton;