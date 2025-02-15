"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randRange = void 0;
const randRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randRange = randRange;
