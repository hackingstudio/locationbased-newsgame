import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0203  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gibt es mehr Kinder und Jugendliche?",
    description: "Anteil der 0- bis 17-Jährigen an der Gesamtbevölkerung",
    unit: "Prozent",
  },
};
