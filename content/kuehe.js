import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0902  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Welche Stadt hat mehr Kühe?",
    description: "Wie hoch ist die Anzahl der Rinder auf je 100 Hektar landwirtschaftlich genutzter Fläche?",
    unit: "Pro 100 Hektar",
  },
};
