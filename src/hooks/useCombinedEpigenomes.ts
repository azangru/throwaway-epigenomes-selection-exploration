import { useState } from 'react';

import type { Epigenome } from '../types/epigenome';

const distinguishingFieldNames = [
  'age',
  'material',
  'life_stage',
  'sex',
  'term',
] as const;

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type CombinedEpigenome = PartiallyOptional<Epigenome, (typeof distinguishingFieldNames)[number]>;

type CombinedEpigenomesMap = Record<string, CombinedEpigenome>;

const useCombinedEpigenomes = ({
  epigenomes
}: {
  epigenomes: Epigenome[];
}) => {
  const [combiningDimensions, setCombiningDimensions] = useState<string[]>(['sex', 'age']);

  let combinedEpigenomes: CombinedEpigenome[] = [];

  const addCombiningDimension = (dimension: string) => {
    setCombiningDimensions([...combiningDimensions, dimension]);
  };

  if (combiningDimensions.length) {
    combinedEpigenomes = combineEpigenomes({ epigenomes, combiningDimensions });
  }

  return {
    combiningDimensions,
    addCombiningDimension,
    combinedEpigenomes
  }
};

const combineEpigenomes = ({
  epigenomes,
  combiningDimensions
}: {
  epigenomes: Epigenome[];
  combiningDimensions: string[];
}) => {
  const epigenomesMap: CombinedEpigenomesMap = {};

  for (const epigenome of epigenomes) {
    const keyArray: string[][] = [];
    for (const fieldName of distinguishingFieldNames) {
      if (!combiningDimensions.includes(fieldName)) {
        keyArray.push([fieldName, epigenome[fieldName]]);
      }
    }
    const epigenomesMapKey = keyArray.reduce((acc, keyval) => {
      const keyvalString = keyval.join(':');
      return !acc ? keyvalString : `${acc} ${keyvalString}`;
    }, '');
    const combinedEpigenome: CombinedEpigenome = structuredClone(epigenome);

    for (const dimension of combiningDimensions) {
      delete combinedEpigenome[dimension as keyof CombinedEpigenome];
    }

    const combinedEpigenomeName = `Combined epigenome: ${epigenome.term}, removed distinction by ${combiningDimensions.join(', ')}`;
    combinedEpigenome.name = combinedEpigenomeName;

    if (!epigenomesMap[epigenomesMapKey]) {
      epigenomesMap[epigenomesMapKey] = combinedEpigenome;
    }
  }

  return Object.values(epigenomesMap);
};

export default useCombinedEpigenomes;
