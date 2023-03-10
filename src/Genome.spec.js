import { mutable, immutable } from '../tokens.js';
import { Genome } from './Genome.js';

async function sleep(ms = 1000) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

test('Tokens', () => {
    expect(mutable).toEqual(Symbol.for('mutable'));
    expect(immutable).toEqual(Symbol.for('immutable'));
});

test('Genome and mutability', () => {
    const host = document.createElement('div');
    const genome = new Genome(host);
    const gene = new Proxy({}, genome);

    expect(genome).toBeInstanceOf(Object);
    expect(gene[mutable]).toBe(true);
    expect(gene[immutable]).toBe(true);
});

test('undefined and null', () => {
    const host = document.createElement('div');
    const genome = new Genome(host);
    const gene = new Proxy({}, genome);

    gene['T'] = null;

    expect(gene['A']).toBe(undefined);
    expect(gene['T']).toBe(null);
});

test('getter and setter', () => {
    const host = document.createElement('div');
    const genome = new Genome(host);
    const gene = new Proxy({}, genome);

    gene['A'] = 'T';
    expect(gene['A']).toBe('T');

    gene['A'] = 'C';
    expect(gene['A']).toBe('C');
});

test('Immutable chromosomes', () => {
    const host = document.createElement('div');
    const genome = new Genome(host);
    const gene = new Proxy({}, genome);

    gene['A'] = {
        [immutable]: true,
        T: 'C'
    };
    expect(gene['A']['T']).toBe('C');
    expect(gene['A'][immutable]).toBe(true);
    expect(gene['A'][mutable]).toBe(undefined);

    gene['A'] = {
        T: 'C'
    };
    expect(gene['A'][immutable]).toBe(true);
    expect(gene['A'][mutable]).toBe(true);
});

test('Event listener', async () => {
    const host = document.createElement('div');
    const genome = new Genome(host);
    const gene = new Proxy({}, genome);
    let dispatched = false;

    host.addEventListener(':/A/T', () => {
        dispatched = true;
    });

    gene['A'] = {
        [immutable]: true,
        T: 'C'
    };
    expect(gene['A']['T']).toBe('C');

    gene['A']['T'] = 'G';
    expect(gene['A']['T']).toBe('G');

    await sleep();
    expect(dispatched).toBe(false);

    gene['A'][immutable] = false;
    gene['A']['T'] = 'C';
    expect(gene['A']['T']).toBe('C');

    await sleep();
    expect(dispatched).toBe(true);

    gene['A']['T'] = 'G';
    dispatched = false;
    gene['A']['T'] = 'G';
    await sleep();
    expect(dispatched).toBe(false);
});
