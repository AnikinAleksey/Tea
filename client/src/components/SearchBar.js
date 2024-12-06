import React, { useState } from 'react';
import axios from 'axios';

const SearchTeas = () => {
    const [criteria, setCriteria] = useState({});
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/teas/search', criteria);
        setResults(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria({ ...criteria, [name]: value });
    };

    return (
        <div>
            <h1>Поиск чая</h1>
            <form onSubmit={handleSearch}>

                <div className="form-group">
                    <label>Вид:</label>
                    <input type="text" name="variety" placeholder="Вид" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Тип:</label>
                    <input type="text" name="type" placeholder="Тип" onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label>Добавки:</label>
                    <input type="text" name="additives" placeholder="Добавки" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Производитель:</label>
                    <input type="text" name="producer" placeholder="Производитель" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Максимальная цена:</label>
                    <input type="number" name="price" placeholder="Максимальная цена" onChange={handleChange} />
                </div>
                <button type="submit">Поиск</button>
            </form>
            <div>
                {results.map(tea => (
                    <div key={tea.id}>
                        <h3>{tea.variety}</h3>
                        <p>Тип: {tea.type}</p>
                        <p>Добавки: {tea.additives}</p>
                        <p>Производитель: {tea.producer}</p>
                        <p>Вес: {tea.weight}g</p>
                        <p>Цена: ${tea.price}</p>
                        <img src={tea.image} alt={tea.variety} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchTeas;