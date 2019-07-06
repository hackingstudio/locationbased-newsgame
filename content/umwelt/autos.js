import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI1301  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Welche Einwohner besitzen mehr Autos?",
    description: "Die Anzahl der PKW je 1.000 Einwohner.",
    unit: "Anzahl je 1.000 Einwohner",
  },
};
