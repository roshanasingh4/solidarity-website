import InnerPageLayout from '../components/InnerPageLayout'
import './QuarterlyLettersPage.css'
import { quarterlyLetters } from '../data/quarterlyLetters'

export default function QuarterlyLettersPage() {
  return (
    <InnerPageLayout title="Letters to Partners" bannerBg="/assets/perspectives-banner.jpg">
      <div className="ql-container">
        <div className="ql-table-wrap">
          <table className="ql-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '80%' }}>Title</th>
                <th scope="col" style={{ width: '20%' }}>PDF</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyLetters.map((letter, index) => (
                <tr key={index}>
                  <td>{letter.title}</td>
                  <td>
                    <a
                      href={letter.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="ql-link"
                    >
                      View Letter
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </InnerPageLayout>
  )
}
