import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ACKNOWLEDGEMENT_COPY,
  AIF_DISCLAIMER_COPY,
  AIF_DISCLAIMER_STORAGE_KEY,
  AIF_ROUTE_PATHS,
  SITE_DISCLAIMER_COPY,
  SITE_DISCLAIMER_STORAGE_KEY,
} from '../data/complianceDisclaimers'
import './ComplianceGates.css'

type GateKind = 'site' | 'aif'

interface PendingDestination {
  href: string
  openInNewTab: boolean
}

interface ComplianceDialogProps {
  copy: readonly string[]
  kind: GateKind
  onAccept: () => void
  title: string
}

function ComplianceDialog({ copy, kind, onAccept, title }: ComplianceDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const focusFrame = window.requestAnimationFrame(() => continueButtonRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        return
      }

      if (event.key !== 'Tab') return

      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          '[tabindex]:not([tabindex="-1"]), input:not([disabled]), button:not([disabled])',
        ),
      )
      if (controls.length === 0) return

      const firstControl = controls[0]
      const lastControl = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault()
        lastControl.focus()
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault()
        firstControl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return createPortal(
    <div className="compliance-gate" data-gate-kind={kind}>
      <div className="compliance-gate__backdrop" aria-hidden="true" />
      <div
        ref={dialogRef}
        className="compliance-gate__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="compliance-gate__header">
          <img src="/assets/Logo.png" alt="" className="compliance-gate__logo" />
          <h1 id={titleId}>{title}</h1>
        </div>

        <div id={descriptionId} className="compliance-gate__copy" tabIndex={0}>
          {copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <form
          className="compliance-gate__actions"
          onSubmit={(event) => {
            event.preventDefault()
            onAccept()
          }}
        >
          <button ref={continueButtonRef} type="submit">Agree &amp; Continue</button>
          <p className="compliance-gate__acknowledgement">{ACKNOWLEDGEMENT_COPY}</p>
        </form>
      </div>
    </div>,
    document.body,
  )
}

function hasAccepted(storageKey: string) {
  try {
    return window.localStorage.getItem(storageKey) === 'accepted'
  } catch {
    return false
  }
}

function recordAcceptance(storageKey: string) {
  try {
    window.localStorage.setItem(storageKey, 'accepted')
  } catch {
    // The acknowledgement remains valid for this page view if storage is unavailable.
  }
}

function isAifRoute(pathname: string) {
  const normalizedPath = (pathname.replace(/\/+$/, '') || '/').toLowerCase()
  return AIF_ROUTE_PATHS.some((routePath) => routePath.toLowerCase() === normalizedPath)
}

export default function ComplianceGates() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [siteAccepted, setSiteAccepted] = useState(() => hasAccepted(SITE_DISCLAIMER_STORAGE_KEY))
  const [aifAccepted, setAifAccepted] = useState(() => hasAccepted(AIF_DISCLAIMER_STORAGE_KEY))
  const [aifRequested, setAifRequested] = useState(() => isAifRoute(pathname))
  const pendingDestination = useRef<PendingDestination | null>(null)
  const modalOpen = !siteAccepted || (aifRequested && !aifAccepted)

  useEffect(() => {
    if (isAifRoute(pathname)) {
      setAifRequested(true)
      return
    }

    pendingDestination.current = null
    setAifRequested(false)
  }, [pathname])

  useEffect(() => {
    const handleAifLink = (event: MouseEvent) => {
      if (aifAccepted || event.defaultPrevented) return

      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('a[data-aif-disclaimer="true"]')
      if (!link) return

      event.preventDefault()
      if (event.type === 'contextmenu') {
        pendingDestination.current = null
        setAifRequested(true)
        return
      }

      pendingDestination.current = {
        href: link.href,
        openInNewTab: link.target === '_blank'
          || event.button === 1
          || event.metaKey
          || event.ctrlKey
          || event.shiftKey,
      }
      setAifRequested(true)
    }

    document.addEventListener('click', handleAifLink, true)
    document.addEventListener('auxclick', handleAifLink, true)
    document.addEventListener('contextmenu', handleAifLink, true)
    return () => {
      document.removeEventListener('click', handleAifLink, true)
      document.removeEventListener('auxclick', handleAifLink, true)
      document.removeEventListener('contextmenu', handleAifLink, true)
    }
  }, [aifAccepted])

  useEffect(() => {
    const appShell = document.getElementById('app-shell')
    if (!modalOpen) return

    const previousOverflow = document.body.style.overflow
    let accessibilityWidget: HTMLElement | null = null
    let widgetWasInert = false
    let previousWidgetAriaHidden: string | null = null

    const isolateAccessibilityWidget = () => {
      const widget = document.getElementById('navigate-accessibility-widget-root')
      if (!widget || widget === accessibilityWidget) return

      accessibilityWidget = widget
      widgetWasInert = widget.hasAttribute('inert')
      previousWidgetAriaHidden = widget.getAttribute('aria-hidden')
      widget.setAttribute('inert', '')
      widget.setAttribute('aria-hidden', 'true')
    }

    appShell?.setAttribute('inert', '')
    document.body.classList.add('compliance-gate-open')
    document.body.style.overflow = 'hidden'
    isolateAccessibilityWidget()

    const widgetObserver = new MutationObserver(isolateAccessibilityWidget)
    widgetObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      widgetObserver.disconnect()
      appShell?.removeAttribute('inert')
      document.body.classList.remove('compliance-gate-open')
      document.body.style.overflow = previousOverflow
      if (accessibilityWidget) {
        if (!widgetWasInert) accessibilityWidget.removeAttribute('inert')
        if (previousWidgetAriaHidden === null) {
          accessibilityWidget.removeAttribute('aria-hidden')
        } else {
          accessibilityWidget.setAttribute('aria-hidden', previousWidgetAriaHidden)
        }
      }
    }
  }, [modalOpen])

  const acceptSiteDisclaimer = () => {
    recordAcceptance(SITE_DISCLAIMER_STORAGE_KEY)
    setSiteAccepted(true)
  }

  const acceptAifDisclaimer = () => {
    recordAcceptance(AIF_DISCLAIMER_STORAGE_KEY)
    setAifAccepted(true)

    const destination = pendingDestination.current
    pendingDestination.current = null
    if (!destination) return

    const url = new URL(destination.href, window.location.href)
    if (destination.openInNewTab || url.origin !== window.location.origin) {
      window.open(url.href, '_blank', 'noopener,noreferrer')
      return
    }

    navigate(`${url.pathname}${url.search}${url.hash}`)
  }

  if (!siteAccepted) {
    return (
      <ComplianceDialog
        key="site"
        kind="site"
        title="Important information"
        copy={SITE_DISCLAIMER_COPY}
        onAccept={acceptSiteDisclaimer}
      />
    )
  }

  if (aifRequested && !aifAccepted) {
    return (
      <ComplianceDialog
        key="aif"
        kind="aif"
        title="Important AIF information"
        copy={AIF_DISCLAIMER_COPY}
        onAccept={acceptAifDisclaimer}
      />
    )
  }

  return null
}
