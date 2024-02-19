import { ThStage } from '@/types/th-types.ts';

import categories from './categories';

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Werte",
    color: "th-value",
    logo: "castle-value",
    stageLevels: [
      { levelId: "s1-l1", label: "1", order: 1, category: categories[0] },
      { levelId: "s1-l2", label: "2", order: 2, category: categories[2] },
      { levelId: "s1-l3", label: "3", order: 3, category: categories[2] },
      { levelId: "s1-lfinal", label: "Finale", order: 4, category: categories[1] }
    ]
  },
  {
    id: "s2",
    label: "Referenzen",
    color: "th-reference",
    logo: "castle-reference",
    stageLevels: [
      { levelId: "s2-l1", label: "5", order: 5, category: categories[0] },
      { levelId: "s2-l2", label: "6", order: 6, category: categories[1] },
      { levelId: "s2-l3", label: "7", order: 7, category: categories[1] },
      { levelId: "s2-lfinal", label: "Finale", order: 8, category: categories[2] },
    ]
  },
  {
    id: "s3",
    label: "Zusammen",
    color: "th-together",
    logo: "castle-together",
    stageLevels: [
      { levelId: "s3-l1", label: "9", order: 9, category: categories[0] },
      { levelId: "s3-l2", label: "10", order: 10, category: categories[1] },
      { levelId: "s3-l3", label: "11", order: 11, category: categories[1] },
      { levelId: "s3-lfinal", label: "Finale", order: 12, category: categories[2] },
    ]
  }
];

export default stages;