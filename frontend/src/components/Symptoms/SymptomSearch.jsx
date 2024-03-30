import React, { useState } from 'react';

const SymptomSearch = ({ database }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSymptomClick = (id) => {
    const index = selectedSymptoms.indexOf(id);
    if (index === -1) {
      setSelectedSymptoms([...selectedSymptoms, id]);
      console.log(id)
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((symptomId) => symptomId !== id));
    }
  };

  const filteredSymptoms = database.filter((symptom) =>
    symptom.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        className='form_input'
        placeholder="Search symptoms..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {searchTerm!=='' && <ul>
        {filteredSymptoms.map((symptom) => (
          <li
            key={symptom.ID}
            onClick={() => handleSymptomClick(symptom.ID)}
            style={{ cursor: 'pointer' }}
          >
            {symptom.Name}
            {selectedSymptoms.includes(symptom.ID) && <span> (selected)</span>}
          </li>
        ))}
      </ul>}
      <div>
        <h2>Selected Symptoms:</h2>
        <ul>
          {selectedSymptoms.map((id) => (
            <li key={id}>{database.find((symptom) => symptom.ID === id).Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SymptomSearch;
