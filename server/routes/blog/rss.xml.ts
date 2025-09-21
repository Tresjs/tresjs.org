import { Feed } from 'feed'
import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import type { Collections, CollectionQueryBuilder } from '@nuxt/content'
import { queryCollection } from '#imports'

type queryCollectionWithEvent = <T extends keyof Collections>(event: H3Event, collection: T) => CollectionQueryBuilder<Collections[T]>

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://tresjs.org'
  const siteUrl = joinURL(baseUrl, 'blog')
  const feed = new Feed({
    title: 'The Tres Blog',
    description: 'News and updates about TresJS Ecosystem.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon.png'),
    copyright: `Copyright © 2023-${new Date().getFullYear()} TresJS All Rights Reserved`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`
    }
  })

  const articles = await (queryCollection as queryCollectionWithEvent)(event, 'blog')
    .order('date', 'DESC')
    .all()

  for (const article of articles) {
    if (article.draft) {
      continue
    }
    feed.addItem({
      link: joinURL(baseUrl, article.path),
      image: joinURL(baseUrl, article.thumbnail),
      title: article.title,
      date: new Date(article.date),
      description: article.description,
      category: [{
        name: article.category
      }]
      // author: article.authors, INF0: Cannot work without an email field in the author object https://github.com/jpmonette/feed/issues/141
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})