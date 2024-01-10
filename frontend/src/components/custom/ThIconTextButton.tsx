import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"
import ThIcon, { ThIconsKey } from "./ThIcon.jsx"

export default function ThIconTextButton({ thColor, icon, text, isLoading, ...props }: { thColor: ThColorKeys, icon: ThIconsKey, text: string, isLoading?: boolean, [key: string]: any }) {
  return (
    <ThButton width={85} height={85} thColor={thColor} {...props} >
      <div className="flex flex-col gap-3 items-center justify-center mt-2">
        <ThIcon icon={icon} className={`${isLoading && "animate-th-spin"} w-7 h-7 text-${thColor}-100`} />
        <h5 className={`text-${thColor}-100`}>{text}</h5>
      </div>
    </ThButton>
  )
}