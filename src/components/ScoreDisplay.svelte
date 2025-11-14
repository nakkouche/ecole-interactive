<script lang="ts">
  export let score: number;
  export let maxScore: number;

  $: percentage = Math.round((score / maxScore) * 100);
  $: emoji = percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '💪' : '📚';
  $: message =
    percentage >= 80
      ? 'Excellent travail !'
      : percentage >= 60
        ? 'Très bien !'
        : percentage >= 40
          ? 'Continue comme ça !'
          : 'Encore un petit effort !';
  $: colorClass =
    percentage >= 80
      ? 'text-success-600'
      : percentage >= 60
        ? 'text-secondary-600'
        : percentage >= 40
          ? 'text-warning-600'
          : 'text-danger-600';
</script>

<div class="rounded-3xl bg-white p-8 text-center shadow-xl">
  <div class="mb-4 text-8xl">{emoji}</div>
  <h2 class="mb-4 text-4xl font-bold {colorClass}">{message}</h2>
  <p class="mb-2 text-6xl font-bold text-gray-800">{score}/{maxScore}</p>
  <p class="text-2xl text-gray-600">{percentage}% de réussite</p>
</div>
