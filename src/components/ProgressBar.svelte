<script lang="ts">
  export let current: number;
  export let total: number;

  $: percentage = (current / total) * 100;
</script>

<div class="mb-6">
  <div class="mb-2 flex justify-between text-lg font-semibold text-gray-700">
    <span>Question {current} sur {total}</span>
    <span>{Math.round(percentage)}%</span>
  </div>
  <div class="h-4 overflow-hidden rounded-full bg-gray-200">
    <div
      class="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
      style="width: {percentage}%"
    ></div>
  </div>
</div>
