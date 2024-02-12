import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";
import ThButton from "./th-button.tsx"

interface ThTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey;
  textThColorShade?: ThColorShadeKey;
  gradient?: boolean;
  text: string;
}

const ThTextButton: React.FC<ThTextButtonProps> = ({
  width,
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  textThColorShade = 100,
  gradient = false,
  text,
  ...props
}) => {
  return (
    <ThButton width={width} height={40} thColor={thColor} bgThColorShade={bgThColorShade} shadowThColorShade={shadowThColorShade} gradient={gradient} {...props} >
      <h3 className={`text-${thColor}-${textThColorShade} p-4 scale-90`}>{text}</h3>
    </ThButton>
  )
}

export default ThTextButton;