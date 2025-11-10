// src/views/PatientEncountersView.jsx
import React, { useContext } from 'react';
import { UserCheck, Maximize2, Layers } from 'lucide-react';
import UIContext from '../context/UIContext';
import PatientEncounterContext from '../context/PatientEncounterContext';
import { MOCK_CASE } from '../constants/data';

const PatientEncountersView = () => {
  const { getTextColor, getCardStyle } = useContext(UIContext);
  const { activeCase, currentStep, caseHistory, startEncounter, handleCaseAction } = useContext(PatientEncounterContext);
  const CardStyle = getCardStyle();

  if (!activeCase) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className={`text-4xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>Virtual Patient Encounters</h2>
          <p className={getTextColor('text-xl text-slate-600', 'text-slate-400')}>High-fidelity clinical case simulations from your source materials.</p>
        </div>
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 lg:p-12 border`}>
          <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-blue-500" /> Available Scenarios
          </h3>
          <div className="space-y-4">
            <div className="p-6 bg-blue-50/50 dark:bg-blue-900/50 rounded-2xl border border-blue-300 dark:border-blue-700 flex justify-between items-center">
              <div>
                <h4 className="font-black text-xl text-blue-800 dark:text-blue-300">{MOCK_CASE.name} Case</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Source: {MOCK_CASE.source} | Core Subject: Medicine</p>
              </div>
              <button
                onClick={() => startEncounter(MOCK_CASE)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
              >
                Start Encounter
              </button>
            </div>
            <div className="p-6 bg-slate-100 dark:bg-slate-700 rounded-2xl border border-slate-300 dark:border-slate-600 flex justify-between items-center opacity-70 cursor-not-allowed">
              <div>
                <h4 className="font-black text-xl text-slate-800 dark:text-slate-300">Case 2: Post-Op Fever</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Source: Marrow Surgical Scenarios | Core Subject: Surgery</p>
              </div>
              <span className="text-sm font-semibold text-orange-500">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const stepData = activeCase.steps[currentStep];
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border border-purple-400 dark:border-purple-700`}>
          <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 mb-2">Patient Encounter: {activeCase.name}</h3>
          <h2 className={`text-4xl font-black mb-6 ${CardStyle.text}`}>{stepData.title}</h2>
          <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 mb-6">
            <p className="text-lg font-medium italic" dangerouslySetInnerHTML={{ __html: stepData.prompt.replace(/\n/g, '<br/>') }} />
          </div>
          <h4 className="text-xl font-black mb-4 flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-rose-500"/> {stepData.action}
          </h4>
          <div className="space-y-3">
            {stepData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleCaseAction(option.label, option.nextStep)}
                className="w-full text-left p-4 rounded-xl border-2 bg-white hover:bg-pink-50 border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 font-semibold transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 space-y-6">
        <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border h-full`}>
          <h3 className="text-2xl font-black mb-4 border-b pb-2 flex items-center gap-2">
            <Layers className="w-6 h-6 text-orange-500"/> Encounter Log
          </h3>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {caseHistory.length === 0 && (
              <p className="text-slate-500 dark:text-slate-400 italic">No actions taken yet. Start the case!</p>
            )}
            {caseHistory.slice().reverse().map((item, index) => (
              <div key={index} className="p-3 border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-slate-700/50 rounded-lg">
                <p className="font-bold text-sm text-orange-700 dark:text-orange-400 mb-1">{item.step}</p>
                <p className="text-sm text-slate-800 dark:text-slate-200">{item.actionTaken}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEncountersView;