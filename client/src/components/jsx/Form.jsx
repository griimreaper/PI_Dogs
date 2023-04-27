import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../css/Form.css"
import { validate } from "./Validation.jsx"

export default function Form() {
    const [dogData, setDogData] = useState({
        name: "",
        image: "",
        height: "",
        weight: "",
        age: "",
        temperaments: []
    })
    const [errors, setErrors] = useState({})

    const [temperament, setTemperament] = useState([])
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);

    useEffect(() => {
        const fetchTemperaments = async () => {
            const { data } = await axios.get("http://localhost:3001/temperaments");
            setTemperament(data);
        };
        fetchTemperaments();
    }, []);

    const handleChange = (e) => {
        setDogData({
            ...dogData,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...dogData,
                [e.target.name]: e.target.value
            })
        )
    }
    console.log(errors)
    const handleCheckboxChange = (e) => {
        const selectedTemperament = e.target.value;
        const isChecked = e.target.checked;

        let updatedTemperaments = [...selectedTemperaments];
        if (isChecked) {
            updatedTemperaments.push(selectedTemperament);
        } else {
            updatedTemperaments = updatedTemperaments.filter(
                (t) => t !== selectedTemperament
            );
        }

        setSelectedTemperaments(updatedTemperaments);
        setDogData({
            ...dogData,
            temperaments: updatedTemperaments,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post("http://localhost:3001/dogs", dogData)
            alert(data.message)
        } catch ({ response }) {
            alert(response.data.error)
        }
    }

    return (
        <div class='formContainer'>
            <h1>Create or insert your dog</h1>
            <div class='formContent'>
                <div class='imageContainer'>
                    <img src={errors.image || !dogData.image? "https://webstockreview.net/images/clipart-clock-dog-2.png" : dogData.image} alt="dogImage" />
                </div>
                <div class='formFields'>
                    <form>
                        <a class="create">woof! woof!</a>
                        <div class="inputBox">
                            <span>Name</span>
                            <input value={dogData.name} name="name" onChange={handleChange}></input>
                            <p>{errors.name}</p>
                        </div>
                        <div class="inputBox">
                            <span>image URL</span>
                            <input value={dogData.image} name="image" onChange={handleChange}></input>
                            <p>{errors.image}</p>
                        </div>
                        <div class="inputBox">
                            <span>Height</span>
                            <input value={dogData.height} name="height" onChange={handleChange} />
                            <p>{errors.height}</p>
                        </div>
                        <div class="inputBox">
                            <span>Weight</span>
                            <input value={dogData.weight} name="weight" onChange={handleChange} />
                            <p>{errors.weight}</p>
                        </div>
                        <div class="inputBox">
                            <span>life span</span>
                            <input value={dogData.age} name="age" onChange={handleChange} />
                            <p>{errors.age}</p>
                        </div>
                        <h3 class="create">Temperaments</h3>
                        <div class='temperamentContainer'>
                            {temperament.map((t) => {
                                return (
                                    <div class="temperament" key={t.id}>
                                        <input type="checkbox" id={t.id} name={t.name} value={t.name} onChange={handleCheckboxChange} />
                                        <span htmlFor={t.id}>{t.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <button class="submit" onClick={handleSubmit}>Insert</button>
                        </form>
                        </div>
            </div>
        </div>
    )
}