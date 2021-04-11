import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import NavigationBar from './components/NavigationBar';
import Recipe from './components/Recipe';
import MyRecipes from './components/MyRecipes';
import NewRecipe from './components/NewRecipe';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <Router>
            <NavigationBar/>
            <Switch>
                <Route path={"/"} exact component={Homepage}/>
                <Route path={"/new"} exact component={Recipe}/>
                <Route path={"/recipe"} exact component={NewRecipe}/>
                <Route path={"/my-recipes"} exact component={MyRecipes}/>
            </Switch>
        </Router>
    );
}

export default App;
