export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  if (!slug.endsWith('.md')) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const post = await queryCollection(event, 'blog')
    .path(`/blog/${slug.slice(0, -'.md'.length)}`)
    .first()

  if (!post || post.draft) {
    throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return post.rawbody
})
