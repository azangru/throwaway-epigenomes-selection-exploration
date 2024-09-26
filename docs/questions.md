## Combining the epigenomes
- How is the name of a combined epigenome generated?

## My comments about data

### Shape of data
- A bunch of epigenomes have the same name (see e.g. human "B cell (f)", "B cell (m)"); but you probably know this already
- The data describing different dimensions isn't uniform. For some dimensions, values are simple strings, for others they are dictionaries of shape `{ name: string, ontology: string }`; for others still, they are dictionaries of shape `{ name: string, ontology: string }`. Don't know if it's going to be a problem.
- I am not sure yet how `age` can work. In any case, the age value almost certainly shouldn't be a string if any maths operations on it are expected
- Another thing is that the keys of some of the dimensions in the dimensions file are different from the keys in the epigenome file — this is because in the dimensions payload a key would be in a singular form, and in the epigenome payload, it is in the plural form. Examples: assay_type/assay_types, assay_target/assay_targets, etc. These key names certainly make sense in each of the payload; but a mapping will be required. Not a big deal at all; but what this means is that we cannot assume automatic correspondence of key names between dimensions and epigenomes. I do not know what to advise here, because these key names make perfect sense within a given payload.
- Another minor annoyance for display purposes is the inconsistency in letter casing. For example, the values of the material dimension have words that are all capitalised ("Cell Line", "Primary Tissue", "Primary Cell Culture"), while other dimensions have their labels lower-cased.
- The "assays" field has specific base epigenome information; how can it function in the context of combined epigenomes?


## What's desired



## Questions
  - Checkboxes
    - AND or an OR operation

## Table with dimensions for epigenomes
  - Columns can be added/removed




```ts

import magicThing from 'reg-library'

const baseEpigenomes = fetch('/all_epigenomes');
const dimensions = fetch('/dimensions');


magicThing.init({
  baseEpigenomes,
  dimensions
});


magicThing.init({
  genomeId
});


magicThing.getDimensions() // <-- initial dimensions with counts
magicThing.getEpigenomes() // <-- get initial list of epigenomes (with default columns)


magicThing.addFilter("sex/female");
magicThing.getDimensions() // <-- initial dimensions with counts
magicThing.getEpigenomes() // <-- get initial list of epigenomes (with default columns)


magicThing.removeColumn("sex");


```
