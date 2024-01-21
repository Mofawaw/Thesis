import { CastleValue, CastleReference, CastleTogether } from '@/assets/images/castles.tsx'
import { ThColorKey, ThColorShadeKey } from './th-color';
import { FlagReference, FlagTogether, FlagValue } from '@/assets/images/flags';

export type ThCastleKey = 'castle-value' | 'castle-reference' | 'castle-together';

interface ThCastleProps extends React.SVGProps<SVGSVGElement> {
  castle: ThCastleKey;
  grey?: boolean;
}

export const ThCastle: React.FC<ThCastleProps> = ({
  castle,
  grey = false,
  ...props
}) => {
  let CastleComponent;

  switch (castle) {
    case 'castle-value':
      CastleComponent = CastleValue;
      break;
    case 'castle-reference':
      CastleComponent = CastleReference;
      break;
    case 'castle-together':
      CastleComponent = CastleTogether;
      break;
    default:
      return null;
  }

  return <CastleComponent grey={grey} {...props} />;
};

interface ThCastleFlagProps extends React.SVGProps<SVGSVGElement> {
  castle: ThCastleKey;
};

export const ThCastleFlag: React.FC<ThCastleFlagProps> = ({
  castle,
  ...props
}) => {
  let FlagComponent;

  switch (castle) {
    case 'castle-value':
      FlagComponent = FlagValue;
      break;
    case 'castle-reference':
      FlagComponent = FlagReference;
      break;
    case 'castle-together':
      FlagComponent = FlagTogether;
      break;
    default:
      return null;
  }

  return <FlagComponent {...props} />;
}