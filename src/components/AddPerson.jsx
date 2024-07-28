import React, { useState } from 'react';
import './AddPerson.css';

function AddPerson() {
  const [people, setPeople] = useState(() => JSON.parse(localStorage.getItem('people')) || []);

  const handleAddRow = () => {
    setPeople([...people, { name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
  };

  const handleSave = (index) => {
    const person = people[index];
    if (person.name.trim() && person.dob && /^[0-9]{12}$/.test(person.aadhar) && /^[0-9]{10}$/.test(person.mobile)) {
      const age = calculateAge(person.dob);
      const updatedPerson = { ...person, age: age.toString() };
      const updatedPeople = [...people];
      updatedPeople[index] = updatedPerson;
      setPeople(updatedPeople);
      localStorage.setItem('people', JSON.stringify(updatedPeople));
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const handleDelete = (index) => {
    const updatedPeople = [...people];
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  const handleChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    if (field === 'dob') {
      updatedPeople[index].age = calculateAge(value);
    }
    setPeople(updatedPeople);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="add-person">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td><input type="text" value={person.name} onChange={(e) => handleChange(index, 'name', e.target.value)} /></td>
              <td><input type="date" value={person.dob} onChange={(e) => handleChange(index, 'dob', e.target.value)} /></td>
              <td><input type="text" value={person.aadhar} onChange={(e) => handleChange(index, 'aadhar', e.target.value)} /></td>
              <td><input type="text" value={person.mobile} onChange={(e) => handleChange(index, 'mobile', e.target.value)} /></td>
              <td>{person.age}</td>
              <td>
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAddRow}>Add New Person</button>
    </div>
  );
}

export default AddPerson;
