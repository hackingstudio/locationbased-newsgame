import gql from 'graphql-tag'

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0801  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Wo ist die Arbeitslosenquote höher?",
    description: "Anteil der Arbeitslosen an den zivilen Erwerbspersonen im Jahresdurchschnitt",
    unit: "Prozent",
    map: "//datawrapper.dwcdn.net/Wg5O3/1/"
  }
}
