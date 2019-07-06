import gql from 'graphql-tag'

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI1501  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wer beschäftigt mehr Beamte?",
    description: "Beschäftigte Bund, Länder, Gemeinden je 1.000 Einwohner",
    unit: "von 1.000 Einwohner*innen",
  }
}