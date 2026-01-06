import { mix, transparentize } from "polished";

export const dark = (colour: string) => mix(0.25, "#000", colour);
export const darker = (colour: string) => mix(0.4, "#000", colour);
export const muted = (colour: string) => mix(0.75, "#fff", colour);
export const light = (colour: string) => mix(0.5, "#fff", colour);

export const weak = (colour: string) => transparentize(0.4, colour);
export const weaker = (colour: string) => transparentize(0.6, colour);
export const weakest = (colour: string) => transparentize(0.75, colour);
export const barely = (colour: string) => transparentize(0.95, colour);
