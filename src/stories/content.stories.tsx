import React from "react";
import { storiesOf } from "@storybook/react";
import { categories } from "../assets/categories";
import questions, { questionList } from "../assets/questions";

const renderQuestions = ({ content, query }) => (
  <div>
    <h2>{content.question}</h2>
    <p style={{ textTransform: "uppercase", color: "grey" }}>
      {content.description}
    </p>
    <pre>{query.loc.source.body}</pre>
  </div>
);

const stories = storiesOf("Content", module).add("all", () => {
  return questionList.map(({ q }) => renderQuestions(q));
});

Object.entries(questions).forEach(([cat, catQuestions]) =>
  stories.add(categories[cat], () => {
    return catQuestions.map(renderQuestions);
  })
);
