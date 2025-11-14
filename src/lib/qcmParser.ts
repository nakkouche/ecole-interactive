export interface QCMFrontmatter {
  id: string;
  matiere: string;
  niveau: 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2';
  titre: string;
  description: string;
  difficulte: number;
  points: number;
}

export interface QCMOption {
  text: string;
  isCorrect: boolean;
}

export interface QCMQuestion {
  question: string;
  options: QCMOption[];
}

export interface QCM {
  frontmatter: QCMFrontmatter;
  questions: QCMQuestion[];
}

/**
 * Parse le contenu d'un fichier QCM Markdown
 */
export function parseQCM(content: string): QCM {
  // Extraction du frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('Frontmatter manquant dans le fichier QCM');
  }

  const frontmatterText = frontmatterMatch[1];
  const frontmatter = parseFrontmatter(frontmatterText);

  // Extraction du contenu après le frontmatter
  const bodyContent = content.slice(frontmatterMatch[0].length).trim();

  // Parse les questions
  const questions = parseQuestions(bodyContent);

  return {
    frontmatter,
    questions,
  };
}

/**
 * Parse le frontmatter YAML
 */
function parseFrontmatter(frontmatterText: string): QCMFrontmatter {
  const lines = frontmatterText.split('\n');
  const frontmatter: any = {};

  lines.forEach((line) => {
    const match = line.match(/^(\w+):\s*"?([^"]+)"?$/);
    if (match) {
      const [, key, value] = match;
      frontmatter[key] = value.replace(/^"/, '').replace(/"$/, '');
    }
  });

  // Conversion des types
  return {
    id: frontmatter.id,
    matiere: frontmatter.matiere,
    niveau: frontmatter.niveau,
    titre: frontmatter.titre,
    description: frontmatter.description,
    difficulte: parseInt(frontmatter.difficulte),
    points: parseInt(frontmatter.points),
  };
}

/**
 * Parse les questions depuis le contenu Markdown
 */
function parseQuestions(content: string): QCMQuestion[] {
  const questions: QCMQuestion[] = [];
  const questionBlocks = content.split(/## Question \d+/).filter((block) => block.trim());

  questionBlocks.forEach((block) => {
    const lines = block.trim().split('\n');
    const question = lines[0].trim();
    const options: QCMOption[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- [')) {
        const isCorrect = line.startsWith('- [x]');
        const text = line.replace(/^- \[(x| )\] /, '').trim();
        options.push({ text, isCorrect });
      }
    }

    if (question && options.length > 0) {
      questions.push({ question, options });
    }
  });

  return questions;
}

/**
 * Charge tous les QCM disponibles
 */
export async function loadAllQCMs(): Promise<QCM[]> {
  const qcmModules = import.meta.glob('/content/qcm/*.md', { as: 'raw' });
  const qcms: QCM[] = [];

  for (const path in qcmModules) {
    const content = await qcmModules[path]();
    try {
      const qcm = parseQCM(content);
      qcms.push(qcm);
    } catch (error) {
      console.error(`Erreur lors du parsing de ${path}:`, error);
    }
  }

  return qcms;
}

/**
 * Charge un QCM spécifique par son ID
 */
export async function loadQCMById(id: string): Promise<QCM | null> {
  const qcms = await loadAllQCMs();
  return qcms.find((qcm) => qcm.frontmatter.id === id) || null;
}

/**
 * Filtre les QCM par niveau
 */
export function filterQCMsByNiveau(
  qcms: QCM[],
  niveau: 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2'
): QCM[] {
  return qcms.filter((qcm) => qcm.frontmatter.niveau === niveau);
}

/**
 * Filtre les QCM par matière
 */
export function filterQCMsByMatiere(qcms: QCM[], matiere: string): QCM[] {
  return qcms.filter((qcm) => qcm.frontmatter.matiere === matiere);
}

/**
 * Récupère toutes les matières disponibles
 */
export function getMatieres(qcms: QCM[]): string[] {
  const matieres = new Set(qcms.map((qcm) => qcm.frontmatter.matiere));
  return Array.from(matieres).sort();
}
