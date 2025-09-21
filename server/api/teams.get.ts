//const validTeams = ['core',]
export default cachedEventHandler(async () => {
  // Force error if token is missing or empty
  if (!process.env.NUXT_GITHUB_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_GITHUB_TOKEN environment variable is required but not configured'
    })
  }

  try {
    const core = await github.fetchTeam('tresjs', 'core')
    const mantainers = await github.fetchTeam('tresjs', 'mantainers')
    return {
      core: core.sort((a, b) => b.score - a.score),
      mantainers: mantainers.sort((a, b) => b.score - a.score)
    }
  } catch (error) {
    // Log the actual error for debugging
    console.error('Failed to fetch teams from GitHub:', error instanceof Error ? error.message : String(error))
    throw createError({
      statusCode: 500,
      statusMessage: `GitHub API Error: ${error instanceof Error ? error.message : String(error)}`
    })
  }
}, {
  name: 'teams',
  shouldBypassCache: () => !!import.meta.dev,
  getKey: event => 'teams-' + getRouterParam(event, 'slug'),
  maxAge: 60 * 60 // 1 hour
})