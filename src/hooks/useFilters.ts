import { useState } from "react";

export type Filter = Record<string, string>;

const useFilters = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = (name: string, value: string) => {
    const filter = { [name]: value };
    setFilters([...filters, filter]);
  };

  const removeFilter = (name: string, value: string) => {
    const newFilters = filters.filter(item => {
      const [[itemKey, itemValue]] = Object.entries(item);
      return itemKey !== name || itemValue !== value;
    });
    setFilters(newFilters);
  };

  return {
    filters,
    areFiltersSet: filters.length > 0,
    addFilter,
    removeFilter
  }
};

export default useFilters;
