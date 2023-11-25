const state = reactive({
  repos: [],
});

export function useGithub() {
  const getRepos = async () => {
    const response = await fetch("https://api.github.com/orgs/tresjs/repos");
    state.repos = await response.json();
  };

  return {
    getRepos,
    ...toRefs(state),
  };
}