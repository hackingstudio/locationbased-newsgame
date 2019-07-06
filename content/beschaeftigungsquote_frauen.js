import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0712  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo ist der Anteil arbeitender Frauen höher?",
    description: "Beschäftigtenquote Frauen",
    unit: "Prozent",
  },
};