import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"
import ThIcon, { ThIconsKey } from "./ThIcon.jsx"

export default function ThIconButton({ thColor, icon, ...props }: { thColor: ThColorKeys, icon: ThIconsKey, [key: string]: any }) {
  return (
    <ThButton width={45} height={45} thColor={thColor} {...props} >
      <ThIcon icon={icon} className={`w-5 h-5 text-${thColor}-100`} />
    </ThButton>
  )
}