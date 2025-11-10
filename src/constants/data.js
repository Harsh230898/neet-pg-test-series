// src/constants/data.js
export const ALL_SUBJECTS = [
  { 
    name: 'Anatomy', 
    icon: '𫁀', 
    color: 'from-rose-300 to-pink-300', 
    modules: ['Head & Neck', 'Thorax', 'Abdomen'], 
    subtopics: ['Skull', 'Cervical Plexus', 'Lungs', 'Heart', 'Liver', 'Kidneys'],
    aiSummary: "Anatomy is the study of the structure of the human body. The thorax includes the heart and lungs; the abdomen houses major viscera like the liver and stomach. Mastering regional anatomy is crucial for surgery and imaging interpretation.",
    topicAccuracy: 85,
    weaknessTopic: 'Cervical Plexus'
  },
  { 
    name: 'Physiology', 
    icon: '⚡', 
    color: 'from-sky-300 to-blue-300', 
    modules: ['Cardiovascular', 'Respiratory', 'Renal'], 
    subtopics: ['Cardiac Cycle', 'ECG', 'Blood Pressure', 'Lung Volumes', 'GFR'],
    aiSummary: "Physiology investigates the mechanics and chemistry of body functions. Cardiovascular topics focus on pump efficiency (Cardiac Cycle) and electrical activity (ECG).",
    topicAccuracy: 68,
    weaknessTopic: 'Cardiac Cycle'
  },
  { 
    name: 'Pharmacology', 
    icon: '💊', 
    color: 'from-purple-300 to-fuchsia-300', 
    modules: ['CNS', 'CVS', 'Antimicrobials'], 
    subtopics: ['Anti-epileptics', 'Opioids', 'ACE Inhibitors', 'Beta Blockers', 'Penicillins', 'Aminoglycosides'],
    aiSummary: "Pharmacology covers drug actions, effects, and uses.\n Focus areas include autonomic drugs (ACE, Beta Blockers) and management of infections (Antimicrobials).",
    topicAccuracy: 58,
    weaknessTopic: 'Beta Blockers'
  },
  { name: 'Biochemistry', icon: '🧬', color: 'from-emerald-300 to-teal-300', modules: ['Metabolism', 'Proteins'], subtopics: ['Krebs Cycle', 'Glycolysis', 'Amino Acids'], aiSummary: "The chemistry of life, covering metabolic pathways like the Krebs cycle and the structure and function of proteins.", topicAccuracy: 78, weaknessTopic: 'Krebs Cycle' },
  { name: 'Pathology', icon: '🔬', color: 'from-orange-300 to-amber-300', modules: ['General Pathology', 'Systemic'], subtopics: ['Inflammation', 'Cell Injury', 'Hematology'], aiSummary: "The study of disease mechanisms, involving cellular changes (injury, inflammation) and systemic \n manifestations (e.g., hematologic disorders).", topicAccuracy: 62, weaknessTopic: 'Hematology' },
  { name: 'Microbiology', icon: '🦠', color: 'from-lime-300 to-green-300', modules: ['Bacteriology', 'Virology'], subtopics: ['Gram Positive', 'Gram Negative', 'HIV'], aiSummary: "Focuses on microorganisms and immunity, covering bacterial classification (Gram stain) and viral diseases (HIV, Hepatitis).", topicAccuracy: 65, weaknessTopic: 'Gram Negative' },
  { name: 'Medicine', icon: '🏥', color: 'from-indigo-300 to-blue-300', modules: ['Cardiology', 'Neurology'], subtopics: ['MI', 'Arrhythmias', 'Stroke'], aiSummary: "Clinical diagnosis and non-surgical management of internal diseases, including cardiovascular emergencies (MI) and neurological deficits (Stroke).", topicAccuracy: 75, weaknessTopic: 'Arrhythmias' },
  { name: 'Surgery', icon: '🔪', color: 'from-red-300 to-rose-300', modules: ['General Surgery', 'Urology'], 
    subtopics: ['Appendicitis', 'Hernia', 'Prostate Cancer'], aiSummary: "Diagnosis and treatment of diseases requiring operative intervention.", topicAccuracy: 70, weaknessTopic: 'Prostate Cancer' },
  { name: 'Obstetrics & Gyn', icon: '👶', color: 'from-pink-300 to-rose-300', modules: ['Obstetrics', 'Gynecology'], subtopics: ['Labor', 'PPH', 'Contraception'], aiSummary: "Management of pregnancy (Obstetrics) and female reproductive health (Gynecology).", topicAccuracy: 80, weaknessTopic: 'PPH' },
  { name: 'Pediatrics', icon: '🧸', color: 'from-amber-300 to-yellow-300', modules: ['Neonatology', 'Development'], subtopics: ['Jaundice', 'RDS', 'Immunization'], aiSummary: "Care for infants, children, and adolescents, covering neonatal conditions and preventative medicine.", topicAccuracy: 72, weaknessTopic: 'RDS' },
  { name: 'Ophthalmology', icon: '👁️', color: 'from-violet-300 to-purple-300', modules: ['Anterior Segment', 'Posterior Segment'], subtopics: ['Cataract', 'Glaucoma', 'Retina'], aiSummary: "Focuses on the eye, including lens disorders (Cataract) and increased intraocular pressure (Glaucoma).", topicAccuracy: 69, weaknessTopic: 'Glaucoma' },
  { name: 'ENT', icon: '👂', color: 'from-fuchsia-300 to-pink-300', modules: ['Ear', 'Nose', 'Throat'], subtopics: ['Otitis Media', 'Vertigo', 'Tonsillitis'], aiSummary: "Study of ear, nose, and throat disorders, including common infections and balance issues.", topicAccuracy: 74, weaknessTopic: 'Vertigo' },
  { name: 'Dermatology', icon: '🩹', color: 'from-teal-300 to-cyan-300', modules: ['Dermatitis', 'Infections'], subtopics: ['Eczema', 'Psoriasis', 'Fungal'], aiSummary: "Diagnosis and treatment of skin, hair, and nail conditions, from inflammatory conditions to fungal infections.", topicAccuracy: 71, weaknessTopic: 'Psoriasis' },
  { 
    name: 'Psychiatry', icon: '🧠', color: 'from-purple-300 to-indigo-300', modules: ['Psychosis', 'Mood Disorders'], subtopics: ['Schizophrenia', 'Bipolar', 'Anxiety'], aiSummary: "The study of mental disorders, covering conditions affecting thought processes (Psychosis) and emotion (Mood Disorders).", topicAccuracy: 76, weaknessTopic: 'Schizophrenia' },
  { name: 'Orthopedics', icon: '🦴', color: 'from-orange-300 to-red-300', modules: ['Trauma', 'Spine'], subtopics: ['Fractures', 'Dislocations', 'Scoliosis'], aiSummary: "Deals with the musculoskeletal system, commonly focusing on traumatic injuries and congenital disorders.", topicAccuracy: 67, weaknessTopic: 'Fractures' },
  { name: 'Radiology', icon: '📡', color: 'from-blue-300 to-indigo-300', modules: ['CNS', 'Chest'], subtopics: ['CT Head', 'MRI Spine', 'CXR Interpretation'], aiSummary: "Medical imaging techniques used for diagnosis, from plain films (CXR) to advanced cross-sectional imaging (CT/MRI).", topicAccuracy: 79, weaknessTopic: 'CXR Interpretation' },
  { name: 'Anesthesia', icon: '💉', color: 'from-cyan-300 to-blue-300', modules: ['General Anesthesia', 'Regional'], subtopics: ['Airway', 'Monitoring', 'Spinal Block'], aiSummary: "Management of perioperative care, pain control, and critical care.", topicAccuracy: 63, weaknessTopic: 'Airway' }
];

