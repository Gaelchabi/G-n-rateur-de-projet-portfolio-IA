
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface CVInputProps {
  cv: string;
  setCv: (cv: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CVInput: React.FC<CVInputProps> = ({ cv, setCv, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <label htmlFor="cv-input" className="text-sm font-medium text-slate-300">
          Collez votre CV ci-dessous ou décrivez vos compétences et expériences.
        </label>
        <div className="relative">
          <textarea
            id="cv-input"
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            placeholder="Ex: Développeur Full Stack avec 5 ans d'expérience en React, Node.js, et AWS. Intérêt pour la FinTech..."
            rows={15}
            className="w-full p-4 pr-10 bg-slate-800/50 border border-slate-700 rounded-lg shadow-inner focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 resize-none placeholder:text-slate-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-3 px-4 text-base font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <SparklesIcon className="h-5 w-5 text-teal-300 group-hover:text-teal-200 transition-colors" />
          </span>
          {isLoading ? 'Génération en cours...' : 'Générer mon projet'}
        </button>
      </div>
    </form>
  );
};
