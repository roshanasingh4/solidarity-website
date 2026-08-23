import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ALL_POSTS, PostData } from '../data/posts'
import './PerspectivesSidebar.css'

const CATEGORIES = [
  { label: 'Asset Allocation',                              path: '/perspectives/asset-allocation' },
  { label: 'Equity',                                        path: '/perspectives/equity' },
  { label: 'Investment Management',                         path: '/perspectives/investment-management' },
  { label: 'Macro Environment',                             path: '/perspectives/macro-environment' },
  { label: 'Perspective On Questions From Client Partners', path: '/perspectives/client-questions' },
  { label: 'Select Company Perspectives',                   path: '/perspectives/company-perspective' },
  { label: 'Venture Capital',                               path: '/perspectives/venture-capital' },
]

const DEFAULT_LATEST_SLUGS = [
  'brief-update-from-our-vantage-point-20-aug-2026',
  'investment-thesis-on-vasa-denticity',
  'investment-thesis-on-synergy-green-industries-ltd',
]

interface Props {
  latestPosts?: PostData[]
}

export default function PerspectivesSidebar({ latestPosts }: Props) {
  const navigate = useNavigate()
  const [localSearch, setLocalSearch] = useState('')

  const posts = latestPosts && latestPosts.length > 0
    ? (latestPosts.filter(Boolean) as PostData[]).slice(0, 3)
    : DEFAULT_LATEST_SLUGS
        .map(slug => ALL_POSTS.find(p => p && p.slug === slug))
        .filter(Boolean) as PostData[]

  const handleSearchSubmit = () => {
    if (localSearch.trim()) {
      navigate(`/perspectives/blogs?s=${encodeURIComponent(localSearch.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearchSubmit()
  }

  return (
    <aside className="perspectives-sidebar">
      {/* Search Widget - ABOVE CATEGORIES */}
      <section className="sidebar-widget">
        <label htmlFor="sidebar-search-input" className="sr-only">Search</label>
        <div className="sidebar-search__wrapper">
          <input
            id="sidebar-search-input"
            type="text"
            className="sidebar-search__input"
            placeholder="Search..."
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="sidebar-search__button" aria-label="Search" onClick={handleSearchSubmit}>
            <svg className="sidebar-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="22" y2="22"></line>
            </svg>
          </button>
        </div>
      </section>

      {/* Categories Widget */}
      <section className="sidebar-widget">
        <h2 className="sidebar-widget__title">Categories</h2>
        <ul>
          {CATEGORIES.map(cat => (
            <li key={cat.label}>
              <Link to={cat.path}>{cat.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest Posts Section - BELOW CATEGORIES */}
      <section className="sidebar-widget">
        <h2 className="sidebar-widget__title">Latest Post</h2>
        <ul className="sidebar-latest-list">
          {posts.map(post => (
            <li key={post.id} className="sidebar-latest-item">
              <Link to={`/perspectives/post/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
