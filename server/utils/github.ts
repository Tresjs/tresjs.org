interface GitHubMember {
  name: string
  login: string
  avatarUrl: string
  pronouns?: string
  location?: string
  websiteUrl?: string
  socialAccounts?: {
    edges: Array<{
      node: {
        displayName: string
        provider: string
        url: string
      }
    }>
  }
  contributionsCollection: {
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
  }
}

interface GitHubTeamResponse {
  data: {
    organization: {
      team: {
        members: {
          nodes: GitHubMember[]
        }
      }
    }
  }
}

export const github = {
  async fetchTeam(org: string, teamName: string) {
    if (!process.env.NUXT_GITHUB_TOKEN) {
      throw createError({
        statusCode: 500,
        message: 'Missing NUXT_GITHUB_TOKEN env variable'
      })
    }

    const team = await $fetch<GitHubTeamResponse>(`https://api.github.com/graphql`, {
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
                    socialAccounts(first: 10) {
                      edges {
                        node {
                          displayName
                          provider
                          url
                        }
                      }
                    }
                    contributionsCollection {
                      totalCommitContributions
                      totalIssueContributions
                      totalPullRequestContributions
                      totalPullRequestReviewContributions
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
    return team.data.organization.team.members.nodes.map((member) => {
      const contributions = member.contributionsCollection
      const score = (contributions.totalCommitContributions * 2) + 
                   (contributions.totalPullRequestContributions * 5) + 
                   (contributions.totalIssueContributions * 1) + 
                   (contributions.totalPullRequestReviewContributions * 3)

      return {
        name: member.name as string,
        login: member.login as string,
        avatarUrl: member.avatarUrl as string,
        location: member.location as string | undefined,
        websiteUrl: member.websiteUrl as string | undefined,
        sponsorsUrl: `https://github.com/sponsors/${member.login}`,
        socialAccounts: Object.fromEntries(member.socialAccounts?.edges.map((edge) => [
          edge.node.provider.toLowerCase(),
          {
            displayName: edge.node.displayName,
            url: edge.node.url
          }
        ]) || []) as Record<string, { displayName: string, url: string }>,
        score,
        contributions: {
          commits: contributions.totalCommitContributions,
          pullRequests: contributions.totalPullRequestContributions,
          issues: contributions.totalIssueContributions,
          reviews: contributions.totalPullRequestReviewContributions
        }
      }
    })
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