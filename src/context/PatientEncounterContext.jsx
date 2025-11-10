// src/context/PatientEncounterContext.jsx
import React, { useState, useContext, createContext } from 'react';
import UIContext from './UIContext';

const PatientEncounterContext = createContext();

export const PatientEncounterProvider = ({ children }) => {
  const uiContext = useContext(UIContext);
  const [activeCase, setActiveCase] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [caseHistory, setCaseHistory] = useState([]);

  const startEncounter = (caseData) => {
    setActiveCase(caseData);
    setCurrentStep(0);
    setCaseHistory([]);
    if (uiContext) {
      uiContext.setCurrentView('patient-encounters');
    }
  };

  const handleCaseAction = (label, nextStep) => {
    const currentStepData = activeCase.steps[currentStep];
    setCaseHistory(prev => [...prev, { step: currentStepData.title, actionTaken: label }]);
    
    if (nextStep === 5) {
      setActiveCase(null);
      if (uiContext) {
        uiContext.setCurrentView('home');
      }
    } else {
      setCurrentStep(nextStep);
    }
  };

  return (
    <PatientEncounterContext.Provider value={{ activeCase, currentStep, caseHistory, startEncounter, handleCaseAction }}>
      {children}
    </PatientEncounterContext.Provider>
  );
};

export default PatientEncounterContext;