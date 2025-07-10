
import { ProjectIdea } from '../types';

/**
 * Parses the raw Markdown string from Gemini into a structured ProjectIdea object.
 * @param text The raw text response from the Gemini API.
 * @returns A ProjectIdea object.
 */
export const parseGeminiResponse = (text: string): ProjectIdea => {
  const sections = text.split('### ').slice(1); // Split by ### and remove the first empty element

  const getSectionContent = (title: string): string => {
    const section = sections.find(s => s.trim().startsWith(title));
    if (!section) return `Section "${title}" non trouvée.`;
    return section.substring(title.length).trim();
  };

  return {
    title: getSectionContent('💡 Titre du Projet'),
    summary: getSectionContent('📝 Résumé du Projet'),
    features: getSectionContent('✨ Fonctionnalités Principales'),
    tech: getSectionContent('🛠️ Technologies Recommandées'),
    plan: getSectionContent('🗓️ Plan de Développement (4 semaines)'),
    bonus: getSectionContent('🚀 Fonctionnalités Bonus'),
  };
};
