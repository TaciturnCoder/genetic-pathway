# genetic-pathway [0.3.0]
👀 Subject-observer pattern using Proxy traps

# Installation

```sh
# Install from npm
npm i @dwijbavisi/genetic-pathway
```

```js
// Import in your project
import { tokens, Genome } from '@dwijbavisi/genetic-pathway';
```

# Usage

```js
// Import in your project
import { Genome } from '@dwijbavisi/genetic-pathway';

const host = document.createElement('div');
const genome = new Genome(host);
const gene = new Proxy({
    name: {
        first: 'Taciturn',
        last: 'Coder'
    }
}, genome);

host.addEventListener(':/name/first', (e) => {
    console.log('Property: :/name/first changed');
    console.log(e);
});
host.addEventListener(':/name/last', (e) => {
    console.log('Property: :/name/last changed');
    console.log(e);
});

gene.name.first = 'Dwij'; // Expected output: 'Property: :/name/first changed'
gene.name.last = 'Bavisi'; // Expected output: 'Property: :/name/last changed'
```

# Documentation
See [docs](https://TaciturnCoder.github.io/genetic-pathway/docs/)
for more information.

To generate documentation, `JSDoc` is used

```sh
npm run docs

# OR
jsdoc -c jsdoc.config.json -d docs/
```

# Testing

We use `eslint` to implement style checks

```sh
npm run lint

# OR
eslint index.js tokens.js src/**/*.js
```

And `Jest` framework is used for testing

```sh
npm test

# OR
NODE_OPTIONS=--experimental-vm-modules npx jest
```
