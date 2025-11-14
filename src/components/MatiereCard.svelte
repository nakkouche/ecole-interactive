<script lang="ts">
  export let matiere: string;
  export let count: number;
  export let icon: string;
  export let color: string;
  export let href: string;

  const colorClasses: { [key: string]: string } = {
    blue: 'bg-blue-100 border-blue-300 hover:bg-blue-200 hover:border-blue-400',
    green: 'bg-green-100 border-green-300 hover:bg-green-200 hover:border-green-400',
    purple: 'bg-purple-100 border-purple-300 hover:bg-purple-200 hover:border-purple-400',
    orange: 'bg-orange-100 border-orange-300 hover:bg-orange-200 hover:border-orange-400',
    pink: 'bg-pink-100 border-pink-300 hover:bg-pink-200 hover:bg-pink-400',
    yellow: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200 hover:border-yellow-400',
  };

  const colorClass = colorClasses[color] || colorClasses.blue;
</script>

<a
  {href}
  class="block rounded-3xl border-4 p-8 text-center transition-all hover:scale-105 active:scale-95 {colorClass}"
>
  <div class="mb-4 text-6xl">{icon}</div>
  <h3 class="mb-2 text-2xl font-bold text-gray-800">{matiere}</h3>
  <p class="text-lg text-gray-600">{count} QCM disponible{count > 1 ? 's' : ''}</p>
</a>
