import { writable } from 'svelte/store';

export interface QCMResult {
  qcmId: string;
  score: number;
  maxScore: number;
  date: string;
  reponses: {
    questionIndex: number;
    correct: boolean;
  }[];
}

export interface Progression {
  [userId: string]: {
    [qcmId: string]: QCMResult[];
  };
}

// Récupération depuis localStorage
const storedProgression =
  typeof window !== 'undefined' ? localStorage.getItem('ecole_progression') : null;
const initialProgression: Progression = storedProgression ? JSON.parse(storedProgression) : {};

// Store pour la progression
export const progressionStore = writable<Progression>(initialProgression);

// Sauvegarde automatique dans localStorage
if (typeof window !== 'undefined') {
  progressionStore.subscribe((progression) => {
    localStorage.setItem('ecole_progression', JSON.stringify(progression));
  });
}

// Fonctions utilitaires
export function saveQCMResult(userId: string, result: QCMResult) {
  progressionStore.update((progression) => {
    if (!progression[userId]) {
      progression[userId] = {};
    }
    if (!progression[userId][result.qcmId]) {
      progression[userId][result.qcmId] = [];
    }
    progression[userId][result.qcmId].push(result);
    return progression;
  });
}

export function getQCMHistory(userId: string, qcmId: string): QCMResult[] {
  let history: QCMResult[] = [];
  progressionStore.subscribe((progression) => {
    history = progression[userId]?.[qcmId] || [];
  })();
  return history;
}

export function getUserStats(userId: string) {
  let stats = {
    totalQCMs: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
  };

  progressionStore.subscribe((progression) => {
    const userProgression = progression[userId] || {};
    const allResults = Object.values(userProgression).flat();

    stats.totalQCMs = allResults.length;
    stats.totalQuestions = allResults.reduce(
      (sum, result) => sum + result.reponses.length,
      0
    );
    stats.correctAnswers = allResults.reduce(
      (sum, result) => sum + result.reponses.filter((r) => r.correct).length,
      0
    );
    stats.averageScore =
      allResults.length > 0
        ? allResults.reduce((sum, result) => sum + (result.score / result.maxScore) * 100, 0) /
          allResults.length
        : 0;
  })();

  return stats;
}

export function clearProgression() {
  progressionStore.set({});
}
