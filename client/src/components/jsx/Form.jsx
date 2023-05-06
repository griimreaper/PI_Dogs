import React, { useState } from 'react'
import "../css/Form.css"
import { validate } from "./Validation.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newDog } from '../../redux/actions'

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
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const { dogsOrigin, temperaments } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()


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

    const handleCheckboxChange = (e) => { //manejamos los checkbox de los temperaments
        const selectedTemperament = e.target.value;
        const isChecked = e.target.checked;
        let updatedTemperaments = [...selectedTemperaments];
        if (isChecked) {
            updatedTemperaments.push(selectedTemperament); // si esta chequeado lo agregamos al array de temperamentos seleccionados
        } else {
            updatedTemperaments = updatedTemperaments.filter( // si cancelamos el check hacemos un filter para extraerlo del array de los seleccionados
                (t) => t !== selectedTemperament
            );
        }

        setSelectedTemperaments(updatedTemperaments); // agregamos todos los temperamentos al estado de temperamentos seleccionados
        setDogData({ // manejamos los seleccionados con los inputs en tiempo real
            ...dogData,
            temperaments: updatedTemperaments,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (Number(dogData.height.split("-")[0]) > Number(dogData.height.split("-")[1])) { //controlamos que los datos de la altura se envien correctamente
                return alert("The min value of height cannot be greater than the max")
            }
            if (Number(dogData.weight.split("-")[0]) > Number(dogData.weight.split("-")[1])) { //controlamos que los datos del peso se envien correctamente
                return alert("The min value of height cannot be greater than the max")
            }
            if (!dogsOrigin.find((d) => d.name === dogData.name)) { //checkeamos si no existe otro perro con el mismo name
                dispatch(newDog(dogData)) // agregamos al perro
                alert("Dog created successfully")
                navigate("/home")
            } else { //si existe retornamos la alerta correspondiente
                alert("This dog does exist")
            }
        } catch ({ response }) {
            alert(response.data.error)
        }
    }

    const submitOff = (e) => {
        e.preventDefault()
    }

    return (
        <div className='formContainer'>
            <h1>Create or insert your dog</h1>
            <div className='formContent'>
                <div className='imageContainer'>
                    <img src={errors.image || !dogData.image ? "https://webstockreview.net/images/clipart-clock-dog-2.png" : dogData.image} alt="dogImage" />
                </div>
                <div className='formFields'>
                    <form>
                        <h3 className="create">woof! woof!</h3>
                        <div className="inputBox">
                            <span>Name</span>
                            <input value={dogData.name} name="name" onChange={handleChange}></input>
                            <p>{errors.name}</p>
                        </div>
                        <div className="inputBox">
                            <span>image URL</span>
                            <input value={dogData.image} name="image" onChange={handleChange}></input>
                            <p>{errors.image}</p>
                        </div>
                        <div className="inputBox">
                            <span>Height</span>
                            <input value={dogData.height} name="height" onChange={handleChange} />
                            <p>{errors.height}</p>
                        </div>
                        <div className="inputBox">
                            <span>Weight</span>
                            <input value={dogData.weight} name="weight" onChange={handleChange} />
                            <p>{errors.weight}</p>
                        </div>
                        <div className="inputBox">
                            <span>Age</span>
                            <input value={dogData.age} name="age" type="number" onChange={handleChange} />
                            <p>{errors.age}</p>
                        </div>
                        <h3 className="create">Temperaments</h3>
                        <div className='temperamentContainer'>
                            {temperaments.map((t) => {
                                return (
                                    <div className="temperament" key={t.id}>
                                        <input type="checkbox" id={t.id} name={t.name} value={t.name} onChange={handleCheckboxChange} />
                                        <span htmlFor={t.id}>{t.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <button className={Object.keys(errors).length === 0 && dogData.name !== "" ? "submitOn" : "submitOff"} onClick={Object.keys(errors).length === 0 && dogData.name !== "" ? handleSubmit : submitOff}>Insert</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
