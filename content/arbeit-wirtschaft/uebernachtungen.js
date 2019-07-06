import gql from '../bildung/node_modules/graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI1201  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo bleiben die Touristen länger vor Ort?",
    description: "Durchschnittliche Aufenthaltsdauer von Gästen in Beherbergungsbetrieben in Tagen",
    unit: "Tage",
  },
};