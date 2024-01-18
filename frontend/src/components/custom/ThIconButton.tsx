import { ThColorKeys } from "../../../tailwind.config"
import { ThIconKey } from "../../assets/icons/icons.js"
import ThButton from "./ThButton"
import ThIcon from "./ThIcon.jsx"

interface ThIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKeys;
  icon: ThIconKey;
}

const ThIconButton: React.FC<ThIconButtonProps> = ({
  thColor,
  icon,
  ...props
}) => {
  return (
    <ThButton width={50} height={50} thColor={thColor} {...props} >
      <ThIcon icon={icon} className={`w-5 h-5 text-${thColor}-100`} />
    </ThButton>
  );
}

export default ThIconButton;