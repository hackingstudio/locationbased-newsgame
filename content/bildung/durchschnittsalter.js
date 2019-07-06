import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: BEV519  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo sind die Menschen im Schnitt älter?",
    description: "Durchschnittsalter der Bevölkerung",
    unit: "Prozent",
  },
};
