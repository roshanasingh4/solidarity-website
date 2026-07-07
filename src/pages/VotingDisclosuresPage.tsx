import InnerPageLayout from '../components/InnerPageLayout'
import PerspectivesSidebar from '../components/PerspectivesSidebar'
import './VotingDisclosuresPage.css'

export default function VotingDisclosuresPage() {
  return (
    <InnerPageLayout title="Voting Disclosures">
      <div className="voting-disclosures-container">
        <div className="voting-disclosures-main">
          <div className="voting-disclosures-section">
            <h2 className="voting-disclosures-year-title">FY 2025-26</h2>
            <div className="voting-disclosures-buttons">
              <a
                href="/wp-content/uploads/2026/06/SOLIDA~1.PDF"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn voting-disclosures-btn"
              >
                Q4FY26
              </a>
            </div>
          </div>
        </div>

        <div className="voting-disclosures-sidebar-wrapper">
          <PerspectivesSidebar />
        </div>
      </div>
    </InnerPageLayout>
  )
}
