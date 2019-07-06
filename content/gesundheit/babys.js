import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0209  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo werden im Durchschnitt mehr Babys geboren?",
    description: "Die Anzahl der lebend geborenen Babys je 10.000 Einwohner*innen.",
    unit: "Anzahl je 10.000 Einwohner*innen",
  },
};
