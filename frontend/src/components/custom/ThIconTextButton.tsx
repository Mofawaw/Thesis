import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"
import ThIcon, { ThIconsKey } from "./ThIcon.jsx"

export default function ThIconTextButton({ thColor, icon, text, ...props }: { thColor: ThColorKeys, icon: ThIconsKey, text: string, [key: string]: any }) {
  return (
    <ThButton width={90} height={90} thColor={thColor} {...props} >
      <div className="flex flex-col gap-2 justify-center items-center">
        <ThIcon icon={icon} className={`w-7 h-7 text-${thColor}-100`} />
        <h4 className={`text-${thColor}-100`}>{text}</h4>
      </div>
    </ThButton>
  )
}