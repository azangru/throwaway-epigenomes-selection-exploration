import type { ChangeEvent } from 'react';

import type { MetadataDimensions } from '../../types/metadataDimensions';
import type { DimensionCounts } from '../../hooks/useDimensionCounts'

import styles from './EpigenomeSelectionDimension.module.css';

type Dimension = MetadataDimensions[keyof MetadataDimensions];

type Props = {
  dimensionId: string;
  dimension: Dimension;
  counts: DimensionCounts[string];
  onAddFilter: (filterName: string, filterValue: string) => void;
  onRemoveFilter: (filterName: string, filterValue: string) => void;
};

const EpigenomeSelectionDimension = (props: Props) => {
  const { dimensionId, dimension, counts } = props;

  return (
    <div>
      <div>{ dimension.name }</div>
      <div className={styles.valuesContainer}>
        { dimension.values.map((value, index) => (
          <DimensionValue
            key={typeof value === 'string' ? value : 'name' in value ? value.name : index}
            name={dimensionId}
            value={value}
            counts={counts}
            onAddFilter={props.onAddFilter}
            onRemoveFilter={props.onRemoveFilter}
          />
        )) }
      </div>
    </div>
  );

};

const DimensionValue = (props: {
  name: string;
  value: Dimension['values'][0];
  counts: DimensionCounts[string];
  onAddFilter: Props['onAddFilter'];
  onRemoveFilter: Props['onRemoveFilter'];
}) => {
  const { value, counts } = props;

  const onCheckboxChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const isChecked = input.checked;
    const dimensionName = props.name;
    const dimensionValue = input.dataset.value as string;

    if (isChecked) {
      props.onAddFilter(dimensionName, dimensionValue);
    } else {
      props.onRemoveFilter(dimensionName, dimensionValue);
    }
  }

  if (typeof value === 'string') {
    const count = counts[value] ?? 0;

    return (
      <div>
        <label>
          <input type="checkbox" data-value={value} onChange={onCheckboxChanged} />

          {value}{' - '}{count}
        </label>
      </div>
    )
  } else if ('name' in value) {
    const count = counts[value.name] ?? 0;

    return (
      <div>
        <label>
          <input type="checkbox" data-value={value.name} onChange={onCheckboxChanged} />

          {value.name}{' - '}{count}
        </label>
      </div>
    )
  } else {
    return null;
  }
};

export default EpigenomeSelectionDimension;
