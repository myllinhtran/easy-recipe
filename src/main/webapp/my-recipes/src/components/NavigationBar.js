import React from "react";
import './css/NavigationBar.css';


function NavigationBar() {

    const header = {
        textDecoration: "none",
        color: "black"
    };

    return (
        <div>
            <a href={"/"} style={header}><h1 className={"header text-center"}>Easy Recipes</h1></a>
            <div className={"card-footer bg-dark text-white text-center fixed-bottom"}>2020-2021, Linh Tran</div>
        </div>
    );
}

export default NavigationBar;