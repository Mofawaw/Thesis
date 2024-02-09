import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";
import ThButton from "./th-button.tsx"

interface ThMenuTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey;
  textThColorShade?: ThColorShadeKey;
  text: string;
}

const ThMenuTextButton: React.FC<ThMenuTextButtonProps> = ({
  width,
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  textThColorShade = 100,
  text,
  ...props
}) => {
  return (
    <ThButton width={width} height={30} thColor={thColor} bgThColorShade={bgThColorShade} shadowThColorShade={shadowThColorShade} {...props} >
      <h5 className={`text-${thColor}-${textThColorShade} p-4`}>{text}</h5>
    </ThButton>
  );
}

export default ThMenuTextButton;