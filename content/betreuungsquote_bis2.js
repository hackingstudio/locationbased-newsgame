import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0311  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gehen mehr Kinder unter 2 Jahre in die KiTa?",
    description: "Anteil der in Ganztagsbetreuung betreuten Kinder im Alter von 0 bis 2 Jahren an den Kindern gleichen Alters",
    unit: "Prozent",
  },
};