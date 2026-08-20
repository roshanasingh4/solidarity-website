import InnerPageLayout from '../components/InnerPageLayout'
import PerspectivesSidebar from '../components/PerspectivesSidebar'
import './ProductOfferingPage.css' // We can reuse the same CSS styles!

export default function ProductOfferingAifPage() {
  return (
    <InnerPageLayout title="Product Offering – AIF">
      <div className="product-offering-container">
        <div className="product-offering-main">
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: '#333' }}>
            Solidarity Advisors Private Limited acts as the investment manager for a <strong>Category III</strong> AIF, <strong>Solidarity Micro Cap Emerging Leader AIF</strong> (“AIF Fund”), which has been formed under <strong>Solidarity Alternative Investment Trust</strong>, a SEBI registered Category III AIF vide SEBI Reg. No.: IN/AIF3/25-26/1894 under SEBI (Alternative Investment Fund) Regulations, 2012.
          </p>

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
                  <td className="scheme-name">Solidarity Micro Cap Emerging Leader AIF</td>
                  <td>Micro cap</td>
                  <td>Ownership Mindset</td>
                  <td>Those with high tolerance for volatility, willing to lock in capital</td>
                  <td>5 years</td>
                  <td>Not at present</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="product-offering-sidebar-wrapper">
          <PerspectivesSidebar />
        </div>
      </div>
    </InnerPageLayout>
  )
}
