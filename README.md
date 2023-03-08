# genetic-pathway [0.1.0]
👀 Subject-observer pattern using Proxy traps

# Installation

```sh
# Install from npm
npm i @dwijbavisi/genetic-pathway
```

# Usage

```js
// Import in your project
import { Mutable } from '@DwijBavisi/genetic-pathway'

mutable = new Proxy({}, new Mutable(document));
mutable.name = {
    first: 'Taciturn',
    last: 'Coder'
}

document.addEventListener(':/name/first', (e) => {
    console.log('Property: :/name/first changed');
});
document.addEventListener(':/name/last', (e) => {
    console.log('Property: :/name/last changed');
});

mutable.name.first = 'Dwij';
// Expected output: 'Property: :/name/first changed'
mutable.name.last = 'Bavisi';
// Expected output: 'Property: :/name/last changed'
```
