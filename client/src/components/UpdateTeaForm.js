import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTeaForm = ({ tea, onTeaUpdated, onCancel }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(tea); // Инициализируем форму данными чая
    }, [tea]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/teas/${tea.id}`, formData);
            onTeaUpdated(response.data); // Уведомить родительский компонент об обновлении
            onCancel(); // Закрыть форму
        } catch (error) {
            console.error('Ошибка при обновлении чая:', error);
            alert('Не удалось обновить чай. Попробуйте еще раз.'); // Сообщение об ошибке
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Обновить чай</h2>
            <label>
                Вид: {/* Добавлено поле variety */}
                <input type="text" name="variety" value={formData.variety} onChange={handleChange} />
            </label>
            <label>
                Тип:
                <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </label>
            <label>
                Добавки:
                <input type="text" name="additives" value={formData.additives} onChange={handleChange} />
            </label>
            <label>
                Производитель:
                <input type="text" name="producer" value={formData.producer} onChange={handleChange} />
            </label>
            <label>
                Вес:
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
            </label>
            <label>
                Цена:
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </label>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onCancel}>Отмена</button>
        </form>
    );
};

export default UpdateTeaForm;