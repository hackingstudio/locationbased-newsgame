import locations from "./locations.json";
import crestsRural from "./crests_rural.json";
import crestsCities from "./crests_cities.json";

export const locationsList = locations.sort((a, b) => (a.name > b.name ? 1 : -1));

export const locationsMap = locations.reduce((acc, cur) => ({ [cur.id]: cur.name, ...acc }), {});

const crestBase = [].concat(crestsRural, crestsCities);
export const crests = crestBase
  .map(c => ({
    id: c["German_district_key"],
    name: c["official_name"] || "",
    crest: c["Lagekarte"],
  }))

export const crestMap = crests
  .filter(c => c.id && c.crest)
  .reduce((acc, cur) => ({ [cur.id]: cur.crest, ...acc }), {})