export const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];
export const COGNITIVE_SKILL_OPTIONS = ['Pure Recall', 'Diagnostic Reasoning', 'Clinical/Image Based'];
export const Q_BANK_SOURCES = ['Marrow', 'Prepladder', 'Cerebellum', 'EPW Dams'];
export const TIME_PER_QUESTION_SECONDS = 60;
export const TOTAL_TEST_MINUTES = 200;

export const MOCK_QUESTIONS = [
  { id: 1, question: "A patient develops pedal edema, jaundice, and spider angiomata. Which primary site of organ failure is suggested?", options: ["Kidney", "Heart", "Liver", "Lungs"], answer: 3, subject: 'Medicine', subtopic: 'Liver', source: 'Marrow', keywords: 'jaundice, edema, liver, spider angiomata' },
  { id: 2, question: "The primary site of action of loop diuretics is the:", options: ["Proximal tubule", "Ascending limb of loop of Henle", "Distal tubule", "Collecting duct"], answer: 2, subject: 'Pharmacology', subtopic: 'Diuretics', source: 'Prepladder', keywords: 'loop diuretics, renal, kidney' },
  { id: 3, question: "Identify the structure marked by the arrow in the provided CT image. This patient presents with signs suggestive of **Parkinson's** disease.", options: ["Aorta", "Pulmonary Artery", "Superior Vena Cava", "Trachea"], answer: 1, subject: 'Radiology', subtopic: 'CT Head', source: 'Cerebellum',
    questionImage: "https://placehold.co/800x450/4B5563/FFFFFF?text=CT+Image+of+Brain+Hemorrhage", keywords: 'CT, image, Parkinson\'s, neurology' 
  },
  { id: 4, question: "The most common organism causing community-acquired pneumonia in a previously healthy adult is:", options: ["Mycoplasma pneumoniae", "Streptococcus pneumoniae", "Haemophilus influenzae", "Chlamydophila pneumoniae"], answer: 2, subject: 'Microbiology', subtopic: 'Bacteriology', source: 'EPW Dams', keywords: 'pneumonia, infectious, microbiology' }
];

