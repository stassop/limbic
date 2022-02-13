import React from 'react';
import { useSelector } from 'react-redux';

import '../styles/PatientList.css';

import { Patient } from '../types';
import { State } from '../reducers';
import PatientListItem from './PatientListItem';

const PatientList: React.FC = () => {
  const patients: Patient[] = useSelector((state: State) => state.patients);
  const selectedPatientId: number | null = useSelector((state: State) => state.selectedPatientId);

  return (
    <div className="PatientList">
      <h3>My Patients</h3>
      <ul>
        { patients.map((patient: Patient) => (
            <li key={patient.id}>
              <PatientListItem
                { ...patient }
                isSelected={patient.id === selectedPatientId}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default PatientList;
