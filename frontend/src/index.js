import "./styles.scss";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";

const appContainer = document.querySelector("#app");

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/product(.html)?">
          <Product />
        </Route>
        <Route exact path="/">
          <Products />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, appContainer);
