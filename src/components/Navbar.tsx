import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

interface DropdownItem {
  label: string
  href?: string
  external?: boolean
  dropdown?: DropdownItem[]
}

interface NavItem {
  label: string
  href?: string
  external?: boolean
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'About Us',
    href: '/about-us',
    dropdown: [
      { label: 'Goals & Principles', href: '/about-us#guide' },
      { label: 'Team', href: '/team' },
    ],
  },
  {
    label: 'Product',
    dropdown: [
      {
        label: 'PMS',
        dropdown: [
          { label: 'Product Offering', href: '/product-offering' },
          { label: 'FAQs', href: '/faqs' },
          { label: 'Direct Onboarding', href: '/direct-onboarding' },
          { label: 'Empaneled distributors', href: '/product/pms/empaneled-distributors' },
          { label: 'Investor charter', href: '/wp-content/uploads/2026/05/Investor-Charter-PMS-v1.pdf', external: true },
          { label: 'Investor complaints', href: '/wp-content/uploads/2026/07/Annexure B- JUL 26-NEW FORMAT-PMS.pdf', external: true },
        ],
      },
      {
        label: 'AIF',
        dropdown: [
          { label: 'Product Offering', href: '/product-offering-2' },
          { label: 'Investor charter', href: '/wp-content/uploads/2026/05/Investor-charter-for-AIF-16-Apr-26_V2.pdf', external: true },
          { label: 'Investor complaints', href: '/wp-content/uploads/2026/06/Annexure B- JUN  26-NEW FORMAT-AIF_v2.pdf', external: true },
          { label: 'Voting disclosures', href: '/product/aif/voting-disclosures' },
        ],
      },
    ],
  },
  {
    label: 'Perspectives',
    dropdown: [
      { label: 'Insights', href: '/perspectives/blogs' },
      { label: 'Select Company Perspectives', href: '/perspectives/company-perspective' },
      { label: 'Letters to Partners', href: '/perspectives/quarterly-letters' },
      { label: 'Perspectives on Questions from Client Partners', href: '/perspectives/client-questions' },
    ],
  },
  {
    label: 'Client Login',
    href: 'https://app.solidarity.in/wealthspectrum/app/login',
    external: true,
  },
  {
    label: 'Disclosures',
    dropdown: [
      { label: 'DISCLOSURE DOCUMENT', href: '/wp-content/uploads/2026/01/Disclosure_document_SAPL_22_Jan_2026.pdf', external: true },
      { label: 'FEE CALCULATION TOOL', href: '/fee-calculation-tool' },
      { label: 'UPI PAYMENT DETAILS', href: '/upi-payment-details' },
      { label: 'STEWARDSHIP CODE – AIF', href: '/wp-content/uploads/2026/01/Stewarship-Code_NP-7Jan26.pdf', external: true },
      { label: 'CSR POLICY', href: '/wp-content/uploads/2026/06/CSR-policy-4-Jun-26.pdf', external: true },
      { label: 'POSH POLICY', href: '/wp-content/uploads/2026/08/POSH-Policy-29-May-2026.pdf', external: true },
      { label: 'REGULATORY INFORMATION', href: '/about-us/regulatory-details' },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const desktopTriggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null)
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60)
  }, [])

  useEffect(() => {
    setOpenDropdown(null)
    setOpenSubDropdown(null)
    setMobileOpen(false)
    setOpenMobileDropdown(null)
    setOpenMobileSubDropdown(null)
  }, [pathname])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close mobile menu on route change / resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false)
        setOpenMobileSubDropdown(null)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return

    const focusFrame = window.requestAnimationFrame(() => {
      mobileMenuRef.current
        ?.querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus()
    })

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMobileOpen(false)
        window.requestAnimationFrame(() => hamburgerRef.current?.focus())
        return
      }

      if (event.key !== 'Tab') return

      const menuControls = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((element) => !element.closest('[hidden]'))

      if (menuControls.length === 0) return

      const firstElement = menuControls[0]
      const lastElement = menuControls[menuControls.length - 1]
      const closeElement = hamburgerRef.current

      if (!mobileMenuRef.current?.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? lastElement : firstElement).focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        ;(closeElement ?? lastElement).focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        ;(closeElement ?? firstElement).focus()
      }
    }

    document.addEventListener('keydown', handleMenuKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleMenuKeyDown)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (openDropdown === null || mobileOpen) return

    const handleDesktopMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      const trigger = desktopTriggerRefs.current[openDropdown]
      setOpenSubDropdown(null)
      setOpenDropdown(null)
      window.requestAnimationFrame(() => trigger?.focus())
    }

    document.addEventListener('keydown', handleDesktopMenuKeyDown)
    return () => document.removeEventListener('keydown', handleDesktopMenuKeyDown)
  }, [mobileOpen, openDropdown])

  const isActive = (item: NavItem) => {
    if (item.dropdown) {
      // Check dropdown children first, plus the item's own href
      const childMatch = item.dropdown.some(sub => {
        if (sub.dropdown) {
          return sub.dropdown.some(c => !c.external && c.href && (pathname === c.href || pathname.startsWith(c.href.split('#')[0] + '/')))
        }
        return !sub.external && sub.href && (pathname === sub.href || pathname.startsWith(sub.href.split('#')[0] + '/'))
      })
      const selfMatch = item.href && !item.external && (pathname === item.href || pathname.startsWith(item.href + '/'))
      return !!(childMatch || selfMatch)
    }
    if (item.href && !item.external) return pathname === item.href || pathname.startsWith(item.href + '/')
    return false
  }

  const renderLink = (item: Pick<DropdownItem, 'href' | 'external' | 'label'>, className?: string) => {
    if (item.external) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
          <span className="navbar__label">{item.label}</span>
        </a>
      )
    }
    return (
      <Link to={item.href!} className={className} onClick={() => setMobileOpen(false)}>
        <span className="navbar__label">{item.label}</span>
      </Link>
    )
  }

  return (
    <header>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Primary">
        <div className="navbar__inner">
          {/* Logo */}
          <div className="navbar__logo">
            <Link to="/">
              <img src="/assets/Logo.png" alt="Solidarity Investment Managers Logo" height={30} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="navbar__menu">
            {navItems.map((item, i) => (
              <li
                key={i}
                className={`navbar__item${item.dropdown ? ' navbar__item--has-dropdown' : ''}`}
                onMouseEnter={() => item.dropdown && setOpenDropdown(i)}
                onMouseLeave={() => {
                  setOpenDropdown(null)
                  setOpenSubDropdown(null)
                }}
              >
                {item.href && !item.dropdown ? (
                  renderLink({ href: item.href, label: item.label, external: item.external }, `navbar__link${isActive(item) ? ' navbar__link--active' : ''}`)
                ) : (
                  <button
                    ref={(element) => { desktopTriggerRefs.current[i] = element }}
                    className={`navbar__link navbar__link--btn${isActive(item) ? ' navbar__link--active' : ''}`}
                    onClick={() => {
                      setOpenDropdown(openDropdown === i ? null : i)
                      setOpenSubDropdown(null)
                    }}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === i}
                  >
                    <span className="navbar__label">{item.label}</span>
                    {item.dropdown && <span className="navbar__chevron" aria-hidden="true">▾</span>}
                  </button>
                )}

                {item.dropdown && (
                  <ul
                    className={`navbar__dropdown${openDropdown === i ? ' navbar__dropdown--open' : ''}`}
                  >
                    {item.dropdown.map((sub, j) => (
                        <li
                          key={j}
                          className={`navbar__dropdown-item${sub.dropdown ? ' navbar__dropdown-item--has-sub' : ''}`}
                          onMouseEnter={() => sub.dropdown && setOpenSubDropdown(`${i}-${j}`)}
                          onMouseLeave={(event) => {
                            if (sub.dropdown && !event.currentTarget.contains(document.activeElement)) {
                              setOpenSubDropdown(null)
                            }
                          }}
                          onBlur={(event) => {
                            if (sub.dropdown && !event.currentTarget.contains(event.relatedTarget)) {
                              setOpenSubDropdown(null)
                            }
                          }}
                        >
                          {sub.dropdown ? (
                            <>
                              <button
                                type="button"
                                className="navbar__dropdown-link navbar__dropdown-link--parent"
                                aria-expanded={openSubDropdown === `${i}-${j}`}
                                aria-controls={`desktop-submenu-${i}-${j}`}
                                onFocus={() => setOpenSubDropdown(`${i}-${j}`)}
                                onClick={() => setOpenSubDropdown(openSubDropdown === `${i}-${j}` ? null : `${i}-${j}`)}
                              >
                                <span>{sub.label}</span>
                                <span className="navbar__sub-chevron" aria-hidden="true">›</span>
                              </button>
                              <ul
                                id={`desktop-submenu-${i}-${j}`}
                                className={`navbar__sub-dropdown${openSubDropdown === `${i}-${j}` ? ' navbar__sub-dropdown--open' : ''}`}
                              >
                                {sub.dropdown.map((child, k) => (
                                  <li key={k} className="navbar__dropdown-item">
                                    {child.external ? (
                                      <a href={child.href} target="_blank" rel="noopener noreferrer" className="navbar__dropdown-link">
                                        {child.label}
                                      </a>
                                    ) : (
                                      <Link to={child.href!} className="navbar__dropdown-link" onClick={() => setOpenDropdown(null)}>
                                        {child.label}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            sub.external ? (
                              <a href={sub.href} target="_blank" rel="noopener noreferrer" className="navbar__dropdown-link">
                                {sub.label}
                              </a>
                            ) : (
                              <Link to={sub.href!} className="navbar__dropdown-link" onClick={() => setOpenDropdown(null)}>
                                {sub.label}
                              </Link>
                            )
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            type="button"
            ref={hamburgerRef}
            className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-menu${mobileOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu__header container">
          <div className="navbar__logo">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img src="/assets/Logo.png" alt="Solidarity" height={30} />
            </Link>
          </div>
        </div>
        <div className="mobile-menu__inner">
          <ul className="mobile-menu__list">
            {navItems.map((item, i) => (
              <li key={i} className="mobile-menu__item">
                {item.dropdown ? (
                  <>
                    <button
                      className={`mobile-menu__link mobile-menu__link--parent${openMobileDropdown === i ? ' mobile-menu__link--open' : ''}`}
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === i ? null : i)}
                      aria-haspopup="true"
                      aria-expanded={openMobileDropdown === i}
                    >
                      {item.label}
                      <span className="mobile-menu__chevron" aria-hidden="true">▾</span>
                    </button>
                    <ul
                      className={`mobile-menu__sub${openMobileDropdown === i ? ' mobile-menu__sub--open' : ''}`}
                      hidden={openMobileDropdown !== i}
                    >
                      {item.dropdown.map((sub, j) => {
                        const subKey = `${i}-${j}`;
                        const isSubOpen = openMobileSubDropdown === subKey;
                        return (
                          <li key={j} className="mobile-menu__sub-item">
                            {sub.dropdown ? (
                              <>
                                <button
                                  className={`mobile-menu__sub-link mobile-menu__sub-link--parent${isSubOpen ? ' mobile-menu__sub-link--open' : ''}`}
                                  onClick={() => setOpenMobileSubDropdown(isSubOpen ? null : subKey)}
                                  aria-haspopup="true"
                                  aria-expanded={isSubOpen}
                                >
                                  {sub.label}
                                  <span className="mobile-menu__chevron" aria-hidden="true">▾</span>
                                </button>
                                <ul
                                  className={`mobile-menu__sub-child${isSubOpen ? ' mobile-menu__sub-child--open' : ''}`}
                                  hidden={!isSubOpen}
                                >
                                  {sub.dropdown.map((child, k) => (
                                    <li key={k} className="mobile-menu__sub-child-item">
                                      {child.external ? (
                                        <a href={child.href} target="_blank" rel="noopener noreferrer" className="mobile-menu__sub-child-link" onClick={() => setMobileOpen(false)}>
                                          {child.label}
                                        </a>
                                      ) : (
                                        <Link to={child.href!} className="mobile-menu__sub-child-link" onClick={() => setMobileOpen(false)}>
                                          {child.label}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              sub.external ? (
                                <a href={sub.href} target="_blank" rel="noopener noreferrer" className="mobile-menu__sub-link" onClick={() => setMobileOpen(false)}>
                                  {sub.label}
                                </a>
                              ) : (
                                <Link to={sub.href!} className="mobile-menu__sub-link" onClick={() => setMobileOpen(false)}>
                                  {sub.label}
                                </Link>
                              )
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="mobile-menu__link" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href!} className="mobile-menu__link" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay backdrop */}
      {mobileOpen && (
        <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}
    </header>
  )
}
