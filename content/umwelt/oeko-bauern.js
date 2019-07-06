import gql from '../bildung/node_modules/graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0904  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gibt es mehr Öko-Bauern?",
    description: "Anteil der ökologisch bewirtschafteten Fläche an der landwirtschaftlich genutzten Fläche insgesamt.",
    unit: "Prozent",
  },
};
