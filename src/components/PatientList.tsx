import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../styles/PatientList.css';

import { Patient } from '../types';
import { State } from '../reducers';
import { selectPatient } from '../actions';
import PatientListItem from './PatientListItem';

const PatientList: React.FC = () => {
  const dispatch = useDispatch();
  const patients: Patient[] = useSelector((state: State) => state.patients);
  const selectedPatientId: number | null = useSelector((state: State) => state.selectedPatientId);

  const onSelect = (patientId: number) => {
    dispatch(selectPatient(patientId === selectedPatientId ? null : patientId));
  };

  return (
    <div className="PatientList">
      <h3>My Patients</h3>
      <ul>
        { patients.map((patient: Patient) => (
            <li key={patient.id}>
              <PatientListItem
                { ...patient }
                isSelected={patient.id === selectedPatientId}
                onSelect={() => onSelect(patient.id)}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default PatientList;