export const MOCK_CASE = {
  id: 1,
  name: "Acute Chest Pain",
  source: "Prepladder Clinical Scenarios",
  steps: [
    {
      title: "Initial Presentation",
      prompt: "A 55-year-old man presents to the emergency department complaining of severe, crushing **chest pain** radiating to his left arm for the past hour. He is diaphoretic.",
      action: "Select your first diagnostic step:",
      options: [
        { label: "Detailed History and Risk Factors", nextStep: 1 },
        { label: "Immediate ECG and Cardiac Enzymes", nextStep: 2 },
        { label: "Administer high-flow Oxygen", nextStep: 3 },
      ]
    },
    {
      title: "Step 1: History and Risk Factors",
      prompt: "The patient reports a history of hypertension, hyperlipidemia, and smoking for 30 years. He denies any recent trauma. His father had a heart attack at age 58. This step consumed 5 minutes.",
      action: "What is your next step?",
      options: [
        { label: "Move to Physical Examination", nextStep: 3 },
        { label: "Order ECG and Cardiac Enzymes", nextStep: 2 },
      ]
    },
    {
      title: "Step 2: ECG & Labs Result",
      prompt: "ECG shows **ST-segment elevation** in leads V1-V4.\n Cardiac troponins are elevated. This confirms an **Anterior ST-Elevation Myocardial Infarction (STEMI)**.",
      action: "Final Diagnosis Reached.",
      options: [{ label: "Review Case Summary", nextStep: 4 }]
    },
    {
      title: "Step 3: Physical Examination",
      prompt: "BP: 150/90 mmHg, HR: 110 bpm, RR: 22/min.\n The patient is anxious. Cardiac auscultation is normal. Peripheral pulses are strong.\n This step consumed 5 minutes.",
      action: "What is your next step?",
      options: [
        { label: "Order ECG and Cardiac Enzymes", nextStep: 2 },
        { label: "Administer aspirin and nitrates", nextStep: 2 },
      ]
    },
    {
      title: "Case Summary & Review",
      prompt: "Final Diagnosis: **Anterior STEMI**.\n Time to diagnosis: 10 minutes (Optimal: <15 mins). Treatment priority is immediate reperfusion (PCI/Thrombolysis).\n Review key concepts in Cardiology.",
      action: "End of Encounter.",
      options: [{ label: "Return to Encounters List", nextStep: 5 }]
    }
  ]
};

export const FLASHCARD_JSON_SCHEMA = {
  "type": "object",
  "properties": {
    "flashcards": {
      "type": "array",
      "description": "An array containing exactly 10 high-yield NEET PG flashcard objects.",
      "items": {
        "type": "object",
        "properties": {
          "cue": { "type": "string", "description": "The prompt/question (front side of the card)." },
          "answer": { "type": "string", "description": "The concise, accurate answer (back side of the card)." },
          "highYieldNote": { "type": "string", "description": "A golden point, mnemonic, or clinical pearl. Can be empty." },
          "subject": { "type": "string", "description": "The single primary medical subject (e.g., 'Pharmacology')." },
          "tags": { "type": "array", "description": "2-3 relevant medical sub-topics/keywords for filtering.", "items": { "type": "string" } }
        },
        "required": ["cue", "answer", "highYieldNote", "subject", "tags"]
      }
    }
  },
  "required": ["flashcards"]
};