export const github = {
  async fetchTeam(org: string, teamName: string) {
    if (!process.env.NUXT_GITHUB_TOKEN) {
      throw createError({
        statusCode: 500,
        message: 'Missing NUXT_GITHUB_TOKEN env variable'
      })
    }

    const team = await $fetch<{ data: { organization: { team: { members: { nodes: any[] } } } } }>(`https://api.github.com/graphql`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'tres-api',
        'Authorization': `token ${process.env.NUXT_GITHUB_TOKEN}`
      },
      body: {
        query: `
          query($org: String!, $team: String!) {
            organization(login: $org) {
              team(slug: $team) {
                members(first: 100) {
                  nodes {
                    name
                    login
                    avatarUrl
                    pronouns
                    location
                    websiteUrl
                    sponsorsListing {
                      url
                    }
                    socialAccounts(first: 10) {
                      edges {
                        node {
                          displayName
                          provider
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
        variables: {
          org,
          team: teamName
        }
      }
    })
    return team.data.organization.team.members.nodes.map((member) => ({
      name: member.name as string,
      login: member.login as string,
      avatarUrl: member.avatarUrl as string,
      location: member.location as string | undefined,
      websiteUrl: member.websiteUrl as string | undefined,
      sponsorsListing: member.sponsorsListing?.url as string | undefined,
      socialAccounts: Object.fromEntries(member.socialAccounts?.edges.map((edge: any) => [
        edge.node.provider.toLowerCase(),
        {
          displayName: edge.node.displayName,
          url: edge.node.url
        }
      ]) || []) as Record<string, { displayName: string, url: string }>
    }))
  },
  async fetchOrgsContributors(orgs: string[]) {
    const contributors = await $fetch(`https://api.github.com/orgs/${orgs.join(',')}/members?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'tres-api',
        'Authorization': `token ${process.env.NUXT_GITHUB_TOKEN}`
      },
    })
    return contributors
  }
}