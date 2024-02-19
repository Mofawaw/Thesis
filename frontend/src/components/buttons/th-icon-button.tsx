import { ThIcon, ThIconKey } from "@/utilities/th-icon.tsx"
import { ThColorKey } from "@/utilities/th-color.ts";

import ThButton from "./th-button.tsx"

interface ThIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  thColor: ThColorKey;
  icon: ThIconKey;
}

const ThIconButton: React.FC<ThIconButtonProps> = ({
  thColor,
  icon,
  ...props
}) => {
  return (
    <ThButton width={45} height={45} thColor={thColor} {...props} >
      <ThIcon icon={icon} className={`w-5 h-5 text-${thColor}-100`} />
    </ThButton>
  );
}

export default ThIconButton;