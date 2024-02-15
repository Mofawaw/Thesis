import { ThStage } from '@/types/th-types.ts';
import categories from './categories';

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Wertetypen",
    color: "th-value",
    logo: "castle-value",
    stageLevels: [
      { levelId: "s1-l1", label: "1", order: 1, category: categories[0] },
      { levelId: "s1-l2", label: "2", order: 2, category: categories[0] },
      { levelId: "s1-lfinal", label: "Finale", order: 3, category: categories[2] }
    ]
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    logo: "castle-reference",
    stageLevels: [
      { levelId: "s2-l1", label: "4", order: 4, category: categories[0] },
      { levelId: "s2-l2", label: "5", order: 5, category: categories[1] },
      { levelId: "s2-lfinal", label: "Finale", order: 6, category: categories[1] }
    ]
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    logo: "castle-together",
    stageLevels: [
      { levelId: "s3-l1", label: "7", order: 7, category: categories[0] },
      { levelId: "s3-l2", label: "8", order: 8, category: categories[2] },
      { levelId: "s3-l3", label: "9", order: 9, category: categories[0] },
      { levelId: "s3-lfinal", label: "Finale", order: 10, category: categories[2] }
    ]
  }
];

export default stages;