import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI1401  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gibt es mehr Krankenhausbetten?",
    description: "Die Krankenhausbettendichte gemessen an den vorhandenen Betten je 1.000 Einwohner*innen.",
    unit: "Anzahl Krankenhausbetten auf 1.000 Einwohner*innen",
  },
};
