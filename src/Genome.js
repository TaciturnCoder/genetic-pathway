import { immunize } from '../tokens.js';

/**
 * The Genome class implements a Proxy handler that uses genetic model that
 * allows access to genetic information of an object.
 */
export class Genome {
    /**
     * Creates an instance of Genome class.
     * @param {EventTarget} host - The host object that dispatches genetic events.
     * @param {string} geneticPath - The genetic path of the current `Genome` instance.
     */
    constructor(host, geneticPath = ':') {
        this.host = host;
        this.geneticPath = geneticPath;
    }

    /**
     * The `get` handler returns a target chromosome if it exists in the
     * genetic data, and sets up a new proxy if the chromosome is not immunized.
     * @param {Object} gene - Genetic data for the current `Genome` instance.
     * @param {*} target - The target chromosome to retrieve.
     * @returns {*} - The target chromosome if it exists in the genetic data.
     */
    get(gene, target) {
        if (target === immunize) {
            return true;
        } // immunize

        let chromosome = gene[target];

        if (chromosome === undefined || chromosome === null) {
            return chromosome;
        } // undefined or null

        if (typeof chromosome === 'object' && !chromosome[immunize]) {
            const host = this.host;
            const geneticPath = `${this.geneticPath}/${String(target)}`;
            const genome = new Genome(host, geneticPath);

            chromosome = new Proxy(chromosome, genome);
            gene[target] = chromosome;
        } // object

        if (typeof chromosome === 'function') {
            chromosome = chromosome.bind(gene);
        } // function

        return chromosome;
    } // get handler

    /**
     *
     * @param {Object} gene - Genetic data for the current `Genome` instance.
     * @param {*} target - The target chromosome to set.
     * @param {*} chromosome - The new of target chromosome to set.
     * @returns {boolean} `true` if the chromosome is set successfully.
     */
    set(gene, target, chromosome) {
        const mutant = gene[target];

        if (mutant === chromosome) {
            return true;
        } // no change

        gene[target] = chromosome;

        const host = this.host;
        const geneticPath = `${this.geneticPath}/${String(target)}`;
        const event = new CustomEvent(geneticPath, {
            detail: { mutant, chromosome }
        });
        host.dispatchEvent(event); // dispatchEvent

        return true;
    } // set handler
} // Genome
