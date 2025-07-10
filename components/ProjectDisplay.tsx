
import React from 'react';
import { ProjectIdea } from '../types';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import { RocketLaunchIcon } from './icons/RocketLaunchIcon';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';

interface ProjectDisplayProps {
  idea: ProjectIdea;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 shadow-lg">
        <h3 className="flex items-center text-xl font-bold text-teal-400 mb-4">
            {icon}
            <span className="ml-3">{title}</span>
        </h3>
        <div className="prose prose-invert prose-sm sm:prose-base text-slate-300 space-y-3">
            {children}
        </div>
    </div>
);

const ListRenderer: React.FC<{ content: string }> = ({ content }) => (
    <ul className="list-disc list-inside space-y-2">
        {content.split('\n').filter(line => line.trim().startsWith('-')).map((item, index) => (
            <li key={index} className="pl-2">{item.replace(/^- /, '')}</li>
        ))}
    </ul>
);

const SummaryRenderer: React.FC<{ content: string }> = ({ content }) => (
    <div className="space-y-3">
        {content.split('\n').filter(line => line.trim()).map((line, index) => {
            const parts = line.split('**');
            return (
                <p key={index}>
                    <strong className="text-slate-100">{parts[1]}</strong>
                    {parts[2]}
                </p>
            );
        })}
    </div>
);

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ idea }) => {
  if (!idea) return null;

  return (
    <div className="w-full animate-fade-in space-y-8">
      <Section title="Titre du Projet" icon={<LightBulbIcon className="w-6 h-6" />}>
        <h2 className="text-2xl font-bold text-white">{idea.title}</h2>
      </Section>
      
      <Section title="Résumé du Projet" icon={<DocumentTextIcon className="w-6 h-6" />}>
        <SummaryRenderer content={idea.summary} />
      </Section>

      <Section title="Fonctionnalités Principales" icon={<BeakerIcon className="w-6 h-6" />}>
        <ListRenderer content={idea.features} />
      </Section>

      <Section title="Technologies Recommandées" icon={<WrenchScrewdriverIcon className="w-6 h-6" />}>
        <ListRenderer content={idea.tech} />
      </Section>

      <Section title="Plan de Développement" icon={<CalendarDaysIcon className="w-6 h-6" />}>
        <ListRenderer content={idea.plan} />
      </Section>

      <Section title="Fonctionnalités Bonus" icon={<RocketLaunchIcon className="w-6 h-6" />}>
        <ListRenderer content={idea.bonus} />
      </Section>
    </div>
  );
};
