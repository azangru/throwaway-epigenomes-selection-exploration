import EpigenomeSelectionDimension from '../epigenome-selection-dimension/EpigenomeSelectionDimension';

import type { MetadataDimensions } from '../../types/metadataDimensions';
import type { DimensionCounts } from '../../hooks/useDimensionCounts'

import styles from './EpigenomeSelectionDimensions.module.css';

type Props = {
  dimensions: MetadataDimensions;
  counts: DimensionCounts;
  onAddFilter: (filterName: string, filterValue: string) => void;
  onRemoveFilter: (filterName: string, filterValue: string) => void;
};

const EpigenomeSelectionDimensions = (props: Props) => {
  return (
    <div className={styles.container}>
      { Object.entries(props.dimensions).map(([ dimensionKey, dimensionValue ]) => (
        <EpigenomeSelectionDimension
          key={dimensionKey}
          dimensionId={dimensionKey}
          dimension={dimensionValue}
          counts={getCounts(props.counts, dimensionKey) ?? {}}
          onAddFilter={props.onAddFilter}
          onRemoveFilter={props.onRemoveFilter}
        />
      )) }
    </div>
  );
};

const getCounts = (counts: DimensionCounts, key: string) => {
  return counts[key];
};

export default EpigenomeSelectionDimensions;
