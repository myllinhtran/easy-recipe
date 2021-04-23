import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import NavigationBar from './components/NavigationBar';
import RecipeNew from './components/RecipeNew';
import RecipeDetail from "./components/RecipeDetail";
import RecipeUpdate from "./components/RecipeUpdate";
import IngredientNew from "./components/IngredientNew";

function App() {

    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path={"/"} exact component={Homepage}/>
                <Route path={"/recipe/new"} exact component={RecipeNew}/>
                <Route path={"/recipe/update/:id"} exact component={RecipeUpdate}/>
                <Route path={"/recipe/detail/:id"} exact component={RecipeDetail}/>
                <Route path={"/ingredient/new"} exact component={IngredientNew}/>
            </Switch>
        </Router>
    );
}

export default App;
