export type Epigenome = {
  name: string;
  material: string;
  life_stage: string;
  age: string;
  age_unit: string | null;
  sex: string;
  term: string;
  organ_slims: string[];
  system_slims: string[];
  assays: string[];
  assay_types: string[];
  assay_target_types: string[];
  assay_targets: string[];
};
