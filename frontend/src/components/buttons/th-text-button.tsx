import { ThColorKey } from "@/utilities/th-color.ts";
import ThButton from "./th-button.tsx"

interface ThTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKey;
  text: string;
}

const ThTextButton: React.FC<ThTextButtonProps> = ({
  width,
  thColor,
  text,
  ...props
}) => {
  return (
    <ThButton width={width} height={45} thColor={thColor} {...props} >
      <h3 className={`text-${thColor}-100 p-4`}>{text}</h3>
    </ThButton>
  )
}

export default ThTextButton;