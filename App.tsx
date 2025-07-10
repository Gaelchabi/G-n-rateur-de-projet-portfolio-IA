
import React, { useState, useCallback } from 'react';
import { generateProjectIdea } from './services/geminiService';
import { CVInput } from './components/CVInput';
import { ProjectDisplay } from './components/ProjectDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ProjectIdea } from './types';
import { parseGeminiResponse } from './utils/parser';

const App: React.FC = () => {
  const initialCV = `Nom : CHABI K. Gaël
Poste : Développeur Web Full Stack (Angular)
Expérience : +4 ans
Stack principale : Angular, TypeScript, PostgreSQL, SIG, Docker, Git, CI/CD, Linux
Projets réalisés : systèmes d'information web (énergie, judiciaire), déploiement de SIG, documentation technique, encadrement
Méthodes : Agile / Scrum
Formations : Licence en Génie Logiciel, Oracle/SQL Server
Centres d’intérêt : Innovation technologique, open source, jeux vidéo, veille technologique`;

  const [cv, setCv] = useState<string>(initialCV);
  const [projectIdea, setProjectIdea] = useState<ProjectIdea | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!cv.trim()) {
      setError("Veuillez entrer votre CV pour générer une idée.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setProjectIdea(null);

    try {
      const resultText = await generateProjectIdea(cv);
      const parsedIdea = parseGeminiResponse(resultText);
      setProjectIdea(parsedIdea);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la communication avec l'API Gemini. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  }, [cv]);

  const handleReset = () => {
    setProjectIdea(null);
    setError(null);
    // Keep the CV in the textarea for easy modification
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-teal-500/80 selection:text-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdb] to-[#1d4ed8] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
        
        <main className="mx-auto max-w-4xl py-12 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl flex items-center justify-center gap-4">
              <SparklesIcon className="h-10 w-10 text-teal-400" />
              Projet Portfolio sur Mesure
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Transformez votre CV en une idée de projet de développement web innovante et pertinente grâce à l'IA.
            </p>
          </div>

          <div className="mt-16 flow-root">
            {error && (
              <div className="my-4 rounded-md border border-red-500 bg-red-900/20 p-4 text-center text-red-300">
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <LoadingSpinner />
            ) : projectIdea ? (
              <div className="flex flex-col items-center gap-8">
                  <ProjectDisplay idea={projectIdea} />
                  <button
                    onClick={handleReset}
                    className="rounded-md bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-colors duration-200"
                  >
                    Générer une autre idée
                  </button>
              </div>
            ) : (
              <CVInput cv={cv} setCv={setCv} onSubmit={handleGenerate} isLoading={isLoading} />
            )}
          </div>
        </main>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1d4ed8] to-[#80ffdb] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                }}
            />
        </div>

      </div>
    </div>
  );
};

export default App;
