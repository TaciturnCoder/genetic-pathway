# genetic-pathway [0.2.0]
👀 Subject-observer pattern using Proxy traps

# Installation

```sh
# Install from npm
npm i @dwijbavisi/genetic-pathway
```

# Usage

```js
// Import in your project
import { Genome } from '@dwijbavisi/genetic-pathway';

const host = document.createElement('div');
const genome = new Genome(host);
const gene = new Proxy({}, genome);

gene['name'] = {
    'first': 'Taciturn',
    'last': 'Coder'
}

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
