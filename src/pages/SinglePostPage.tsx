import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getPost } from '../data/posts'
import PerspectivesSidebar from '../components/PerspectivesSidebar'
import './SinglePostPage.css'

export default function SinglePostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!articleRef.current) return
    articleRef.current.querySelectorAll('table').forEach((table) => {
      const firstRow = table.querySelector('tr')
      if (!firstRow) return
      firstRow.querySelectorAll('td').forEach((td) => {
        const th = document.createElement('th')
        th.innerHTML = td.innerHTML
        Array.from(td.attributes).forEach((attr) => th.setAttribute(attr.name, attr.value))
        td.replaceWith(th)
      })
    })
  }, [post])

  if (!post && slug) {
    // If slug is provided but post not found, redirect to list
    return <Navigate to="/perspectives/blogs" replace />
  }

  return (
    <main className="inner-page">
      {/* ── Post banner (title + meta, matching original site structure) ── */}
      <div className="post-banner">
        <div className="container">
          {post ? (
            <>
              <div className="post-banner__date">{post.date}</div>
              <h1 className="post-banner__title" tabIndex={-1}>{post.title}</h1>
              <div className="post-banner__meta">
                by {post.author} in{' '}
                {post.categoryLinks.map((c: { label: string; path: string }, i: number) => (
                  <span key={c.path + i}>
                    <Link to={c.path}>{c.label}</Link>
                    {i < post.categoryLinks.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <h1 className="post-banner__title" tabIndex={-1}>Perspectives</h1>
          )}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="inner-page__content">
        <div className="container">
          <div className="post-detail-container">
            <article className="post-content">
              {post ? (
                <>
                  <div className="post-article-body" ref={articleRef}>
                    {post.content}
                  </div>
                </>
              ) : (
                <>
                  <p>This post hasn't been fully migrated yet.</p>
                </>
              )}
            </article>

            <PerspectivesSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
