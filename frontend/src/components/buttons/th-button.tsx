import { ThColorKey, ThColorShadeKey } from "@/utilities/th-color.ts";

interface ThButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  width: number;
  height: number;
  thColor: ThColorKey;
  bgThColorShade?: ThColorShadeKey;
  shadowThColorShade?: ThColorShadeKey
  round?: boolean;
}

const ThButton: React.FC<ThButtonProps> = ({
  children = <></>,
  width,
  height,
  thColor,
  bgThColorShade = 20,
  shadowThColorShade = 30,
  round = false,
  ...props
}) => {
  return (
    <button
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`relative inline-block p-0 border-0 bg-transparent mb-[6px]`}
      {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
    >
      <span
        className={`
          block bg-${thColor}-${bgThColorShade} ${round ? "rounded-full" : "rounded-th"} w-full h-full relative z-20 flex justify-center items-center transition duration-150 ease-in-out 
          hover:-translate-y-1
          active:scale-95 active:translate-y-1 active:duration-100`
        }>
        {children}
      </span>
      <span
        style={{ width: `${width - 10}px`, height: `${height - 10}px` }}
        className={`block bg-${thColor}-${shadowThColorShade} ${round ? "rounded-full" : "rounded-th"} absolute bottom-[-6px] left-[5px] z-10`}>
      </span>
    </button>
  );
}

export default ThButton;