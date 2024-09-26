import type { Epigenome } from '../../types/epigenome';
import type { Filter as EpigenomeFilter } from '../../hooks/useFilters';

type Props = {
  epigenomes: Epigenome[];
  filters: EpigenomeFilter[];
};

const Epigenomes = (props: Props) => {
  const { filters } = props;
  let epigenomes = props.epigenomes;

  const areFiltersSet = filters.length > 0;

  if (areFiltersSet) {
    const filteredEpigenomes = getFilteredEpigenomes({
      epigenomes,
      filters
    });
    epigenomes = filteredEpigenomes;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Term</th>
            <th>Age</th>
            <th>Sex</th>
          </tr>
        </thead>
        <tbody>
        { epigenomes.map((epigenome) => (
            <tr>
              <td>
                { epigenome.name }
              </td>
              <td>
                { epigenome.term }
              </td>
              <td>
                { epigenome.age }
              </td>
              <td>
                { epigenome.sex }
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

const getFilteredEpigenomes = ({
  epigenomes,
  filters
}: Props) => {
  const filteredEpigenomes: Props['epigenomes'] = [];

  for (const epigenome of epigenomes) {

    for (const filter of filters) {
      const [[key, value]] = Object.entries(filter);
      const epigenomeValue = epigenome[key as keyof Epigenome];

      if (Array.isArray(epigenomeValue)) {
        const hasValueInArray = Boolean(epigenomeValue.find(item => item === value));
        if (hasValueInArray) {
          filteredEpigenomes.push(epigenome);
          break;
        }
      } else if (epigenome[key as keyof Epigenome] === value) {
        filteredEpigenomes.push(epigenome);
        break;
      }
    }
  }

  return filteredEpigenomes;
}

export default Epigenomes;
