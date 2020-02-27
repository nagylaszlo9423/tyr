import {Coordinate} from 'ol/coordinate';

export type SimplifyGeometry = (points: Coordinate[], tolerance: number) => Coordinate[];
export const simplifyGeometry: SimplifyGeometry = require('simplify-geometry');
