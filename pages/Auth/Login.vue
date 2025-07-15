
<template>
  <div class="p-8">
    <h1 class="mb-4">Sign In</h1>
    <div v-if="isRedirecting">
      <p>Redirecting…</p>
    </div>
    <div v-else>
      <p class="mb-4">Sign in with your email:</p>
      <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="border px-4 py-2 mb-4 w-full"
      >
      <button class="text-2xl bg-blue-500 text-white px-4 py-2 rounded" @click="signIn">
        Send Magic
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
const isRedirecting = ref(false)

onMounted(() => {
  if (user.value) {
    isRedirecting.value = true
    navigateTo('/')
  }
})

const signIn = async () => {
  const { error } = await supabase.auth.signInWithOtp({ email: email.value })
  if (error) {
    alert(error.message)
  } else {
    alert('Check your email for a magic link!')
  }
}
</script>