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
        <div >
            <h1>Поиск чая</h1>
            <form onSubmit={handleSearch}>
                <label>
                    Вид:
                    <input type="text" name="variety" placeholder="Вид" onChange={handleChange} />
                </label>
                <label>
                    Тип:
                    <input type="text" name="type" placeholder="Тип" onChange={handleChange} />
                </label>
                <label>
                    Добавки:
                    <input type="text" name="additives" placeholder="Добавки" onChange={handleChange} />
                </label>
                <label>
                    Производитель:
                    <input type="text" name="producer" placeholder="Производитель" onChange={handleChange} />
                </label>
                <label>
                    Максимальная цена:
                    <input type="number" name="price" placeholder="Максимальная цена" onChange={handleChange} />
                </label>
                <button type="submit">Поиск</button>
            </form>
           
            <div className="tea-item-search">
                {results.map(tea => (
                    <div className="tea-card" key={tea.id}>
                        <h3>{tea.variety}</h3>
                        <p>Тип: {tea.type}</p>
                        <p>Добавки: {tea.additives}</p>
                        <p>Производитель: {tea.producer}</p>
                        <p>Вес: {tea.weight} г.</p>
                        <p>Цена: {tea.price} руб.</p>
                    </div>
                ))}
            </div>
        </div>
   
    );
};

export default SearchTeas;