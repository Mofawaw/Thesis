import { ThStage } from '@/types/th-types.ts';
import categories from './categories';

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Wertetypen",
    color: "th-value",
    logo: "castle-value",
    stageLevels: [
      { levelId: "s1-l1", order: 0, category: categories[0] },
      { levelId: "s1-l2", order: 1, category: categories[1] },
      { levelId: "s1-l3", order: 2, category: categories[2] },
      { levelId: "s1-l4", order: 3, category: categories[0] },
      { levelId: "s1-l5", order: 4, category: categories[0] },
      { levelId: "s1-l6", order: 5, category: categories[0] },
      { levelId: "s1-l7", order: 6, category: categories[0] },
      { levelId: "s1-lfinal", order: 7, category: categories[0] }
    ]
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    logo: "castle-reference",
    stageLevels: [
      { levelId: "s2-l1", order: 0, category: categories[0] },
      { levelId: "s2-l2", order: 1, category: categories[1] },
      { levelId: "s2-l3", order: 2, category: categories[2] },
      { levelId: "s2-l4", order: 3, category: categories[0] },
      { levelId: "s2-l5", order: 4, category: categories[0] },
      { levelId: "s2-l6", order: 5, category: categories[0] },
      { levelId: "s2-l7", order: 6, category: categories[0] },
      { levelId: "s2-l8", order: 7, category: categories[0] },
      { levelId: "s2-l9", order: 8, category: categories[0] },
      { levelId: "s2-lfinal", order: 9, category: categories[0] }
    ]
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    logo: "castle-together",
    stageLevels: [
      { levelId: "s3-l1", order: 0, category: categories[0] },
      { levelId: "s3-l2", order: 1, category: categories[1] },
      { levelId: "s3-l3", order: 2, category: categories[2] },
      { levelId: "s3-l4", order: 3, category: categories[0] },
      { levelId: "s3-l5", order: 4, category: categories[0] },
      { levelId: "s3-l6", order: 5, category: categories[0] },
      { levelId: "s3-l7", order: 6, category: categories[0] },
      { levelId: "s3-l8", order: 7, category: categories[0] },
      { levelId: "s3-l9", order: 8, category: categories[0] },
      { levelId: "s3-l10", order: 9, category: categories[0] },
      { levelId: "s3-l11", order: 10, category: categories[0] },
      { levelId: "s3-lfinal", order: 11, category: categories[0] }
    ]
  }
];

export default stages;