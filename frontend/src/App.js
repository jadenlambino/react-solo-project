import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Articles from './components/ArticlesDisplay';
import ArticlesForm from './components/ArticlesForm'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path='/articles' exact>
            <Articles />
          </Route>
          <Route path='/articles/new'>
            <ArticlesForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
