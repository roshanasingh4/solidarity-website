import InnerPageLayout from '../components/InnerPageLayout'

export default function FeeCalculationToolPage() {
  return (
    <InnerPageLayout title="FEE CALCULATION TOOL">
      <div className="fee-tool-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p>
          To ensure clarity and transparency regarding our services, we’ve created a fee calculation 
          illustration that outlines our pricing structure. This tool will help you better understand 
          the fees associated with your account held with us and how they are determined.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          Please take a moment to review the{' '}
          <strong>
            <a 
              href="/assets/Fee-Illustration.xlsx" 
              target="_blank" 
              rel="noreferrer noopener nofollow"
              style={{ textDecoration: 'underline' }}
            >
              illustration
            </a>
          </strong>{' '}
          and you may write to{' '}
          <a href="mailto:saplops@solidarity.in">saplops@solidarity.in</a> if you have any questions{' '}
          or need further clarification.
        </p>
      </div>
    </InnerPageLayout>
  )
}
