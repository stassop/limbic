import React from 'react';
import { useDispatch } from 'react-redux';

import { Patient } from '../types';
import { selectPatient } from '../actions';

interface PatientListItemProps extends Patient {
  isSelected: boolean,
}

const PatientListItem: React.FC<PatientListItemProps> = ({
  id,
  name,
  isActive,
  lastActive,
  isSelected,
}: PatientListItemProps) => {
  const dispatch = useDispatch();

  const onSelect = () => {
    dispatch(selectPatient(isSelected ? null : id));
  };

  return (
    <div
      className={`PatientList-item ${isSelected ? 'PatientList-item-selected' : ''}`}
      onClick={onSelect}
    >
      <b>{name}</b><br />
      { isActive
        ? <small>Active now</small>
        : <small>Last active: {new Date(lastActive).toLocaleDateString()}</small>
      }
    </div>
  );
}

export default PatientListItem;
