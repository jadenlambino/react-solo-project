import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUpFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Articles from './components/ArticlesDisplay';
import ArticlesForm from './components/ArticlesForm'
import SingleArticle from "./components/SingleArticle";

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
          <Route path="/signup">
            <SignUpFormPage />
          </Route>
          <Route path='/articles' exact>
            <Articles />
          </Route>
          <Route path='/articles/new'>
            <ArticlesForm />
          </Route>
          <Route path='/articles/:id'>
            <SingleArticle />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
