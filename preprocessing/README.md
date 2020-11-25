# Preprocessing

Follow theses steps to condense and merge source data files (`./data/global_exposure`) into a single data file.

## Setup

install required packages
```
npm i
```

## Preprocess

move and rename files into temporary folder
```
node move.js
```

condense and merge files into single file
```
node merge.js
```

remove temporary files
```
node clean.js
```