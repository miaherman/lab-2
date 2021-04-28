import "./App.css";
import Home from "./components/home";
import SignIn from "./components/signIn";
import Register from "./components/register";
import ButtonAppbar from "./components/appBar";
import theme from './components/theme'

import { Route, Switch } from "react-router-dom";

import TwitturProvider from "./components/context";

import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  
  return (
    <ThemeProvider theme={theme}>
    <TwitturProvider>
      <div className="App">
        <ButtonAppbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </TwitturProvider>
    </ThemeProvider>
  );
}

export default App;
