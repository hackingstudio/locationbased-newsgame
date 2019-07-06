import React from "react";
import { storiesOf } from "@storybook/react";
import { categories } from "../assets/categories";

const req = require.context("../../content", true, /\.js$/);
const questions: { filename: string; q: ContentDefinition }[] = req
  .keys()
  .map(filename => ({ filename, q: req(filename).default }));

interface ContentDefinition {
  content: {
    question: string;
    description: string;
    unit: string;
  };
  query: any;
}

const renderQuestions = ({ q: { content, query } }) => (
  <div>
    <h2>{content.question}</h2>
    <p style={{ textTransform: "uppercase", color: "grey" }}>
      {content.description}
    </p>
    <pre>{query.loc.source.body}</pre>
  </div>
);

const stories = storiesOf("Content", module).add("all", () => {
  return questions.map(renderQuestions);
});

Object.keys(categories).forEach(cat =>
  stories.add(categories[cat], () => {
    const catQuestions = questions.filter(({ filename }) =>
      filename.startsWith(`./${cat}`)
    );
    return catQuestions.map(renderQuestions);
  })
);
