//const validTeams = ['core',]
export default cachedEventHandler(async (event) => {
  const core = await github.fetchTeam('tresjs', 'core')
  const mantainers = await github.fetchTeam('tresjs', 'mantainers')
  return {
    core: core.sort((a, b) => b.score - a.score),
    mantainers: mantainers.sort((a, b) => b.score - a.score)
  }
}, {
  name: 'teams',
  shouldBypassCache: () => !!import.meta.dev,
  getKey: event => 'teams-' + getRouterParam(event, 'slug'),
  maxAge: 60 * 60 // 1 hour
})