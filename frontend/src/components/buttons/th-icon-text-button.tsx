import { ThColorKey } from "@/utilities/th-color.ts";
import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"
import ThButton from "./th-button.tsx"

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
    <ThButton width={95} height={95} thColor={thColor} {...props} >
      <div className="flex flex-col gap-3 items-center justify-center mt-2">
        <ThIcon icon={icon} className={`${isLoading && "animate-th-spin"} w-7 h-7 text-${thColor}-100`} />
        <h5 className={`text-${thColor}-100 scale-110`}>{text}</h5>
      </div>
    </ThButton>
  );
}

export default ThIconTextButton;