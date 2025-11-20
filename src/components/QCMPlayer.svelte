<script lang="ts">
  import { onMount } from 'svelte';
  import type { QCM } from '../lib/qcmParser';
  import { userStore } from '../stores/userStore';
  import { saveQCMResult } from '../stores/progressionStore';
  import QuestionCard from './QuestionCard.svelte';
  import ProgressBar from './ProgressBar.svelte';
  import ScoreDisplay from './ScoreDisplay.svelte';

  export let qcm: QCM;

  let currentQuestionIndex = 0;
  let answers: (number | null)[] = new Array(qcm.questions.length).fill(null);
  let showResults = false;
  let score = 0;
  let user: any = null;

  onMount(() => {
    userStore.subscribe((value) => {
      user = value;
    });
  });

  function handleSelectAnswer(answerIndex: number) {
    answers[currentQuestionIndex] = answerIndex;
    answers = [...answers]; // Trigger reactivity by creating a new array reference
  }

  function nextQuestion() {
    if (currentQuestionIndex < qcm.questions.length - 1) {
      currentQuestionIndex++;
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }

  function submitQCM() {
    // Calculer le score
    score = answers.reduce((total, answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const question = qcm.questions[questionIndex];
        const isCorrect = question.options[answerIndex].isCorrect;
        return total + (isCorrect ? 1 : 0);
      }
      return total;
    }, 0);

    // Sauvegarder la progression
    if (user) {
      const userId = `${user.prenom}_${user.classe}`;
      saveQCMResult(userId, {
        qcmId: qcm.frontmatter.id,
        score,
        maxScore: qcm.questions.length,
        date: new Date().toISOString(),
        reponses: answers.map((answerIndex, questionIndex) => ({
          questionIndex,
          correct:
            answerIndex !== null && qcm.questions[questionIndex].options[answerIndex].isCorrect,
        })),
      });
    }

    showResults = true;
    currentQuestionIndex = 0;
  }

  function retry() {
    answers = new Array(qcm.questions.length).fill(null);
    currentQuestionIndex = 0;
    showResults = false;
    score = 0;
  }

  $: allQuestionsAnswered = answers.every((answer) => answer !== null);
  $: currentQuestion = qcm.questions[currentQuestionIndex];
</script>

<div class="mx-auto max-w-3xl">
  {#if !showResults}
    <!-- Mode QCM -->
    <div class="mb-6 rounded-3xl bg-white p-6 shadow-lg">
      <h2 class="mb-2 text-3xl font-bold text-gray-800">{qcm.frontmatter.titre}</h2>
      <p class="text-lg text-gray-600">{qcm.frontmatter.description}</p>
      <div class="mt-4 flex gap-4 text-sm">
        <span class="rounded-full bg-primary-100 px-4 py-2 font-semibold text-primary-700">
          {qcm.frontmatter.matiere}
        </span>
        <span class="rounded-full bg-secondary-100 px-4 py-2 font-semibold text-secondary-700">
          {qcm.frontmatter.niveau}
        </span>
        <span class="rounded-full bg-warning-100 px-4 py-2 font-semibold text-warning-700">
          ⭐ Difficulté: {qcm.frontmatter.difficulte}/5
        </span>
      </div>
    </div>

    <ProgressBar current={currentQuestionIndex + 1} total={qcm.questions.length} />

    <QuestionCard
      questionNumber={currentQuestionIndex + 1}
      question={currentQuestion.question}
      options={currentQuestion.options}
      selectedAnswer={answers[currentQuestionIndex]}
      showResult={false}
      onSelectAnswer={handleSelectAnswer}
    />

    <div class="mt-6 flex justify-between gap-4">
      <button
        on:click={previousQuestion}
        disabled={currentQuestionIndex === 0}
        class="rounded-xl bg-gray-300 px-6 py-3 text-lg font-bold text-gray-700 transition-all hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Précédent
      </button>

      {#if currentQuestionIndex === qcm.questions.length - 1}
        <button
          on:click={submitQCM}
          disabled={!allQuestionsAnswered}
          class="rounded-xl bg-success-500 px-8 py-3 text-lg font-bold text-white transition-all hover:bg-success-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ Valider le QCM
        </button>
      {:else}
        <button
          on:click={nextQuestion}
          disabled={answers[currentQuestionIndex] === null}
          class="rounded-xl bg-primary-500 px-6 py-3 text-lg font-bold text-white transition-all hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant →
        </button>
      {/if}
    </div>
  {:else}
    <!-- Mode Résultats -->
    <div class="mb-8">
      <ScoreDisplay {score} maxScore={qcm.questions.length} />
    </div>

    <div class="mb-6">
      <h3 class="mb-4 text-2xl font-bold text-gray-800">Révision des réponses</h3>
    </div>

    {#each qcm.questions as question, index}
      <div class="mb-6">
        <QuestionCard
          questionNumber={index + 1}
          question={question.question}
          options={question.options}
          selectedAnswer={answers[index]}
          showResult={true}
          onSelectAnswer={() => {}}
        />
      </div>
    {/each}

    <div class="mt-8 flex justify-center gap-4">
      <button
        on:click={retry}
        class="rounded-xl bg-secondary-500 px-8 py-4 text-xl font-bold text-white transition-all hover:bg-secondary-600"
      >
        🔄 Réessayer
      </button>
      <a
        href={`${import.meta.env.BASE_URL}selection`}
        class="rounded-xl bg-primary-500 px-8 py-4 text-xl font-bold text-white transition-all hover:bg-primary-600"
      >
        🏠 Choisir un autre QCM
      </a>
    </div>
  {/if}
</div>
