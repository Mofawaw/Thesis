import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"

export default function ThTextButton({ width, thColor, text, ...props }: { width: number, thColor: ThColorKeys, text: string, [key: string]: any }) {
  return (
    <ThButton width={width} height={45} thColor={thColor} {...props} >
      <h3 className={`text-${thColor}-100 p-4`}>{text}</h3>
    </ThButton>
  )
}