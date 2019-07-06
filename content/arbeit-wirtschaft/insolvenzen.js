import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0402  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo gehen mehr Unternehmen pleite?",
    description: "Unternehmensinsolvenzen je 10.000 umsatzsteuerpflichtige Unternehmen",
    unit: "von 10.000 Unternehmen",
  },
};