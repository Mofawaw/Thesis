import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"
import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";
import ThButton from "./th-button.tsx"
import { ThCastleFlag, ThCastleKey } from "@/utilities/th-castle.tsx";

interface ThRoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey;
  textThColorShade?: ThColorShadeKey;
  icon?: ThIconKey | ThCastleKey | null;
  text?: string | null;
  tooltipText?: string;
}

const ThRoundButton: React.FC<ThRoundButtonProps> = ({
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  textThColorShade = 40,
  icon = null,
  text = null,
  tooltipText = "",
  ...props
}) => {
  const flagIcon = icon as ThCastleKey;
  const thIcon = icon as ThIconKey

  return (
    <ThButton width={100} height={100} thColor={thColor} bgThColorShade={bgThColorShade} shadowThColorShade={shadowThColorShade} round={true} className="relative" {...props} >
      <div className="flex flex-col gap-3 items-center justify-center mt-2">
        {thIcon && <ThIcon icon={thIcon} className={`w-12 h-12 text-${thColor}-${textThColorShade}`} />}
        {flagIcon && <ThCastleFlag castle={flagIcon} className={`w-20 h-16 text-${thColor}-${textThColorShade}`} />}
        {text && <h2 className={`text-${thColor}-${textThColorShade}`}>{text}</h2>}
      </div>
    </ThButton>
  );
}

export default ThRoundButton;