import InnerPageLayout from '../components/InnerPageLayout'
import './EmpaneledDistributorsPage.css'

interface Distributor {
  name: string
  aprn: string
  address: string
  contactPerson: string
  contactNumber: string
  email: string
  dateLabel: string
  dateTime: string
}

const distributors: Distributor[] = [
  {
    name: 'COMPASS FINSERVE LLP',
    aprn: 'APRN00122',
    address: '305, Atlanta Estate, Dr. Ambedkar Chowk, Off W.E. Highway, Goregaon East, Mumbai 400 063',
    contactPerson: "Prakash D' Cunha",
    contactNumber: '9136687996',
    email: 'compassfinserve@gmail.com',
    dateLabel: '18-01-2021',
    dateTime: '2021-01-18',
  },
  {
    name: 'KREDERE WEALTH PARTNER LIMITED',
    aprn: 'APRN00394',
    address: '905-906, Raheja Chambers, Free Press Journal Marg, Nariman Point, Mumbai 400021',
    contactPerson: 'Kaushik Deva',
    contactNumber: '9820091732',
    email: 'kaushik@kredere.com',
    dateLabel: '18-10-2019',
    dateTime: '2019-10-18',
  },
  {
    name: 'GREENEDGE FINANCIAL SERVICES PRIVATE LIMITED',
    aprn: 'APRN02225',
    address: 'Samarth House, 167, Yoga Niketan Marg, Jankalyan CHS, Bangur Nagar, Goregaon (W), Mumbai, Maharashtra 400104',
    contactPerson: 'Anirudh Desai',
    contactNumber: '9619147498',
    email: 'gajanan@greenedgefinancial.in',
    dateLabel: '11-01-2021',
    dateTime: '2021-01-11',
  },
  {
    name: 'GOPLUG ENTERPRISES PVT LTD',
    aprn: 'APRN04981',
    address: 'H. No. C-169, Sec-50, Mayfield Garden Sector 50, Gurgaon, Haryana, India, 122018',
    contactPerson: 'Ankit R Himatsingka',
    contactNumber: '8639514359',
    email: 'ankit.himatsingka@gmail.com',
    dateLabel: '12-06-2025',
    dateTime: '2025-06-12',
  },
]

export default function EmpaneledDistributorsPage() {
  return (
    <InnerPageLayout title="Empaneled Distributors">
      <section className="distributors">
        <h2 id="distributors-heading" className="sr-only">PMS empaneled distributor details</h2>
        <p id="distributors-scroll-help" className="distributors__scroll-help">
          Scroll horizontally to view all distributor details.
        </p>
        <div
          className="distributors__table-region"
          role="region"
          aria-label="PMS empaneled distributor details"
          aria-describedby="distributors-scroll-help"
          tabIndex={0}
        >
          <table className="distributors__table">
            <caption className="sr-only">PMS empaneled distributors and their contact details</caption>
            <colgroup>
              <col className="distributors__col-name" />
              <col className="distributors__col-aprn" />
              <col className="distributors__col-address" />
              <col className="distributors__col-contact" />
              <col className="distributors__col-phone" />
              <col className="distributors__col-email" />
              <col className="distributors__col-date" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Distributor name</th>
                <th scope="col">APRN</th>
                <th scope="col">Address</th>
                <th scope="col">Contact person</th>
                <th scope="col">Contact number</th>
                <th scope="col">Email address</th>
                <th scope="col">Date of empanelment of the Distributor</th>
              </tr>
            </thead>
            <tbody>
              {distributors.map((distributor) => (
                <tr key={distributor.aprn}>
                  <th scope="row">{distributor.name}</th>
                  <td className="distributors__cell--nowrap">{distributor.aprn}</td>
                  <td>{distributor.address}</td>
                  <td>{distributor.contactPerson}</td>
                  <td className="distributors__cell--nowrap">
                    <a href={`tel:+91${distributor.contactNumber}`} aria-label={`Call ${distributor.contactPerson} at ${distributor.contactNumber}`}>
                      {distributor.contactNumber}
                    </a>
                  </td>
                  <td>
                    <a href={`mailto:${distributor.email}`}>{distributor.email}</a>
                  </td>
                  <td><time dateTime={distributor.dateTime}>{distributor.dateLabel}</time></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </InnerPageLayout>
  )
}
