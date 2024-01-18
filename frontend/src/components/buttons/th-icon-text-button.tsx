import { ThColorKey } from "@/utilities/th-color.js";
import { ThIcon, ThIconKey } from "@/utilities/th-icon.js"
import ThButton from "./th-button.js"

interface ThIconTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKey;
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