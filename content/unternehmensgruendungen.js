import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0401  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Welche Stadt hat mehr gegründete Unternehmen pro Jahr?",
    description: "Gewerbeanmeldungen je 10.000 Einwohner",
    unit: "je 10.000 Einwohner",
  },
};