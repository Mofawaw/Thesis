import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";
import ThButton from "./th-button.tsx"

interface ThTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey;
  textThColorShade?: ThColorShadeKey;
  text: string;
}

const ThTextButton: React.FC<ThTextButtonProps> = ({
  width,
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  textThColorShade = 100,
  text,
  ...props
}) => {
  return (
    <ThButton width={width} height={45} thColor={thColor} bgThColorShade={bgThColorShade} shadowThColorShade={shadowThColorShade} {...props} >
      <h3 className={`text-${thColor}-${textThColorShade} p-4`}>{text}</h3>
    </ThButton>
  )
}

export default ThTextButton;