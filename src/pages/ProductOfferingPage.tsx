import InnerPageLayout from '../components/InnerPageLayout'
import PerspectivesSidebar from '../components/PerspectivesSidebar'
import './ProductOfferingPage.css'

export default function ProductOfferingPage() {
  return (
    <InnerPageLayout title="Product Offering">
      <div className="product-offering-container">
        <div className="product-offering-main">
          <div className="product-offering-table-wrapper">
            <table className="product-offering-table">
              <thead>
                <tr>
                  <th>Scheme</th>
                  <th>Market cap focus</th>
                  <th>Underlying approach</th>
                  <th>Suited for</th>
                  <th>Lock-in</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="scheme-name">Prudence</td>
                  <td>Flexi-cap</td>
                  <td>Ownership Mindset</td>
                  <td>Medium tolerance for volatility</td>
                  <td>NA</td>
                  <td>Open</td>
                </tr>
                <tr>
                  <td className="scheme-name">Emerging Leaders</td>
                  <td>Small cap</td>
                  <td>Ownership Mindset</td>
                  <td>Those with high tolerance for volatility, but don’t want to lock in capital</td>
                  <td>5-year lock-in</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="product-offering-presentation">
            Please click{' '}
            <a
              href="/wp-content/uploads/2026/09/Introduction-to-Solidarity-8-Sep-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="presentation-link"
            >
              <strong>here</strong>
            </a>{' '}
            to read our latest investor presentation
          </p>
        </div>

        <div className="product-offering-sidebar-wrapper">
          <PerspectivesSidebar />
        </div>
      </div>
    </InnerPageLayout>
  )
}
