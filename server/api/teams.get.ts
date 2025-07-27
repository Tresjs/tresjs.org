//const validTeams = ['core',]
export default cachedEventHandler(async (event) => {
  const members = await github.fetchTeam('tresjs', 'core')


  return members/* .sort((a, b) => b.score - a.score) */
}, {
  name: 'teams',
  shouldBypassCache: () => !!import.meta.dev,
  getKey: event => 'teams-' + getRouterParam(event, 'slug'),
  maxAge: 60 * 60 // 1 hour
})