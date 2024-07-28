import React, { useState } from 'react';
import './RetrieveInformation.css';

function RetrieveInformation() {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);

  const handleRetrieve = () => {
    const people = JSON.parse(localStorage.getItem('people')) || [];
    const match = people.find(p => p.aadhar === aadhar);
    setPerson(match || 'No match found');
  };

  return (
    <div className="retrieve-information">
      <input type="text" placeholder="Enter Aadhar Number" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
      <button onClick={handleRetrieve}>Retrieve Information</button>
      {person ? (
        typeof person === 'string' ? <p>{person}</p> : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Aadhar Number</th>
                <th>Mobile Number</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{person.name}</td>
                <td>{person.dob}</td>
                <td>{person.aadhar}</td>
                <td>{person.mobile}</td>
                <td>{person.age}</td>
              </tr>
            </tbody>
          </table>
        )
      ) : null}
    </div>
  );
}

export default RetrieveInformation;
