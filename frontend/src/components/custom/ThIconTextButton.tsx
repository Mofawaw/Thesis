import { ThColorKeys } from "../../../tailwind.config"
import { ThIconKey } from "../../assets/icons/icons.js"
import ThButton from "./ThButton"
import ThIcon from "./ThIcon.jsx"

interface ThIconTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKeys;
  icon: ThIconKey;
  text: string;
  isLoading?: boolean;
}

const ThIconTextButton: React.FC<ThIconTextButtonProps> = ({
  thColor,
  icon,
  text,
  isLoading,
  ...props
}) => {
  return (
    <ThButton width={100} height={100} thColor={thColor} {...props} >
      <div className="flex flex-col gap-3 items-center justify-center mt-2">
        <ThIcon icon={icon} className={`${isLoading && "animate-th-spin"} w-7 h-7 text-${thColor}-100`} />
        <h4 className={`text-${thColor}-100`}>{text}</h4>
      </div>
    </ThButton>
  );
}

export default ThIconTextButton;