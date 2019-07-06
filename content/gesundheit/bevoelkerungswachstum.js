import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0202  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo wächst die Bevölkerung stärker?",
    description: "Die Bevölkerungsentwicklung im Jahr, gemessen pro 10.000 Einwohner*innen.",
    unit: "Anzahl je 10.000 Einwohner",
  },
};
