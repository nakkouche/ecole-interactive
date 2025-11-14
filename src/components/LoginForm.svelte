<script lang="ts">
  import { setUser } from '../stores/userStore';

  let prenom = '';
  let classe: 'CP' | 'CE1' | 'CE2' | 'CM1' | 'CM2' = 'CP';

  const classes = ['CP', 'CE1', 'CE2', 'CM1', 'CM2'];

  function handleSubmit() {
    if (prenom.trim()) {
      setUser({ prenom: prenom.trim(), classe });
      // Redirection vers la page de sélection
      window.location.href = import.meta.env.BASE_URL + 'selection';
    }
  }
</script>

<div class="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-2xl">
  <div class="mb-8 text-center">
    <h1 class="mb-2 text-4xl font-bold text-primary-600">🎓 École Interactive</h1>
    <p class="text-lg text-gray-600">Bienvenue ! Prêt à apprendre ?</p>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div>
      <label for="prenom" class="mb-2 block text-xl font-semibold text-gray-700">
        Quel est ton prénom ?
      </label>
      <input
        type="text"
        id="prenom"
        bind:value={prenom}
        placeholder="Ton prénom..."
        required
        class="w-full rounded-xl border-4 border-primary-200 px-4 py-3 text-xl focus:border-primary-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="classe" class="mb-2 block text-xl font-semibold text-gray-700">
        En quelle classe es-tu ?
      </label>
      <select
        id="classe"
        bind:value={classe}
        class="w-full rounded-xl border-4 border-secondary-200 px-4 py-3 text-xl focus:border-secondary-500 focus:outline-none"
      >
        {#each classes as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
    </div>

    <button
      type="submit"
      class="w-full rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-4 text-2xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      C'est parti ! 🚀
    </button>
  </form>
</div>

<style>
  /* Styles supplémentaires si nécessaire */
</style>
