import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Form() {
    const [dogData, setDogData] = useState({ 
        name: "",
        image: "",
        height: "",
        weight: "",
        age: "",
        temperaments: []
    })
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
    }

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

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const {data} = await axios.post("http://localhost:3001/dogs", dogData)
            console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error.response.data)
            alert("The Dog does exist")
        }
    }


    console.log(dogData)
    return (
        <div>
            <h1>Create a new breed</h1>
            <img src="https://webstockreview.net/images/clipart-clock-dog-2.png" alt="dogImage" />
            <label>Name: </label>
            <input value={dogData.name} name="name" onChange={handleChange}></input>
            <label>image URL: </label>
            <input value={dogData.image} name="image" onChange={handleChange}></input>
            <label>Height: </label>
            <input value={dogData.height} name="height" onChange={handleChange} />
            <label>Weight: </label>
            <input value={dogData.weight} name="weight" onChange={handleChange} />
            <label>life span: </label>
            <input value={dogData.age} name="age" onChange={handleChange} />
            <div>
            <h3>Temperaments:</h3>
                {temperament.map((t) => {
                    return (
                        <div key={t.id}>
                        <input type="checkbox" id={t.id} name={t.name} value={t.name} onChange={handleCheckboxChange}/>
                        <label htmlFor={t.id}>{t.name}</label>
                    </div>
                        )
                    })}
            </div>
                    <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
