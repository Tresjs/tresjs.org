//const validTeams = ['core',]
export default cachedEventHandler(async () => {
  try {
    const core = await github.fetchTeam('tresjs', 'core')
    const mantainers = await github.fetchTeam('tresjs', 'mantainers')
    return {
      core: core.sort((a, b) => b.score - a.score),
      mantainers: mantainers.sort((a, b) => b.score - a.score)
    }
  } catch (error) {
    // Return empty teams if GitHub API fails (e.g., missing token during build)
    console.warn('Failed to fetch teams from GitHub:', error instanceof Error ? error.message : String(error))
    return {
      core: [],
      mantainers: []
    }
  }
}, {
  name: 'teams',
  shouldBypassCache: () => !!import.meta.dev,
  getKey: event => 'teams-' + getRouterParam(event, 'slug'),
  maxAge: 60 * 60 // 1 hour
})