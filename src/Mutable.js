export const isMutable = Symbol.for('isMutable');
export const nonMutable = Symbol.for('isMutable');

export class Mutable {
    constructor(handle, genePath = ':') {
        return {
            get(target, gene) {
                if (gene === isMutable) {
                    return true;
                } // mutable
                const value = target[gene];
                if (typeof value === 'undefined' || value === null) {
                    return value;
                } // undefined or null
                if (typeof value === 'object' && !value[nonMutable]) {
                    target[gene] = new Proxy(
                        value,
                        new Mutable(handle, `${genePath}/${gene}`)
                    );
                } // object
                return target[gene];
            }, // get
            set(target, gene, value) {
                const old = target[gene];
                if (old === value) {
                    return true;
                } // no change
                target[gene] = value;
                handle.dispatchEvent(new CustomEvent(
                    `${genePath}/${gene}`,
                    { detail: { old, value } }
                )); // dispatchEvent
                return true;
            } // set
        }; // Handler
    } // constructor
} // Mutable
