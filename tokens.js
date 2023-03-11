/**
 * Symbol used to mark a property as immunized. Meaning, it should not
 * be subject to any Proxy traps.
 * @type {Symbol}
 */
export const immunize = Symbol.for('immunize');
