import { immunize } from '../tokens.js';
import { Genome } from './Genome.js';

const host = document.createElement('div');
const genome = new Genome(host);

async function hybernate(ms = 1000) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

test('Genome class', () => {
    expect(Genome).toBeInstanceOf(Function);
    expect(genome).toBeInstanceOf(Genome);

    const gene = new Proxy({}, genome);
    expect(gene[immunize]).toBe(true);
});

test('Undefined and null handling', () => {
    const gene = new Proxy({
        isNull: null
    }, genome);

    expect(gene.isUndefined).toBe(undefined);
    expect(gene.isNull).toBe(null);
});

test('Event trigger', async () => {
    const gene = new Proxy({
        fn: function () {
            this.dispatched = true;
        },
        dispatched: false,
        immune: {
            [immunize]: true,
            str: 'Hello, World!'
        }
    }, genome);

    host.addEventListener(':/immune/str', () => {
        gene.fn();
    });

    expect(gene.immune.str).toBe('Hello, World!');

    gene.immune.str = 'Hello, Universe!';
    expect(gene.immune.str).toBe('Hello, Universe!');
    await hybernate();
    expect(gene.dispatched).toBe(false);

    gene.immune[immunize] = false;
    gene.immune.str = 'Hello, World!';
    expect(gene.immune.str).toBe('Hello, World!');
    await hybernate();
    expect(gene.dispatched).toBe(true);

    gene.dispatched = false;
    gene.immune.str = 'Hello, World!';
    await hybernate();
    expect(gene.dispatched).toBe(false);
});
