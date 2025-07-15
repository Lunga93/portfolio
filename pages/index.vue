<script setup lang="ts">
const email = 'yourtest@example.com'
const { error } = await useSupabaseClient().auth.signInWithOtp({
  email,
  options: { emailRedirectTo: 'http://localhost:3000/' }
})
if (error) console.error('Oops:', error.message)
else console.log('Magic link sent to', email)
</script>

<template>
  <div>Check the console to know if the link was sent.</div>
</template>
