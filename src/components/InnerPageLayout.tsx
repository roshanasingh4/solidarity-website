import type { ReactNode } from 'react'
import PageBanner from './PageBanner'
import './InnerPageLayout.css'

interface InnerPageLayoutProps {
  title: string
  children: ReactNode
  bannerBg?: string
}

/**
 * Template for all inner pages.
 * Renders: PageBanner + padded content area.
 * Navbar and Footer are provided by App.tsx globally.
 */
export default function InnerPageLayout({ title, children, bannerBg }: InnerPageLayoutProps) {
  return (
    <div className="inner-page">
      <PageBanner title={title} bgImage={bannerBg} />
      <div className="inner-page__content">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  )
}
