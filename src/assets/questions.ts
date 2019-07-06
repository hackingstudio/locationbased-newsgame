import { categories, Category } from "./categories";

export interface Question {
  question: string;
  description: string;
  unit: string;
}

export interface ContentDefinition {
  content: Question;
  query: any;
}

const req = require.context("../../content", true, /\.js$/);
export const questionList: { filename: string; q: ContentDefinition }[] = req
  .keys()
  .map(filename => ({ filename, q: req(filename).default }));

const questions: Record<Category, ContentDefinition[]> = Object.keys(categories).reduce((agg, cat) => {
  const catQuestions = questionList.filter(({ filename }) =>
    filename.startsWith(`./${cat}`)
  ).map(({ q }) => q);
  agg[cat] = catQuestions;
  return agg;
}, {} as any);

export default questions;
