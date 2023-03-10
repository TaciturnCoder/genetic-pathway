import { mutable, immutable } from '../tokens.js';

export class Genome {
    constructor(host, geneticPath = ':') {
        return {
            get(gene, target) {
                if (target === mutable || target === immutable) {
                    return true;
                } // mutable

                const chromosome = gene[target];
                if (typeof chromosome === 'undefined' || chromosome === null) {
                    return chromosome;
                } // undefined or null

                if (typeof chromosome === 'object' && !chromosome[immutable]) {
                    gene[target] = new Proxy(
                        chromosome,
                        new Genome(host, `${geneticPath}/${String(target)}`)
                    );
                } // object

                return gene[target];
            },

            set(gene, target, chromosome) {
                const mutant = gene[target];

                if (mutant === chromosome) {
                    return true;
                } // no change

                gene[target] = chromosome;
                host.dispatchEvent(new CustomEvent(
                    `${geneticPath}/${String(target)}`,
                    { detail: { mutant, chromosome } }
                )); // dispatchEvent

                return true;
            }
        }; // Access Handler
    }
} // Genome
