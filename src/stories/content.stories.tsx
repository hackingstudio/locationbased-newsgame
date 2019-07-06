import React from "react";
import { storiesOf } from "@storybook/react";

const req = require.context("../../content", true, /\.js$/);

interface ContentDefinition {
  content: {
    question: string;
    description: string;
    unit: string;
  };
  query: any;
}

storiesOf("Content", module).add("all", () => {
  const questions: ContentDefinition[] = req
    .keys()
    .map(filename => req(filename).default);
  console.log(questions);
  return questions.map(({ content, query }) => (
    <div>
      <h2>{content.question}</h2>
      <p style={{ textTransform: "uppercase", color: "grey" }}>
        {content.description}
      </p>
      <pre>{query.loc.source.body}</pre>
    </div>
  ));
});
