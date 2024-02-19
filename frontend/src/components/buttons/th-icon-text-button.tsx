import { ThColorKey } from "@/utilities/th-color.ts";
import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"

import ThButton from "./th-button.tsx"

interface ThIconTextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  thColor: ThColorKey;
  icon: ThIconKey;
  text: string;
  isLoading?: boolean;
}

const ThIconTextButton: React.FC<ThIconTextButtonProps> = ({
  width,
  thColor,
  icon,
  text,
  isLoading,
  ...props
}) => {
  return (
    <ThButton width={width} height={45} thColor={thColor} {...props} >
      <div className="flex flex-row gap-3 items-center justify-center">
        <ThIcon icon={icon} className={`${isLoading && "animate-th-spin"} w-5 h-5 text-${thColor}-100`} />
        <h5 className={`text-${thColor}-100 scale-110`}>{text}</h5>
      </div>
    </ThButton>
  );
}

export default ThIconTextButton;