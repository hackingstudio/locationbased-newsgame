import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0102  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gibt es für die Einwohner mehr Fläche zum Erholen?",
    description: "Der Anteil der Erholungsfläche an der Gesamtfläche der Stadt.",
    unit: "Prozent",
  },
};
