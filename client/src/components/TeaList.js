import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeaItem from './TeaItem';
import SearchBar from './SearchBar';
import AddTeaForm from './AddTeaForm';

const TeaList = () => {
    const [teas, setTeas] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({});

    useEffect(() => {
        const fetchTeas = async () => {
            const response = await axios.get('http://localhost:5000/api/teas');
            setTeas(response.data);
        };
        fetchTeas();
    }, []);

    const handleSearch = async (criteria) => {
        const response = await axios.post('http://localhost:5000/api/teas/search', criteria);
        setTeas(response.data);
    };

    const handleTeaAdded = (newTea) => {
        setTeas([...teas, newTea]);
    };

    const handleTeaUpdated = (updatedTea) => {
        setTeas(teas.map(tea => (tea.id === updatedTea.id ? updatedTea : tea)));
    };

    const handleTeaDeleted = (id) => {
        setTeas(teas.filter(tea => tea.id !== id));
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <AddTeaForm onTeaAdded={handleTeaAdded} />
            <div>
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

export default TeaList;