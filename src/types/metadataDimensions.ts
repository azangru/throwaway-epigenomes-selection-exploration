type AgeDimension = {
  name: string;
  values: {
    unit: string;
    max_value: string;
    min_value: string;
  }[];
};

type SexDimension = {
  name: string;
  values: string[];
};

type TermDimension = {
  name: string;
  values: {
    name: string;
    ontology: string;
  }[];
};

type MaterialDimension = {
  name: string;
  values: string[];
};

type LifeStageDimension = {
  name: string;
  values: string[];
};

type OrganDimension = {
  name: string;
  values: {
    name: string;
    terms: string[];
    ontology: string;
  }[];
};

type OrgansSystemDimension = {
  name: string;
  values: {
    name: string;
    terms: string[];
    ontology: string;
  }[];
};

type AssayTypeDimension = {
  name: string;
  values: string[];
};

type AssayTargetDimension = {
  name: string;
  values: string[];
};

type AssayTargetTypeDimension = {
  name: string;
  values: string[];
};

export type MetadataDimensions = {
  age: AgeDimension;
  sex: SexDimension;
  term: TermDimension;
  material: MaterialDimension;
  life_stage: LifeStageDimension;
  organ_slims: OrganDimension;
  system_slims: OrgansSystemDimension;
  assay_type: AssayTypeDimension;
  assay_target: AssayTargetDimension;
  assay_target_type: AssayTargetTypeDimension;
}
