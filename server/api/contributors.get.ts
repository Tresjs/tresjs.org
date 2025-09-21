export default cachedEventHandler(async () => {
  const contributors = await github.fetchOrgsContributors(['tresjs'])

  return contributors
}, {
  name: 'contributors',
  shouldBypassCache: () => !!import.meta.dev,
  getKey: () => 'contributors',
  maxAge: 60 * 60 // 1 hour
})