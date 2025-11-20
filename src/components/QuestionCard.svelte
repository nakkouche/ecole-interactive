<script lang="ts">
  import type { QCMOption } from '../lib/qcmParser';

  export let questionNumber: number;
  export let question: string;
  export let options: QCMOption[];
  export let selectedAnswer: number | null = null;
  export let showResult: boolean = false;
  export let onSelectAnswer: (index: number) => void;

  function handleSelect(index: number) {
    if (!showResult) {
      onSelectAnswer(index);
    }
  }

  function isSelected(index: number): boolean {
    return index === selectedAnswer;
  }

  function isCorrectAnswer(option: QCMOption): boolean {
    return showResult && option.isCorrect;
  }

  function isIncorrectAnswer(index: number, option: QCMOption): boolean {
    return showResult && index === selectedAnswer && !option.isCorrect;
  }

  function getOptionIcon(index: number, option: QCMOption): string {
    if (showResult) {
      if (option.isCorrect) return '✅';
      if (index === selectedAnswer && !option.isCorrect) return '❌';
    }
    if (index === selectedAnswer && !showResult) {
      return '✓';
    }
    return '';
  }
</script>

<div class="rounded-3xl bg-white p-8 shadow-lg">
  <div class="mb-6">
    <span class="rounded-full bg-primary-500 px-4 py-2 text-lg font-bold text-white">
      Question {questionNumber}
    </span>
  </div>

  <h3 class="mb-6 text-2xl font-bold text-gray-800">{question}</h3>

  <div class="space-y-4">
    {#each options as option, index}
      <button
        on:click={() => handleSelect(index)}
        class="w-full rounded-xl p-4 text-left text-lg transition-all duration-300 cursor-pointer"
        class:border-4={!isSelected(index) || showResult}
        class:border-8={isSelected(index) && !showResult}
        class:bg-white={!isSelected(index) && !showResult}
        class:border-gray-300={!isSelected(index) && !showResult}
        class:hover:bg-gray-50={!isSelected(index) && !showResult}
        class:hover:border-gray-400={!isSelected(index) && !showResult}
        class:bg-secondary-200={isSelected(index) && !showResult}
        class:border-secondary-600={isSelected(index) && !showResult}
        class:text-secondary-800={isSelected(index) && !showResult}
        class:font-bold={isSelected(index) || showResult}
        class:shadow-2xl={isSelected(index) && !showResult}
        class:ring-4={isSelected(index) && !showResult}
        class:ring-secondary-300={isSelected(index) && !showResult}
        class:scale-[1.02]={isSelected(index) && !showResult}
        class:bg-success-100={isCorrectAnswer(option)}
        class:border-success-500={isCorrectAnswer(option)}
        class:bg-danger-100={isIncorrectAnswer(index, option)}
        class:border-danger-500={isIncorrectAnswer(index, option)}
        class:bg-gray-100={showResult && !option.isCorrect && index !== selectedAnswer}
        class:opacity-50={showResult && !option.isCorrect && index !== selectedAnswer}
        disabled={showResult}
      >
        <span class="flex items-center justify-between">
          <span>{option.text}</span>
          {#if getOptionIcon(index, option)}
            <span class="text-3xl font-bold text-secondary-600">{getOptionIcon(index, option)}</span>
          {/if}
        </span>
      </button>
    {/each}
  </div>
</div>
