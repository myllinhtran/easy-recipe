import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";


function IngredientNew() {

    const {register, handleSubmit, errors} = useForm();
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState();

    useEffect(() => {
        axios.get("https://infinite-caverns-36724.herokuapp.com/api/ingredients")
            .then(response => {
                console.log(response.data);
                setIngredients(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleOnChange = (event) => {
        const name = event.target.value;
        if (name !== null) {
            setName(name);
        }
    };

    const onSubmit = () => {
        const ingredient = {
            id: "",
            name: name
        };

        if (ingredients.some(ingredient => ingredient.name === name)) {
            alert("Ingredient already exists!");
        } else {
            axios.post("https://infinite-caverns-36724.herokuapp.com/api/ingredients", ingredient)
                .then(response => {
                    console.log(response.data);
                    alert("New ingredient is saved successfully!");
                });
        }
    };

    return (
        <div className={"container"}>
            <form className={"form-ingredient"} onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor={"ingredient"}>Ingredient</label>
                <input className={"form-control"} name={"ingredient"} type={"text"}
                       placeholder={"Please add an ingredient..."} onChange={handleOnChange}
                       ref={register({
                           required: {value: true, message: "* Name is required."},
                           minLength: {value: 3, message: "* Name is too short."},
                           maxLength: {value: 20, message: "* Name is too long."}
                       })}
                />
                {errors.ingredient && <p>{errors.ingredient.message}</p>}

                <input className={"btn-new-ingredient"} type={"submit"} value={"Add New Ingredient"}/>
            </form>
        </div>
    )
}

export default IngredientNew;

