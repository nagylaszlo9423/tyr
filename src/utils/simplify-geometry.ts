export type SimplifyGeometry = (points: any[], tolerance: number) => any[];
export const simplifyGeometry: SimplifyGeometry = require('simplify-geometry');
