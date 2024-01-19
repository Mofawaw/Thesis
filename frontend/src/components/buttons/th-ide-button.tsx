import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"
import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";

interface ThIDEButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKey;
  thColorShade: ThColorShadeKey;
  icon: ThIconKey;
}

const ThIDEButton: React.FC<ThIDEButtonProps> = ({
  thColor,
  thColorShade,
  icon,
  ...props
}) => {
  return (
    <button {...props} className={`
      h-7 w-7 transition duration-150 ease-in-out 
      hover:scale-110
      active:scale-95 active:duration-100
    `}>
      <ThIcon icon={icon} className={`h-7 w-7 text-${thColor}-${thColorShade}`} />
    </button>
  );
}

export default ThIDEButton;