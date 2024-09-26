import EpigenomeSelectionDimensions from './components/epigenome-selection-dimensions/EpigenomeSelectionDimensions';
import Epigenomes from './components/epigenomes/Epigenomes';
import CombinedEpigenomes from './components/combined-epigenomes/CombinedEpigenomes';

import useDimensionCounts from './hooks/useDimensionCounts';
import useFilters from './hooks/useFilters';
import useCombinedEpigenomes from './hooks/useCombinedEpigenomes';

import epigenomeSelectionDimensions from '../data/GRCh38/dimensions.json';
import baseEpigenomes from '../data/GRCh38/base_epigenomes.json';

import styles from './App.module.css';

// import type { MetadataDimensions } from './types/metadataDimensions';

function App() {
  const { counts } = useDimensionCounts({ epigenomes: baseEpigenomes });
  const { filters, addFilter, removeFilter }  = useFilters();
  const { combinedEpigenomes } = useCombinedEpigenomes({ epigenomes: baseEpigenomes });

  return (
    <div className={styles.grid}>
      <EpigenomeSelectionDimensions
        dimensions={epigenomeSelectionDimensions}
        counts={counts}
        onAddFilter={addFilter}
        onRemoveFilter={removeFilter}
      />

      <div className={styles.epigenomesContainer}>
        <Epigenomes filters={filters} epigenomes={baseEpigenomes} />
      </div>
    </div>
  )
}

export default App
