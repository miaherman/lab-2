import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";


let theme = createMuiTheme({
  palette: {
    primary: { 
      main: "#2D7DD2" },
    secondary: { 
      main: "#B8C5D6" }
  },
});

theme = responsiveFontSizes(theme);

export default theme;
