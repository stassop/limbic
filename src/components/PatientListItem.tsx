import React from 'react';

import { Patient } from '../types';

interface PatientListItemProps extends Patient {
  isSelected: boolean,
  onSelect: () => void,
}

const PatientListItem: React.FC<PatientListItemProps> = ({
  name,
  isActive,
  lastActive,
  isSelected,
  onSelect,
}: PatientListItemProps) => {
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
