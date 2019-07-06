import gql from 'graphql-tag';

export default {
  query: gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: AI0104  {
          year
          value
        }
      }
    }
  `,
  content: {
    question: "Bäume, Laub und Pilze - Wo gibt es mehr Waldgebiete?",
    description: "Der Anteil der Waldfläche an der Gesamtfläche.",
    unit: "Prozent",
  },
};
