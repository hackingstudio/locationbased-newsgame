import gql from 'graphql-tag'

export default {
  query: gql`
    query($nuts3: String!) {
        region(id: $nuts3) {
        name
        stat: EKM014  {
            year
            value
        }
        }
    }
  `,
  content: {
    question: "Welche Einwohner*innen haben mehr Geld zur Verfügung?",
    description: "Verfügbares Einkommen der privaten Haushalte je Einwohner",
    unit: "Euro im Jahr",
  }
}