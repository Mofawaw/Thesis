import {
  PlusIcon,
  MinusIcon,
  FitIcon,
  TutorialIcon,
  TippsIcon,
  CheckIcon,
  RunIcon,
  ResetIcon,
  GenerateIcon,
  LevelsIcon,
  ExitIcon,
  BlankIcon,
  StarIcon
} from "@/assets/icons/icons.tsx";

export type ThIconKey = 'plus' | 'minus' | 'fit' | 'tutorial' | 'tipps' | 'check' | 'run' | 'reset' | 'generate' | 'levels' | 'exit' | 'blank' | 'star';

interface ThIconProps extends React.SVGProps<SVGSVGElement> {
  icon: ThIconKey;
}

export const ThIcon: React.FC<ThIconProps> = ({
  icon,
  ...props
}) => {
  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;

  switch (icon) {
    case 'plus':
      IconComponent = PlusIcon;
      break;
    case 'minus':
      IconComponent = MinusIcon;
      break;
    case 'fit':
      IconComponent = FitIcon;
      break;
    case 'tutorial':
      IconComponent = TutorialIcon;
      break;
    case 'tipps':
      IconComponent = TippsIcon;
      break;
    case 'check':
      IconComponent = CheckIcon;
      break;
    case 'run':
      IconComponent = RunIcon;
      break;
    case 'reset':
      IconComponent = ResetIcon;
      break;
    case 'generate':
      IconComponent = GenerateIcon;
      break;
    case 'levels':
      IconComponent = LevelsIcon;
      break;
    case 'exit':
      IconComponent = ExitIcon;
      break;
    case 'blank':
      IconComponent = BlankIcon;
      break;
    case 'star':
      IconComponent = StarIcon;
      break;
    default:
      return null;
  }

  return <IconComponent {...props} />;
};