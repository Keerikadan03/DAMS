import React, { useState } from 'react';
import { useSymtomContext } from '../../context/SymptomContext';

const SymptomSearch = ({ database }) => {
  const { data, addData } = useSymtomContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSymptomClick = (id) => {
    const index = selectedSymptoms.indexOf(id);
    if (index === -1) {
      setSelectedSymptoms([...selectedSymptoms, id]);
      console.log(data)
      console.log(id)
      addData([...data,id]);
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
            className='text-[16px] leading-7 font-400 text-textColor mt-2'
          >
            {symptom.Name}
            {selectedSymptoms.includes(symptom.ID) && <span> (selected)</span>}
          </li>
        ))}
      </ul>}
      <div>
        <h2 className='text-[16px] leading-7 font-400 text-textColor mt-2'>Selected Symptoms:</h2>
        <ul>
          {selectedSymptoms.map((id) => (
            <li key={id} className='text-[16px] leading-7 font-400 text-primaryColor'>{database.find((symptom) => symptom.ID === id).Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SymptomSearch;
