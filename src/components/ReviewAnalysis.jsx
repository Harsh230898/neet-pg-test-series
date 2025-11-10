// src/components/ReviewAnalysis.jsx
import React, { useContext } from 'react';
import { CheckCircle, TrendingDownIcon, Brain, Share2, ChevronRight } from 'lucide-react';
import UIContext from '../context/UIContext';

const ReviewAnalysis = ({ question, userIncorrect = true }) => {
  const { getCardStyle, getTextColor } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const mockCGB = {
    isIncorrect: userIncorrect,
    rootGap: 'Pathophysiology of Portal Hypertension and Liver failure.',
    gapConcept: 'Ascites and edema in cirrhosis are due to portal hypertension, decreased albumin synthesis (decreased oncotic pressure), and renal retention (secondary hyperaldonism).\n The user incorrectly selected Kidney/Heart, indicating a gap in understanding fluid balance in liver disease.',
    sourceLinks: [
      { source: question.source, subject: 'Physiology', concept: 'Portal Vein Pressure Dynamics', link: '#' },
      { source: question.source, subject: 'Pathology', concept: 'Fluid Balance in Cirrhosis (Video Lecture 4)', link: '#' },
      { source: 'Marrow', subject: 'Medicine', concept: 'Management of Decompensated Chronic Liver Disease', link: '#' },
    ]
  };

  if (question.id !== 1 || !userIncorrect) return (
    <div className={`mt-8 p-6 rounded-3xl border ${CardStyle.bg} ${CardStyle.border}`}>
      <h3 className="text-xl font-black text-emerald-500 flex items-center gap-3">
        <CheckCircle className="w-5 h-5" /> Excellent! You correctly identified the source of failure.
      </h3>
    </div>
  );

  return (
    <div className={`mt-8 p-6 rounded-3xl border ${CardStyle.bg} ${CardStyle.border}`}>
      <h3 className="text-2xl font-black mb-4 flex items-center gap-3 border-b pb-2 text-rose-600 dark:text-rose-300">
        <TrendingDownIcon className="w-6 h-6" /> Concept-Gap-Bridge (CGB) AI Diagnostic
      </h3>
      
      <div className="p-4 mb-4 rounded-xl bg-red-50/70 dark:bg-red-900/40 border border-red-300 dark:border-red-700">
        <h4 className="font-bold text-red-700 dark:text-red-300 mb-1 flex items-center gap-2"><Brain className="w-4 h-4"/> Root Knowledge Gap:</h4>
        <p className="text-lg font-medium">{mockCGB.rootGap}</p>
      </div>

      <p className={getTextColor('text-sm text-slate-700 mb-4', 'text-slate-400') + ' italic'}>
        {mockCGB.gapConcept}
      </p>

      <h3 className="text-xl font-black mb-3 flex items-center gap-3 border-t pt-4 text-blue-600 dark:text-blue-300">
        <Share2 className="w-5 h-5" /> Clinical Correlation & Concept Links
      </h3>
      <p className={getTextColor('text-sm text-slate-600 mb-4', 'text-slate-400') + ' italic'}>
        Prioritized concept links from **{question.source}** to bridge your gap:
      </p>
      <div className="space-y-3">
        {mockCGB.sourceLinks.map((item, i) => (
          <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex justify-between items-center hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors cursor-pointer">
            <p className={getTextColor('text-sm font-medium text-slate-700', 'text-slate-300')}>
              <span className="font-bold text-purple-600 dark:text-purple-400">[{item.source} - {item.subject}]</span> {item.concept}
            </p>
            <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAnalysis;