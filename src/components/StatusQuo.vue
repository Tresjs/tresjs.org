<script setup lang="ts">
import { gsap } from 'gsap'
import { useGithub } from '../composables/useGithub';

const { repos } = useGithub()

const totalStars = ref(0)
const totalPRs = ref(0)
const totalCommits = ref(0)

gsap.to(
  totalStars,
  {
    duration: 1,
    ease: 'power4.out',
    onUpdate: () => {
      totalStars.value = Math.floor(totalStars.value)
    },
    value: repos.value.reduce((acc, repo) => {
      return acc + repo.stargazers_count
    }, 0)
  }
)

gsap.to(
  totalPRs,
  {
    duration: 1,
    ease: 'power4.out',
    onUpdate: () => {
      totalPRs.value = Math.floor(totalPRs.value)
    },
    value: 267 + 172 + 58 + 53
  }
)

gsap.to(
  totalCommits,
  {
    duration: 1,
    ease: 'power4.out',
    onUpdate: () => {
      totalCommits.value = Math.floor(totalCommits.value)
    },
    value: 875 + 678 + 88 + 146
  }
)
</script>
<template>
  <div class="w-full my-8 p-4 grid grid-cols-3 text-gray-600 dark:text-light">
    <div class="flex flex-col items-center gap-4">
      <span>
        <i class="i-logos-github-icon mr-2"></i>
        <i class="i-carbon-star-filled text-yellow animate animate-tada"></i>
      </span>
      <span class="text-gray-600 dark:text-light text-4xl">{{ totalStars }}</span>
    </div>
    <div class="flex flex-col items-center gap-4">
     <span> 
      <i class="i-ph-git-pull-request mr-2"></i>
      <i class="i-carbon-checkmark text-teal animate" />
      </span>
      <span class="text-gray-600 dark:text-light text-4xl">~ {{ totalPRs }}</span>
    </div>
    <div class="flex flex-col items-center gap-4">
     <span> 
      <i class="i-ph-git-commit mr-2"></i>
      </span>
      <span class="text-gray-600 dark:text-light text-4xl">> {{ totalCommits }} </span>
    </div>
  
  </div>
  <p class="w-full flex justify-center"> <span class="text-xs flex items-center text-gray-400"><i class="i-carbon-information mr-2"></i>Total Ecosystem</span></p>
</template>