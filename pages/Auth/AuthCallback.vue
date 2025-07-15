<template>
  <div class="p-8">
    <h1 class="mb-4">Authenticating...</h1>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-else>Processing your login, please wait...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Get session from Supabase
    const { data, error: authError } = await supabase.auth.getSession()
    if (authError) throw authError

    if (data.session) {
      // Check if user has name and address in metadata
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      const metadata = userData.user?.user_metadata
      const hasProfile = metadata?.name && metadata?.address

      // Redirect to profile if name or address is missing, else to home
      navigateTo(hasProfile ? '/' : '/profile')
    } else {
      error.value = 'No session found. Please try signing in again.'
      setTimeout(() => navigateTo('/sign-in'), 3000)
    }
  } catch (err) {
    error.value = err.message || 'Authentication failed.'
    setTimeout(() => navigateTo('/sign-in'), 3000)
  }
})
</script>