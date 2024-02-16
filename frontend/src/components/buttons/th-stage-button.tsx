import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"
import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";

interface ThStageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKey;
  thColorShade: ThColorShadeKey;
  icon: ThIconKey;
}

const ThStageButton: React.FC<ThStageButtonProps> = ({
  thColor,
  thColorShade,
  icon,
  ...props
}) => {
  return (
    <button {...props} className={`
      h-20 w-20 transition duration-150 ease-in-out rotate-12
      hover:scale-110
      active:scale-95 active:duration-100
    `}>
      <ThIcon icon={icon} className={`h-20 w-20 text-${thColor}-${thColorShade}`} />
    </button>
  );
}

export default ThStageButton;