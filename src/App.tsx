import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ComplianceGates from './components/ComplianceGates'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import TeamMemberDetailPage from './pages/TeamMemberDetailPage'
import ProductOfferingPage from './pages/ProductOfferingPage'
import ProductOfferingAifPage from './pages/ProductOfferingAifPage'
import PortfolioPerformancePage from './pages/PortfolioPerformancePage'
import FeeStructurePage from './pages/FeeStructurePage'
import DirectOnboardingPage from './pages/DirectOnboardingPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import QuarterlyLettersPage from './pages/QuarterlyLettersPage'
import DisclaimerPage from './pages/DisclaimerPage'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import RegulatoryDetailsPage from './pages/RegulatoryDetailsPage'
import UPIPaymentDetailsPage from './pages/UPIPaymentDetailsPage'
import FeeCalculationToolPage from './pages/FeeCalculationToolPage'
import PerspectivesListingPage from './pages/PerspectivesListingPage'
import SinglePostPage from './pages/SinglePostPage'
import InvestmentApproachPage from './pages/InvestmentApproachPage'
import VotingDisclosuresPage from './pages/VotingDisclosuresPage'
import EmpaneledDistributorsPage from './pages/EmpaneledDistributorsPage'
import { getPost } from './data/posts'

import './App.css'

// ── Route Change Handler (Scroll to top & set title) ───────────
function getTitleForPath(pathname: string): string {
  const base = "Solidarity Investment Managers"
  let title = "Home"

  if (pathname === '/') return base
  else if (pathname === '/about-us') title = "About Us"
  else if (pathname === '/about-us/regulatory-details') title = "Regulatory Details"
  else if (pathname.startsWith('/team')) title = "Team"
  else if (pathname === '/product-offering') title = "Product Offering"
  else if (pathname === '/product-offering-2') title = "Product Offering – AIF"
  else if (pathname === '/portfolio-performance') title = "Portfolio Performance"
  else if (pathname === '/fee-structure') title = "Fee Structure"
  else if (pathname === '/fee-calculation-tool') title = "Fee Calculation Tool"
  else if (pathname === '/direct-onboarding') title = "Direct Onboarding"
  else if (pathname === '/faqs') title = "FAQs"
  else if (pathname === '/investment-approach') title = "Investment Approach"
  else if (pathname === '/perspectives/blogs') title = "Blogs"
  else if (pathname === '/perspectives/company-perspective') title = "Select Company Perspectives"
  else if (pathname === '/perspectives/client-questions') title = "Client Questions"
  else if (pathname === '/perspectives/asset-allocation') title = "Asset Allocation"
  else if (pathname === '/perspectives/equity') title = "Equity"
  else if (pathname === '/perspectives/investment-management') title = "Investment Management"
  else if (pathname === '/perspectives/macro-environment') title = "Macro Environment"
  else if (pathname === '/perspectives/venture-capital') title = "Venture Capital"
  else if (pathname === '/perspectives/quarterly-letters') title = "Quarterly Letters"
  else if (pathname.startsWith('/perspectives/post/')) {
    const slug = pathname.slice('/perspectives/post/'.length)
    title = getPost(slug)?.title ?? "Perspective"
  }
  else if (pathname === '/contact-us') title = "Contact Us"
  else if (pathname === '/terms-conditions') title = "Terms and Conditions"
  else if (pathname === '/privacy-policy') title = "Privacy Policy"
  else if (pathname === '/disclaimer') title = "Disclaimer"
  else if (pathname === '/upi-payment-details') title = "UPI Payment Details"
  else if (pathname === '/product/aif/voting-disclosures') title = "Voting Disclosures"
  else if (pathname === '/product/pms/empaneled-distributors') title = "Empaneled Distributors"

  return `${title} – ${base}`
}

function RouteChangeHandler() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = getTitleForPath(pathname)

    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    const focusFrame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [pathname])
  return null
}


// ── Main App Shell ─────────────────────────────────────────────
function AppShell() {
  const [loaded, setLoaded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="app-shell">
      {/* Skip to main content – must be first focusable element */}
      <a href="#main-content" className="skip-to-main">Skip to main content</a>

      {/* Preloader */}
      <div className={`preloader${loaded ? ' hidden' : ''}`} aria-hidden={loaded}>
        <div className="preloader-circles">
          <span /><span /><span />
        </div>
      </div>

      <RouteChangeHandler />
      <Navbar />

      <main id="main-content">
        <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* About */}
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about-us/regulatory-details" element={<RegulatoryDetailsPage />} />

        {/* Team */}
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:slug" element={<TeamMemberDetailPage />} />

        {/* Product */}
        <Route path="/product-offering"     element={<ProductOfferingPage />} />
        <Route path="/product-offering-2"   element={<ProductOfferingAifPage />} />
        <Route path="/portfolio-performance" element={<PortfolioPerformancePage />} />
        <Route path="/fee-structure"        element={<FeeStructurePage />} />
        <Route path="/fee-calculation-tool" element={<FeeCalculationToolPage />} />
        <Route path="/direct-onboarding"    element={<DirectOnboardingPage />} />
        <Route path="/faqs"                 element={<FAQPage />} />
        <Route path="/investment-approach"  element={<InvestmentApproachPage />} />
        <Route path="/product/aif/voting-disclosures" element={<VotingDisclosuresPage />} />
        <Route path="/product/pms/empaneled-distributors" element={<EmpaneledDistributorsPage />} />

        {/* Perspectives */}
        <Route path="/perspectives/blogs"              element={<PerspectivesListingPage categoryTitle="Perspectives" filterCategory="Blogs" />} />
        <Route path="/perspectives/company-perspective" element={<PerspectivesListingPage categoryTitle="Select Company Perspectives" filterCategory="Company Perspective" />} />
        <Route path="/perspectives/client-questions"   element={<PerspectivesListingPage categoryTitle="Perspective On Questions From Client Partners" filterCategory="Perspective On Questions From Client Partners" />} />
        <Route path="/perspectives/asset-allocation"   element={<PerspectivesListingPage categoryTitle="Asset Allocation" filterCategory="Asset Allocation" />} />
        <Route path="/perspectives/equity"             element={<PerspectivesListingPage categoryTitle="Equity" filterCategory="Equity" />} />
        <Route path="/perspectives/investment-management" element={<PerspectivesListingPage categoryTitle="Investment Management" filterCategory="Investment Management" />} />
        <Route path="/perspectives/macro-environment"  element={<PerspectivesListingPage categoryTitle="Macro Environment" filterCategory="Macro Environment" />} />
        <Route path="/perspectives/venture-capital"    element={<PerspectivesListingPage categoryTitle="Venture Capital" filterCategory="Venture Capital" />} />
        <Route path="/perspectives/quarterly-letters"  element={<QuarterlyLettersPage />} />
        <Route path="/perspectives/post/:slug"         element={<SinglePostPage />} />

        {/* Contact */}
        <Route path="/contact-us" element={<ContactPage />} />

        {/* Legal */}
        <Route path="/terms-conditions"  element={<TermsPage />} />
        <Route path="/privacy-policy"    element={<PrivacyPolicyPage />} />
        <Route path="/disclaimer"        element={<DisclaimerPage />} />
        <Route path="/upi-payment-details" element={<UPIPaymentDetailsPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Scroll-to-top */}
      <button
        className={`scroll-top${showScrollTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })}
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
      <ComplianceGates />
    </BrowserRouter>
  )
}
