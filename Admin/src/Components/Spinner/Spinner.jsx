import React from 'react'
import './Spinner.css'
import { AppContextHook } from '../../context/AppState'

const Spinner = () => {
  const { spinner } = AppContextHook();

  if (!spinner) return <></>;

  return (
    <div className="spinner-container">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
