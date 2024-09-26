import type { Epigenome } from '../types/epigenome';

const countableDimensions = [
  'material',
  'life_stage',
  'sex',
  'term',
  'organ_slims',
  'system_slims',
  'assay_types',
  'assay_target_types',
  'assay_targets'
] as const;
const countableDimensionsSet = new Set(countableDimensions);

type CountableDimension = (typeof countableDimensions)[number]

export type DimensionCounts = Record<
  string,
  Record<string, number>
>;

const useDimensionCounts = ({
  epigenomes
}: {
  epigenomes: Epigenome[];
}) => {
  const counts: DimensionCounts = {};

  for (const epigenome of epigenomes) {
    const epigenomeDimensions = Object.keys(epigenome)
      .filter(key => (countableDimensionsSet as Set<string>).has(key)) as CountableDimension[];
    for (const dimension of epigenomeDimensions) {
      const value = epigenome[dimension];
      const dimensionValueCounts = counts[dimension] ?? {};
      if (typeof value === 'string') {
        if (!dimensionValueCounts[value]) {
          dimensionValueCounts[value] = 1;  
        } else {
          dimensionValueCounts[value] += 1;
        }
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (!dimensionValueCounts[item]) {
            dimensionValueCounts[item] = 1;  
          } else {
            dimensionValueCounts[item] += 1;
          } 
        }
      }
      counts[dimension] = dimensionValueCounts;
    }
  }

  return {
    counts
  }
};

export default useDimensionCounts;
