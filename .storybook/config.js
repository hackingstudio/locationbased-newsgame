import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "../src/components/theme";

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.[tj]sx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

const styleResetDecorator = (story) => (
  <div style={{ fontFamily: 'Roboto, sans-serif' }}>{story()}</div>
);
addDecorator(styleResetDecorator);

const themeDecorator = (story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
);
addDecorator(themeDecorator);
