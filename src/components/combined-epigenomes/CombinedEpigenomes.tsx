import type { CombinedEpigenome as CombinedEpigenomeType } from '../../hooks/useCombinedEpigenomes';

const CombinedEpigenomes = (props: {
  epigenomes: CombinedEpigenomeType[];
}) => {
  return (
    <div>
      {props.epigenomes.map((epigenome, index) => (
        <CombinedEpigenome
          key={`${epigenome.name} - ${index}`}
          epigenome={epigenome}
        />
      ))}
    </div>
  )
};

const CombinedEpigenome = (props: { epigenome: CombinedEpigenomeType }) => {
  const { epigenome } = props;

  const dataString = `
    age: ${epigenome.age ?? 'combined'},
    sex: ${epigenome.sex ?? 'combined'},
    life stage: ${epigenome.life_stage ?? 'combined'}
  `;

  return (
    <div title={dataString}>
      { epigenome.name }
    </div>
  );
};

export default CombinedEpigenomes;
