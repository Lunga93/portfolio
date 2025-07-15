<template>
  <div class="p-8">
    <h1 class="mb-4">Complete Your Profile</h1>
    <p class="mb-4">Please provide your name and address to continue:</p>
    <form @submit.prevent="saveProfile">
      <div class="mb-4">
        <label for="name" class="block mb-1">Name</label>
        <input
          v-model="name"
          id="name"
          type="text"
          placeholder="Your full name"
          class="border px-4 py-2 w-full"
          required
        >
      </div>
      <div class="mb-4">
        <label for="address" class="block mb-1">Address</label>
        <textarea
          v-model="address"
          id="address"
          placeholder="Your address"
          class="border px-4 py-2 w-full"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="text-2xl bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Saving...' : 'Save Profile' }}
      </button>
    </form>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const name = ref('')
const address = ref('')
const isSaving = ref(false)
const error = ref<string | null>(null)

const saveProfile = async () => {
  if (!user.value) {
    error.value = 'You must be signed in to save your profile.'
    return
  }

  isSaving.value = true
  try {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { name: name.value, address: address.value }
    })
    if (updateError) throw updateError

    // Redirect to home page after successful save
    navigateTo('/')
  } catch (err) {
    error.value = err.message || 'Failed to save profile.'
  } finally {
    isSaving.value = false
  }
}
</script>