import React, { useState } from 'react';
import axios from 'axios';
import UpdateTeaForm from './UpdateTeaForm';

const TeaItem = ({ tea, onTeaUpdated, onTeaDeleted }) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDelete = async () => {
       
        const confirmDelete = window.confirm(`Вы уверены, что хотите удалить чай "${tea.variety}"?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/teas/${tea.id}`);
                onTeaDeleted(tea.id); 
            } catch (error) {
                console.error('Ошибка при удалении чая:', error);
                alert('Не удалось удалить чай. Попробуйте еще раз.'); 
            }
        }
    };

    const handleUpdate = () => {
        setIsUpdating(true); 
    };

    const handleCancel = () => {
        setIsUpdating(false); 
    };

    return (
        <div className="tea-item">
            {isUpdating ? (
                <UpdateTeaForm tea={tea} onTeaUpdated={onTeaUpdated} onCancel={handleCancel} />
            ) : (
                <>
                    <h3>{tea.variety}</h3>
                    <p>Тип: {tea.type}</p>
                    <p>Добавки: {tea.additives}</p>
                    <p>Производитель: {tea.producer}</p>
                    <p>Вес: {tea.weight} г.</p>
                    <p>Цена: {tea.price} руб.</p>
                    <div className="tea-item-buttons">
                        <button onClick={handleUpdate}>Обновить</button>
                        <button onClick={handleDelete}>Удалить</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TeaItem;