
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available. In a real-world scenario,
// this would be managed through a secure process and not hardcoded.
// For this example, we assume `process.env.API_KEY` is set in the environment.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a portfolio project idea using Gemini based on the provided CV.
 * @param cvText The user's CV as a string.
 * @returns A string containing the generated project idea in Markdown format.
 */
export const generateProjectIdea = async (cvText: string): Promise<string> => {
  const model = "gemini-2.5-flash";

  const prompt = `
Tu es un expert en conception de projets web modernes et un recruteur technique chevronné.
Un développeur web a fourni son CV. Ta mission est de lui proposer un projet de portfolio concret, pertinent et moderne à réaliser avec Next.js.

Le projet doit impérativement :
- Mettre en valeur ses compétences clés (front-end, back-end, base de données, SIG, DevOps, etc.).
- Être réalisable par une personne en 2 à 4 semaines.
- Utiliser Next.js, TypeScript et Tailwind CSS comme base.
- Avoir une UI/UX professionnelle, moderne et responsive.
- Être suffisamment impressionnant pour attirer l'attention des recruteurs pour des postes full-stack ou sur des systèmes d'information avancés.
- Cibler une problématique réelle et proposer une solution élégante.

Analyse le CV ci-dessous et génère une proposition de projet détaillée.
Structure ta réponse EXACTEMENT comme suit, en utilisant Markdown pour la mise en forme. N'ajoute aucune introduction ou conclusion en dehors de cette structure.

### 💡 Titre du Projet
[Un titre clair et accrocheur pour le projet]

### 📝 Résumé du Projet
**Problématique :** [Décris le problème que le projet résout en 1-2 phrases.]
**Solution Apportée :** [Décris la solution proposée par l'application en 1-2 phrases.]
**Cas d’Usage :** [Donne un exemple concret d'utilisation.]

### ✨ Fonctionnalités Principales
- [Fonctionnalité clé 1]
- [Fonctionnalité clé 2]
- [Fonctionnalité clé 3]
- [Fonctionnalité clé 4]
- [Fonctionnalité clé 5]

### 🛠️ Technologies Recommandées
- **Framework Principal :** Next.js (App Router)
- **Langage :** TypeScript
- **Base de Données :** [Suggère une BDD pertinente, ex: PostgreSQL avec PostGIS si SIG]
- **ORM :** Prisma
- **Styling :** Tailwind CSS
- **Authentification :** [Suggère une solution, ex: NextAuth.js]
- **Déploiement :** Vercel
- **Cartographie (si pertinent) :** [Suggère une lib, ex: Mapbox GL JS, Leaflet]

### 🗓️ Plan de Développement (4 semaines)
- **Semaine 1 :** [Tâches pour la semaine 1 : Setup, Modélisation, UI de base]
- **Semaine 2 :** [Tâches pour la semaine 2 : Fonctionnalités cœur]
- **Semaine 3 :** [Tâches pour la semaine 3 : Fonctionnalités avancées, authentification]
- **Semaine 4 :** [Tâches pour la semaine 4 : Tests, Polissage UI/UX, Déploiement, README]

### 🚀 Fonctionnalités Bonus
- [Idée de fonctionnalité avancée 1 pour impressionner]
- [Idée de fonctionnalité avancée 2 pour aller plus loin]

---
CV DE L'UTILISATEUR :
\`\`\`
${cvText}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    // In a real app, you might want to throw a more specific error
    throw new Error("Failed to generate project idea from Gemini API.");
  }
};
