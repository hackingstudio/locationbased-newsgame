import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI1901  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "In welcher Stadt produzieren die Einwohner*innen mehr Müll?",
    description: "Das Netto-Aufkommen an Haushaltsabfällen pro Einwohner, Elektro-Altgeräte sind davon ausgeschlossen.",
    unit: "Netto-Abfallaufkommen",
    map: "//datawrapper.dwcdn.net/IkABn/2/"
  },
};
