import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import NavigationBar from './components/NavigationBar';
import MyRecipes from './components/MyRecipes';
import RecipeNew from './components/RecipeNew';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetail from "./components/RecipeDetail";

function App() {

    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path={"/"} exact component={Homepage}/>
                <Route path={"/new"} exact component={RecipeNew}/>
                <Route path={"/recipe/detail/:id"} exact component={RecipeDetail}/>
                <Route path={"/my-recipes"} exact component={MyRecipes}/>
            </Switch>
        </Router>
    );
}

export default App;
