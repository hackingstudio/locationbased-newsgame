import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0103  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gibt es mehr landwirtschaftliche Nutzfläche?",
    description: "Der Anteil der Landwirtschaftsfläche an der Gesamtfläche.",
    unit: "Prozent",
  },
};
