import { useState } from "react";
import InnerPageLayout from "../components/InnerPageLayout";
import "./FAQPage.css";

interface FAQItem {
  q: string;
  a: JSX.Element;
}
interface FAQSection {
  heading: string;
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    heading: "General",
    items: [
      {
        q: "Who is a Portfolio Manager?",
        a: (
          <p>
            As defined in the Regulation 2(o) of SEBI(Portfolio
            Managers)Regulations, 2020, a portfolio manager is a body corporate,
            which, pursuant to a contract with a client, advises or directs or
            undertakes on behalf of the client (whether as a discretionary
            portfolio manager or otherwise) the management or administration of
            a portfolio of securities or goods or funds of the client.
          </p>
        ),
      },
      {
        q: "How many types of Portfolio Management Services (PMS) are there?",
        a: (
          <p>
            PMSs are of three types – Discretionary, Non-Discretionary, and
            Advisory.
          </p>
        ),
      },
      {
        q: "What is a Discretionary PMS?",
        a: (
          <>
            <p>
              Under these services, the choice as well as the timings of the
              investment decisions rest solely with the Portfolio Manager.
            </p>
            <p>
              Solidarity Advisors Pvt Ltd currently offer only Discretionary PMS
              to client partners.
            </p>
          </>
        ),
      },
      {
        q: "Who can invest in PMS?",
        a: (
          <p>
            High Net-worth Individuals and Non-Individuals such as HUFs,
            Partnerships Firms, Trusts, Sole Proprietorship Firms and Body
            Corporates.
          </p>
        ),
      },
      {
        q: "What is the minimum value of investment?",
        a: (
          <p>
            As per Securities and Exchange Board of India (SEBI) regulations,
            you must invest a minimum corpus of INR 50 Lakhs by way of funds or
            listed equities or a combination thereof to start a Portfolio
            Management Services account. However, at Solidarity, our minimum
            value of investment is INR 2.5 Crores
          </p>
        ),
      },
      {
        q: "Why should an investor select a PMS over a Mutual Fund?",
        a: (
          <>
            <p>
              Unlike a mutual fund, PMS gives access to ownership in individual
              shares. PMS works on the concept of personal demat, whereas mutual
              funds offer units in the pooled portfolio. In PMSs, one investor's
              behavioural reactions to market movements don't impact other
              investors' portfolios. Portfolio Managers have the flexibility
              with regards to allocating corpus per business, per sector, and
              cash calls.
            </p>
            <p>
              PMSs are more focused, concentrated, customised as per clients
              requirements i.e not investing in the restricted stocks given by
              the clients and follow relatively lower churn, as funds do not
              flow in and out too often as in the case of a pooled structure
              like MF. PMSs are more transparent in terms of activity,
              transactions, holdings, expenses, and so investors are more
              connected and informed about where the money is eventually
              invested.
            </p>
          </>
        ),
      },
      {
        q: "What is the process of signing up for subscribing to the Fund?",
        a: (
          <p>
            The investor must satisfy the mandatory KYC requirements as
            prescribed under laws by providing documents like an Identity Proof,
            PAN card, Address Proof, etc. Investors are required to sign the
            Application Form along with an Agreement (which will detail the
            amount the investor is committing to invest, management fees, other
            operating fees and profit sharing of success-based fee amongst other
            things), and risk disclosures. The details of KYC documents required
            by each category of investors, i.e. Individual, HUFs, Corporate,
            etc., are mentioned in the Application Form. Investor onboarding
            will be done after running internal Anti-Money Laundering checks as
            applicable
          </p>
        ),
      },
      {
        q: "What is the recommended time horizon for investments made with your firm?",
        a: (
          <p>
            We advocate for a long-term perspective when it comes to equity
            investments. We advise clients interested in investing with us to
            plan for a minimum investment horizon of 3 to 5 years, and the
            longer the horizon, the better. For those with an investment
            timeline shorter than 3 years, we recommend seeking alternative
            investment opportunities better suited to their timeframes.
          </p>
        ),
      },
      {
        q: "Will my portfolio be identical to that of an existing client?",
        a: (
          <>
            <p>No, each client's portfolio is unique.</p>
            <p>
              We tailor and adjust the portfolio based on the individual
              client's start time with us, as well as any subsequent funds added
              or withdrawn. While incrementally we take similar decisions for
              our clients, for a new client, their portfolio at the time of
              entry may appear quite different from that of an existing client.
              This difference is also influenced by the current valuations of
              the companies we are looking to invest in. If valuations are
              attractive, we invest more promptly; however, if they are less so,
              the process of becoming fully invested may take longer, sometimes
              even several months.
            </p>
          </>
        ),
      },
      {
        q: "Could you share details of the investment schemes or offerings you provide? Also, is it possible to tailor a portfolio to suit my preference for a higher risk profile?",
        a: (
          <>
            <p>
              We are currently offering two investment strategies to meet
              diverse requirements of clients, you can view the details{" "}
              <a
                href="/investment-approach"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                <strong>here</strong>
              </a>
              .
            </p>
            <p>
              It's important to understand that equity investing inherently
              carries risk. We do not create portfolios that are more
              concentrated or carry a higher risk based on individual client
              requests. Our service is a discretionary Portfolio Management
              Service (PMS), where we are responsible for all investment
              decisions concerning the portfolio.
            </p>
          </>
        ),
      },
    ],
  },
  {
    heading: "Account opening",
    items: [
      {
        q: "Can I directly onboard as a client without going through an agent or distributor?",
        a: (
          <p>
            Absolutely. To initiate the onboarding process, please complete the{" "}
            <strong>
              <a
                href="https://forms.gle/tLNZUX1rBbf9kDPg6"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                form
              </a>
            </strong>{" "}
            on our website. Following that, we will arrange a call with you to
            proceed further.
          </p>
        ),
      },
      {
        q: "Which financial institution will my bank and demat accounts be opened with?",
        a: (
          <>
            <p>
              Your bank (NRI clients only) and demat accounts will be opened
              with Kotak Mahindra Bank or ICICI Bank, which serves as the
              designated custodians for client assets.
            </p>
            <p>
              For Resident Indian clients, we open only the Demat account with
              any one of the custodians ( Kotak Mahindra / ICICI Bank).
            </p>
            <ul>
              <li>
                A PMS pool bank account is a designated bank account maintained
                by the Portfolio Manager (PM) where funds from multiple PMS
                clients are collected (pooled) for investment purposes. This
                account is typically in the name of the Portfolio Manager or
                their PMS entity, not in the individual client's name. The
                client funds are deposited into the PMS provider's pool account,
                and your investments are tracked separately in their records and
                reporting systems. We maintain clear records of each client's
                contributions and investments.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How is the account structured and set up? What is the structure and setup process for an account?",
        a: (
          <p>
            To set up an account for a resident Indian client, we assist in
            opening a demat account. For Non-Resident Indians (NRIs), we
            additionally open a bank &amp; trading account alongside the demat
            account. These accounts are established under the client's name, and
            the client grants a Power of Attorney (PoA) to Solidarity to operate
            and manage these accounts on the client's behalf. Clients have the
            flexibility to open accounts either individually or jointly, and
            also appoint nominees for both bank and demat accounts.
          </p>
        ),
      },
      {
        q: "Who is eligible to open a PMS account as an NRI?",
        a: (
          <p>
            Non-Resident Indians (NRIs), Persons of Indian Origin (PIOs), and
            Overseas Citizens of India (OCIs) are eligible to open PMS accounts
            in India, subject to regulatory guidelines and proper documentation.
          </p>
        ),
      },
      {
        q: "What is the process for opening a PMS account for an NRI?",
        a: (
          <>
            <p>
              The NRI client must open a{" "}
              <strong>Portfolio Investment Scheme (PIS) account</strong>, which
              is a special bank account (NRE or NRO) required by RBI for NRIs to
              invest in Indian securities on a repatriable or non-repatriable
              basis. The PIS account must be opened with a designated bank
              authorized by RBI.
            </p>
            <p>
              In addition to the PIS account, the NRI client must also open a
              demat account with anyone of the designated custodians under
              Solidarity Advisors Private Limited.
            </p>
          </>
        ),
      },
      {
        q: "How long does it take to set up my account with Solidarity Advisors Pvt Ltd?",
        a: (
          <p>
            Once all documents are signed and the Know-Your-Customer (KYC)
            verification is complete, it will take approximately 5 to 7 working
            days to set up the account.
          </p>
        ),
      },
      {
        q: "What is a disclosure document?",
        a: (
          <>
            <p>
              Disclosure document is the mandatory document that the Portfolio
              Manager has to provide to the client at the time of or any time
              prior to entering into an agreement to provide Portfolio
              Management Services.
            </p>
            <p>
              The disclosure document contains the quantum and manner of payment
              of fees payable by the client for each activity, portfolio risks,
              complete disclosures in respect of transactions with related
              parties, the performance of the portfolio manager, and the audited
              financial statements of the portfolio manager for the immediately
              preceding three years.
            </p>
            <p>
              Please note: SEBI also does not certify the accuracy or adequacy
              of the contents of the disclosure document.
            </p>
            <p>
              The disclosure document is made available on the website of the
              Portfolio Manager in the{" "}
              <a
                href="https://www.solidarity.in/wp-content/uploads/2026/11/Disclosure-document-Nov-2026-Solidarity.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong className="faq-link-underline">disclosures</strong>
              </a>{" "}
              section.
            </p>
          </>
        ),
      },
      {
        q: "Where can the Portfolio Manager invest the clients' money?",
        a: (
          <p>
            Under Discretionary Portfolio Management Service (DPMS), Portfolio
            Managers shall invest funds of his clients in the securities listed
            or traded on a recognized stock exchange, money market instruments,
            units of Mutual Funds through direct plan, and other securities as
            specified by SEBI from time to time.
          </p>
        ),
      },
      {
        q: "What fees can a Portfolio Manager charge from its client for the services rendered by him?",
        a: (
          <>
            <p>
              According to the SEBI (Portfolio Managers) Regulations, 2020, the
              portfolio manager must charge a fee for portfolio management
              services based on the agreement with the customer. The cost may be
              management fees, a performance-based fee, or a combination of the
              two.
            </p>
            <p>
              The agreement between the portfolio manager and the client must
              specify, among other things, the amount and manner of fees due by
              the client for each activity for which the portfolio manager
              provides services. Please see{" "}
              <a
                href="/fee-structure"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong className="faq-link-underline">here</strong>
              </a>
              .
            </p>
          </>
        ),
      },
    ],
  },
  {
    heading: "Account funding/ redemption",
    items: [
      {
        q: "How does the process of withdrawal or redemption work?",
        a: (
          <>
            <p>
              Clients have the flexibility to opt for either partial or full
              redemptions from their account. For partial redemptions, it's
              important to note that the remaining balance post-withdrawal must
              comply with SEBI regulations, which currently mandates a minimum
              of INR 50 lakhs. The process of redemption can be initiated by
              sending an email to us from your registered email address.
            </p>
            <p>
              For a partial redemption, if your account holds sufficient cash,
              the transfer is usually completed within 3 working days. Should
              equities need to be sold, the timeline extends to 7-10 working
              days.
            </p>
            <p>
              In the case of a full redemption, we will liquidate the entire
              portfolio, and the majority of the funds will be transferred to
              your personal account, typically within 7 working days. A certain
              amount is reserved to cover any pending charges and fees. You will
              be required to sign the closure forms, and after a period of 30-45
              days, once all charges have been fully reconciled and settled, any
              remaining funds will be transferred to your account. Finally, we
              will handle the submission of account closure documents for bank,
              demat, and trading accounts (as applicable) to the relevant
              institutions, and send you a closure report.
            </p>
          </>
        ),
      },
      {
        q: "When can I contribute additional funds after the initial investment, and is there a minimum amount for these top-ups?",
        a: (
          <p>
            Clients are free to add funds to their account at any time after the
            initial investment, and there is no minimum amount required for
            these additional contributions.
          </p>
        ),
      },
      {
        q: "Can I transfer securities to fund my account, and if yes, which securities can I transfer?",
        a: (
          <p>
            Yes, it is possible to add securities to your portfolio after
            opening your depository account (demat account). However, please
            note that we only accept listed equities for inclusion in the
            portfolio account. We strongly recommend that clients consult with
            us prior to the transfer of any such securities.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Communication",
    items: [
      {
        q: "What kind of reports can the client expect from the Portfolio Manager?",
        a: (
          <>
            <p>
              The portfolio manager shall furnish periodically a report to the
              client, as per the agreement, but not exceeding a period of three
              months or as and when required by the client and such report shall
              contain the following details, namely: –
            </p>
            <ul>
              <li>
                the composition and the value of the portfolio, description of
                securities, number of securities, value of each security held in
                the portfolio, cash balance and aggregate value of the portfolio
                as on the date of report;
              </li>
              <li>
                transactions undertaken during the period of report including
                date of transaction and details of purchases and sales;
              </li>
              <li>
                beneficial interest received during that period in the form of
                interest, dividend, bonus shares, rights shares, etc;
              </li>
              <li>
                expenses incurred in managing the portfolio of the client;
              </li>
              <li>
                details of risk foreseen by the portfolio manager and the risk
                relating to the securities recommended by the portfolio manager
                for investment or disinvestment;
              </li>
              <li>
                default in payment of coupons or any other default in payments
                in the underlying debt security and downgrading to default
                rating by the rating agencies, if any;
              </li>
              <li>
                details of commission paid to distributor(s) for the client.
              </li>
            </ul>
            <p>
              The client may appoint a chartered accountant to audit the books
              and accounts of the portfolio manager relating to his transactions
              and the portfolio manager shall co-operate with such chartered
              accountant in course of the audit.
            </p>
          </>
        ),
      },
      {
        q: "What are the options for accessing the details of my portfolio?",
        a: (
          <>
            <p>
              To ensure you are always informed and up-to-date with your
              investments, we provide a comprehensive suite of reports and
              updates. Here's what you can expect in terms of communication and
              reporting:
            </p>
            <ul>
              <li>
                Notifications to your registered email address for any
                Fund/Securities transfers to or from your PMS account
              </li>
              <li>
                Monthly Reports: A detailed Portfolio statement by the 10th
                working day of each month.
              </li>
              <li>
                Quarterly Advance Tax Data: Capital gains, Interest income,
                Dividend, TDS information for advance tax purposes, provided by
                the 12th day of each quarter-ending month.
              </li>
              <li>
                Quarterly Reports: A detailed Portfolio statement by the 20th
                working day after the end of the quarter
              </li>
              <li>
                Yearly reports: A detailed statement with relevant data for
                India tax filing, provided by April 30 of each year, including
                details like capital gains, interest, dividends, TDS, securities
                at cost, bank statement, broker ledger, etc
              </li>
              <li>
                Annual statement: An audited report with relevant data for India
                tax filing, provided by June each year, including details like
                capital gains, interest, dividends, TDS, securities at cost,
                bank statement, broker ledger, etc.
              </li>
              <li>
                Billing Report: A billing report provided quarterly for the
                management fee, performance fee (if applicable) &amp; custody
                &amp; Fund accounting incurred for the previous quarter.
              </li>
              <li>
                Event-based and ad-hoc communication: This includes updates
                related to share buybacks, IPOs, Re-KYC notifications (if
                required by the bank/broker), and any other
                regulatory/account-related updates.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "How can I access my PMS account online?",
        a: (
          <>
            <p>
              You can view your portfolio details and download statements
              directly from the client portal accessible from our website.
            </p>
            <p>
              <a
                href="https://app.solidarity.in/wealthspectrum/app/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                https://app.solidarity.in/wealthspectrum/app/login
              </a>
            </p>
            <p>
              We have attached step-by-step instructions to guide you through
              the process. If you face any issues, please reach out to us at{" "}
              <a href="mailto:info@solidarity.in" style={{ textDecoration: 'underline' }}>info@solidarity.in</a> and we
              will be glad to assist. Please click{" "}
              <a
                href="https://www.solidarity.in/wp-content/uploads/2025/07/Updated-User-manual-for-the-client-report-software-access-23-Jul-25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                <strong>here</strong>
              </a>{" "}
              to access our user manual.
            </p>
          </>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <InnerPageLayout title="FAQs">
      <div className="faq-body">
        {sections.map((section, sIdx) => (
          <div key={section.heading} className="faq-section">
            <h2 className="faq-section__heading">{section.heading}</h2>
            <div className="faq-list">
              {section.items.map((item, idx) => {
                const key = `${section.heading}-${idx}`;
                const isOpen = openKey === key;
                const toggleId = `faq-toggle-${sIdx}-${idx}`;
                const panelId = `faq-panel-${sIdx}-${idx}`;
                return (
                  <div
                    key={key}
                    className={`faq-toggle${isOpen ? " faq-toggle--open" : ""}`}
                    role="region"
                    aria-labelledby={toggleId}
                  >
                    <button
                      id={toggleId}
                      className="faq-toggle__title"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="faq-toggle__icon" aria-hidden="true" />
                      <h3>{item.q}</h3>
                    </button>
                    {isOpen && (
                      <div id={panelId} className="faq-toggle__content">{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Ask your question */}
        <div className="faq-section faq-ask">
          <h2 className="faq-section__heading">Ask your question</h2>
          <p>
            If you have any questions that have not been addressed, please write
            to{" "}
            <a href="mailto:clientservice@solidarity.in" style={{ textDecoration: 'underline' }}>
              clientservice@solidarity.in
            </a>
            .
          </p>
        </div>
      </div>
    </InnerPageLayout>
  );
}
