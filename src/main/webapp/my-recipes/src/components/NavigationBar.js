import React from "react";
import './css/NavigationBar.css';


function NavigationBar() {

    return (
        <div>
            <h1 className={"header text-center"}>Easy Recipes</h1>
            <div className={"footer text-muted text-center fixed-bottom"}>2020-2021, Linh Tran</div>
        </div>
    );
}

export default NavigationBar;