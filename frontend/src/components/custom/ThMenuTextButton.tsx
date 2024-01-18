import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"

interface ThMenuTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKeys;
  text: string;
}

const ThMenuTextButton: React.FC<ThMenuTextButtonProps> = ({
  width,
  thColor,
  text,
  ...props
}) => {
  return (
    <ThButton width={width} height={30} thColor={thColor} {...props} >
      <h5 className={`text-${thColor}-100 p-4`}>{text}</h5>
    </ThButton>
  );
}

export default ThMenuTextButton;