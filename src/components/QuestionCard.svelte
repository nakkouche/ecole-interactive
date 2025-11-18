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

  function getOptionClass(index: number, option: QCMOption): string {
    const baseClass =
      'w-full rounded-xl border-4 p-4 text-left text-lg transition-all duration-300 cursor-pointer ';

    if (showResult) {
      if (option.isCorrect) {
        return baseClass + 'bg-success-100 border-success-500 font-bold';
      }
      if (index === selectedAnswer && !option.isCorrect) {
        return baseClass + 'bg-danger-100 border-danger-500 font-bold';
      }
      return baseClass + 'bg-gray-100 border-gray-300 opacity-50';
    }

    if (index === selectedAnswer) {
      return baseClass + 'bg-primary-200 border-primary-600 font-bold shadow-2xl ring-8 ring-primary-400 ring-offset-4 ring-offset-white';
    }

    return baseClass + 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400';
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
        class={getOptionClass(index, option)}
        disabled={showResult}
      >
        <span class="flex items-center justify-between">
          <span>{option.text}</span>
          {#if getOptionIcon(index, option)}
            <span class="text-2xl">{getOptionIcon(index, option)}</span>
          {/if}
        </span>
      </button>
    {/each}
  </div>
</div>
