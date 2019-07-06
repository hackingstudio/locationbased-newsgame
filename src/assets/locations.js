import locations from "./locations.json";

export const locationsList = locations.sort((a, b) => (a.name > b.name ? 1 : -1));

export const locationsMap = locations.reduce((acc, cur) => ({ [cur.id]: cur.name, ...acc }), {});
