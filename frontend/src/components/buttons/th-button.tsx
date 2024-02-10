import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";
import styles from './th-button.module.css';

interface ThButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  width: number;
  height: number;
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey;
  gradient?: boolean;
  round?: boolean;
  shadow?: boolean;
  tooltipText?: string;
}

const ThButton: React.FC<ThButtonProps> = ({
  children = <></>,
  width,
  height,
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  gradient = false,
  round = false,
  shadow = true,
  tooltipText = "",
  ...props
}) => {
  return (
    <button
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`relative inline-block p-0 border-0 bg-transparent mb-[6px] ${styles.thButton}`}
      {...props}
    >
      {/* Tooltip Container */}
      {tooltipText &&
        <span className={`absolute bottom-full w-auto py-2 px-3 -mb-4 ${styles.tooltip}`}>
          <h4 className="text-th-tint-100">{tooltipText}</h4>
        </span>
      }

      {/* Button Content */}
      <span
        className={`
          block ${gradient ? "th-bg-gradient" : `bg-${thColor}-${bgThColorShade}`} ${round ? "rounded-full" : "rounded-th"} w-full h-full relative z-20 flex justify-center items-center transition duration-150 ease-in-out 
          hover:-translate-y-1
          active:scale-95 active:translate-y-1 active:duration-100`
        }>
        {children}
      </span>

      {/* Button Shadow */}
      {shadow &&
        <span
          style={{ width: `${width - 10}px`, height: `${height - 10}px` }}
          className={`block bg-${thColor}-${shadowThColorShade} ${round ? "rounded-full" : "rounded-th"} absolute bottom-[-6px] left-[5px] z-10`}>
        </span>
      }
    </button>
  );
}

export default ThButton;