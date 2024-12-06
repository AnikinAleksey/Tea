import React, { useState } from 'react';
import axios from 'axios';

const AddTeaForm = ({ onTeaAdded }) => {
    const [tea, setTea] = useState({
        variety: '',
        type: '',
        additives: '',
        producer: '',
        price: '',
        weight: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTea({ ...tea, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/teas', tea);
        onTeaAdded(response.data);
        setTea({ variety: '', type: '', additives: '', producer: '', price: '', weight: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Вид чая:</label>
                <input type="text" name="variety" value={tea.variety} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Тип чая:</label>
                <input type="text" name="type" value={tea.type} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Добавки:</label>
                <input type="text" name="additives" value={tea.additives} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Производитель:</label>
                <input type="text" name="producer" value={tea.producer} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Цена:</label>
                <input type="number" name="price" value={tea.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Вес:</label>
                <input type="number" name="weight" value={tea.weight} onChange={handleChange} required />
            </div>
            <button type="submit">Добавить чай</button>
        </form>
    );
};

export default AddTeaForm;