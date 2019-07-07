import { createMuiTheme } from "@material-ui/core/styles";
import { yellow, pink } from "@material-ui/core/colors";

export const backgroundColor = "#f7f7f2";

export const theme = createMuiTheme({
  palette: {
    primary: { main: yellow[600] },
    secondary: { main: pink[600] },
    background: {
      default: backgroundColor,
    },
  },
});
