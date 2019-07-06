import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0304  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo machen mehr Schüler*innen Abitur?",
    description: "Anteil der Schulabgänger*innen mit allgemeiner Hochschulreife an den Schulabgänger*innen insgesamt",
    unit: "Prozent",
  },
};
