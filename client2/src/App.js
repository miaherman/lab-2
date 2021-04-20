import "./App.css";
import SignIn from "./components/signIn";
import Register from "./components/register"
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
