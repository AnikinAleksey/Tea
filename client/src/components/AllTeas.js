import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeaItem from './TeaItem';
import AddTeaForm from './AddTeaForm';

const AllTeas = () => {
    const [teas, setTeas] = useState([]);
    const [showAddTeaForm, setShowAddTeaForm] = useState(false);

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teas');
                setTeas(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке чаев:', error);
                alert('Не удалось загрузить чаи. Попробуйте еще раз.'); 
            }
        };
        fetchTeas();
    }, []);

    const handleTeaAdded = (newTea) => {
        setTeas([...teas, newTea]);
        setShowAddTeaForm(false); 
    };

    const handleTeaUpdated = (updatedTea) => {
        setTeas(teas.map(tea => (tea.id === updatedTea.id ? updatedTea : tea)));
    };

    const handleTeaDeleted = (id) => {
        setTeas(teas.filter(tea => tea.id !== id));
    };

    const toggleAddTeaForm = () => {
        setShowAddTeaForm(prev => !prev); 
    };

    return (
        <div className="Alltea-list">
            <h1>Все чаи</h1>
            <button onClick={toggleAddTeaForm}>
                {showAddTeaForm ? 'Скрыть форму добавления' : 'Добавить чай'}
            </button>
            {showAddTeaForm && <AddTeaForm onTeaAdded={handleTeaAdded} />}
            <div className="tea-list">
                {teas.map(tea => (
                    <TeaItem
                        key={tea.id}
                        tea={tea}
                        onTeaUpdated={handleTeaUpdated}
                        onTeaDeleted={handleTeaDeleted}
                    />
                ))}
            </div>
        </div>
    );
};
export default AllTeas;