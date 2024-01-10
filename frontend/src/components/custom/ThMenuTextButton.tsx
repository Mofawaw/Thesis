import { ThColorKeys } from "../../../tailwind.config"
import ThButton from "./ThButton"

export default function ThMenuTextButton({ width, thColor, text, ...props }: { width: number, thColor: ThColorKeys, text: string, [key: string]: any }) {
  return (
    <ThButton width={width} height={30} thColor={thColor} {...props} >
      <h5 className={`text-${thColor}-100 p-4`}>{text}</h5>
    </ThButton>
  )
}