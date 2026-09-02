import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InnerPageLayout from "../components/InnerPageLayout";
import { ALL_POSTS, type PostData } from "../data/posts";
import PerspectivesSidebar from "../components/PerspectivesSidebar";
import "./PerspectivesListingPage.css";

const POSTS_PER_PAGE = 10;

/** Curated blogs only: order matches site pagination (10 per page × 5 pages). Slugs align with ref-style paths (title lowercased, spaces → `-`). */
const BLOGS_SLUG_SEQUENCE = [
  // Page 1
  "brief-update-from-our-vantage-point-20-aug-2026",
  "perspective-on-qsr-sector-and-rba",
  "solidarity-partners-meet-interview-with-dr-harin-kanani-mr-prabh-mehar-singh",
  "stillness-backing-a-mission-oriented-promoter-and-the-rewards-of-good-karma-rakesh-jhunjhunwalas-incredible-340x-returns-in-inventurus",
  "what-i-learned-from-rakesh-jhunjhunwala",
  "consequences-of-putins-war-in-ukraine",
  "investing-during-a-crisis",
  "signal-vs-noise-what-game-are-we-playing",
  "the-futility-of-taking-cash-calls",
  // 'the-futility-of-taking-cash-calls-2',
  "why-we-are-reluctant-to-take-cash-calls-at-present",
  "dear-prime-minister-give-us-a-message-of-hope-courage-and-equanimity",
  // Page 2
  "playing-the-game-vs-being-clear-on-what-game-you-are-playing",
  "why-did-franklin-templeton-wind-up-six-credit-funds",
  "positioning-portfolios-in-context-of-the-corona-virus-5",
  "positioning-portfolios-in-context-of-the-corona-virus-4",
  "positioning-portfolios-in-context-of-the-corona-virus-3-3",
  "positioning-portfolios-in-context-of-the-corona-virus-2-3",
  "positioning-portfolios-in-context-of-the-corona-virus",
  "our-perspective-on-the-bharat-bond-etf",
  "invest-in-some-gold-in-your-portfolios",
  "is-this-a-good-time-to-add-to-equity-allocations",

  // Page 3
  "are-you-aware-of-the-risk-in-your-debt-investments",
  "is-this-the-right-time-to-deploy-capital-in-equity-markets-an-answer-it-yourself-guide",
  "i-can-think-i-can-wait-i-can-fast",
  "repetition-of-truths",
  "what-do-you-believe-in",
  "trump-black-money-and-implications-for-stock-prices",
  "developing-competitive-advantage-as-an-investor", 
  "role-of-behaviour-in-long-term-investment-performance",
  "the-pain-associated-with-being-a-long-term-investor",
  "the-british-referendum-is-it-time-to-load-the-elephant-gun",
  // Page 4
  "investment-perspectives-define-your-guiding-principles",
  "beware-the-enemy-within",
  "caveat-emptor",
  "the-strategic-importance-of-holding-cash-and-equivalents",
  "is-this-2008-once-again",
  "measuring-fund-manager-performance",
  "the-fallacy-of-growth-now-profits-later-approach-to-building-a-business",
  "5-reasons-your-venture-has-not-got-funding",
  "investment-strategy-at-the-current-juncture",
  "will-the-fed-raise-rates-and-the-implications-for-indian-markets",
  // Page 5
  "the-three-questions-clients-should-ask-investment-advisors",
  "using-the-impatience-of-others-to-your-advantage",
  "the-importance-of-cash-generation-over-growth",
  "choosing-the-right-investor-a-guide-for-founders",
  "my-3-biggest-learnings-working-with-rakesh-jhunjhunwala",
];
/** Select Company Perspectives only: order matches pagination (10 + 10 + 9 + 9). Slugs from post `slug` fields (ref-style paths). Same slug is not repeated (QSR note and Restaurant Brands Asia share one post). */
const COMPANY_PERSPECTIVE_SLUG_SEQUENCE = [
  // Page 1
  "investment-thesis-on-mamata-machinery",
  "investment-thesis-on-vasa-denticity",
  "investment-thesis-on-synergy-green-industries-ltd",
  "investment-thesis-on-yasho-industries-limited",
  "perspective-on-qsr-sector-and-rba",
  "investment-thesis-on-axtel-industries",
  "investment-thesis-on-sansera-engineering",
  "investment-thesis-on-pix-transmissions-limited",
  "solidarity-partners-meet-interview-with-dr-harin-kanani-mr-prabh-mehar-singh",
  "investment-thesis-of-our-top-15-positions-in-our-prudence-scheme",
  "investment-in-shivalik-bimetal-controls-ltd-2",
  "investment-thesis-on-indiamart",
  // Page 2
  "investment-in-shivalik-bimetal-controls-ltd",
  "investment-thesis-on-racl-geartech",
  "investment-thesis-on-delhivery",
  "investment-thesis-on-yasho-industries",
  "investment-thesis-on-indiamart-intermesh",
  "rationale-for-trimming-position-size-in-life-insurance-to-15",
  "investment-thesis-on-restaurant-brands-asia",
  "why-have-we-continued-to-buy-star-health",
  "investment-thesis-on-kama-holdings",
  "investment-thesis-on-man-industries",
  // Page 3
  "perspective-on-life-insurance-companies-post-budget",
  // Page 3
  "investment-thesis-on-neogen-chemicals-2",
  "investment-thesis-on-icici-prudential-life-insurance-2",
  "perspective-on-life-insurance-companies-2",
  "investment-thesis-on-team-lease-2",
  "exit-note-on-team-lease",
  "investment-thesis-on-star-health-life-insurance-2",
  "investment-thesis-on-mayur-uniquoters-2",
  "perspective-on-life-insurance-companies",
  "investment-thesis-on-solara-active-pharma-2",
  "investment-thesis-on-axis-bank",
  // Page 4
  "investment-thesis-on-itc-2",
  "investment-thesis-on-india-mart-29-jan-2021",
  "investment-thesis-on-hdfc-bank-2",
  "investment-thesis-on-garware-technical-fibres-ltd",
  "investment-thesis-on-max-life-insurance-2",
  "investment-thesis-on-jsw-energy-2",
  "investment-thesis-on-sequent-scientific-2",
  "investment-thesis-on-srf-2",
];
const EQUITY_SLUG_SEQUENCE = [
  // Page 1 (items 1-10)
  "investment-thesis-on-synergy-green-industries-ltd",
  "perspective-on-qsr-sector-and-rba",
  "interview-with-mr-anurag-surana-a-domain-expert-on-specialty-chemicals-for-his-decadal-views-on-the-industry",
  "solidarity-partners-meet-interview-with-dr-harin-kanani-mr-prabh-mehar-singh",
  "investment-implications-for-indian-investors-in-a-trumpian-world",
  "moving-forward-with-strategy-not-with-emotion-our-view-on-investing-in-small-and-mid-caps-at-present",
  "investment-thesis-on-yasho-industries",
  "outlook-for-future-returns-5",
  "is-it-different-this-time",
  "our-perspectives-on-valuation-euphoria-in-small-and-micro-caps-at-present",
  // Page 2 (items 11-20)
  "looking-for-asymmetric-outcomes",
  "the-shadow-of-private-equity-ownership-on-our-buying-decisions",
  "pms-vs-mutual-funds-vs-alternate-investment-fund-2",
  "why-have-we-continued-to-buy-star-health",
  "why-do-we-never-go-down-the-risk-curve-in-financials-to-chase-cheap-valuations",
  "investment-thesis-on-kama-holdings",
  "investment-thesis-on-man-industries",
  "perspective-on-life-insurance-companies-post-budget",
  "return-expectations-from-indian-equities-2",
  "perspective-on-life-insurance-companies",
  // Page 3 (items 21-30)
  "exit-note-on-team-lease",
  "performance-measurement-the-difference-between-twrr-and-xirr",
  "the-stock-market-is-not-being-irrational",
  "need-for-realism-in-return-expectations",
  "perspective-on-life-insurance-companies-2",
  "the-fin-tech-valuation-delusion",
  "will-technology-firms-take-value-away-from-private-banks",
  "the-flaws-of-sharpe-ratio",
  "the-shocking-resilience-of-indias-stock-markets",
  "is-value-investing-dead",
  // Page 4 (items 31-40)
  "implications-of-sebi-new-guidelines-on-multi-cap-funds",
  "update-from-the-front",
  "strategic-implications-of-sbi-yes-bank-bailout-for-banking-sector",
  "why-do-we-not-own-any-mid-sized-banks",
  "implications-of-re-pricing-of-credit-risk-in-india",
  "a-perspective-on-fmcg-valuations",
  "high-noon-for-wholesale-funded-nbfcs",
  "should-one-add-to-equity-exposure-at-present",
  "the-impending-value-migration",
  "tell-me-where-i-am-going-to-die-so-i-will-never-go-there-2",
  // Page 5 (items 41-44)
  "the-danger-of-1-year-forward-multiples",
  "is-it-time-for-contrarian-bets-on-select-companies-in-the-power-sector",
  "indian-pharma-industry-implications-of-recent-developments",
  "why-buy-quality-a-lesson-from-college-days",
];

const ASSET_ALLOCATION_SLUG_SEQUENCE = [
  "why-are-gold-prices-rising",
  "gold-2",
  "why-we-are-reluctant-to-take-cash-calls-at-present",
  "observations-on-asset-allocation-2",
  "our-perspective-on-the-bharat-bond-etf",
  "invest-in-some-gold-in-your-portfolios",
  "are-you-aware-of-the-risk-in-your-debt-investments",
  "i-can-think-i-can-wait-i-can-fast",
  "the-strategic-importance-of-holding-cash-and-equivalents",
  "is-this-2008-once-again",
  "the-three-questions-clients-should-ask-investment-advisors",
];

const INVESTMENT_MANAGEMENT_SLUG_SEQUENCE = [
  // Page 1
  "interview-with-mr-anurag-surana-a-domain-expert-on-specialty-chemicals-for-his-decadal-views-on-the-industry",
  "solidarity-partners-meet-interview-with-dr-harin-kanani-mr-prabh-mehar-singh",
  "moving-forward-with-strategy-not-with-emotion-our-view-on-investing-in-small-and-mid-caps-at-present",
  "stillness-backing-a-mission-oriented-promoter-and-the-rewards-of-good-karma-rakesh-jhunjhunwalas-incredible-340x-returns-in-inventurus",
  "what-explains-our-optimism-when-they-are-lower-roe-vs-consumer-companies-and-hardly-generate-any-free-cash-flow",
  "how-do-we-decide-composition-of-smallmid-and-large-caps-in-the-portfolio-2",
  "why-not-sell-if-we-are-concerned-that-small-and-microcaps-are-overvalued-2",
  "our-approach-to-building-solidarity-2",
  "a-perspective-on-churn-2",
  "portfolio-positioning-and-approach-2",
  // Page 2
  "what-i-learned-from-rakesh-jhunjhunwala",
  "why-do-we-not-own-commodities-2",
  "investing-during-a-crisis",
  "signal-vs-noise-what-game-are-we-playing",
  "our-process-for-exit-decisions-part-2",
  "developing-a-process-to-shut-out-the-noise-2",
  "our-perspective-to-some-commonly-asked-questions-part-1-2",
  "the-futility-of-taking-cash-calls",
  "our-perspective-to-some-commonly-asked-questions-part-2-2",
  "our-process-for-exit-decisions",
  // Page 3
  "playing-the-game-vs-being-clear-on-what-game-you-are-playing",
  "why-did-franklin-templeton-wind-up-six-credit-funds",
  "positioning-portfolios-in-context-of-the-corona-virus-5",
  "positioning-portfolios-in-context-of-the-corona-virus-4",
  "interpreting-news-flow",
  "positioning-portfolios-in-context-of-the-corona-virus-3-3",
  "positioning-portfolios-in-context-of-the-corona-virus-2-3",
  "positioning-portfolios-in-context-of-the-corona-virus",
  "is-this-a-good-time-to-add-to-equity-allocations",
  "our-approach-to-portfolio-design-2",
  // Page 4
  "is-this-the-right-time-to-deploy-capital-in-equity-markets-an-answer-it-yourself-guide",
  "repetition-of-truths",
  "what-do-you-believe-in",
  "developing-competitive-advantage-as-an-investor",
  "role-of-behaviour-in-long-term-investment-performance",
  "the-pain-associated-with-being-a-long-term-investor",
  "investment-perspectives-define-your-guiding-principles",
  "beware-the-enemy-within",
  "caveat-emptor",
  "measuring-fund-manager-performance",
  // Page 5
  "investment-strategy-at-the-current-juncture",
  "using-the-impatience-of-others-to-your-advantage",
  "the-importance-of-cash-generation-over-growth",
  "choosing-the-right-investor-a-guide-for-founders",
  "my-3-biggest-learnings-working-with-rakesh-jhunjhunwala",
];

const MACRO_ENVIRONMENT_SLUG_SEQUENCE = [
  "interview-with-mr-anurag-surana-a-domain-expert-on-specialty-chemicals-for-his-decadal-views-on-the-industry",
  "investment-implications-for-indian-investors-in-a-trumpian-world",
  "worsening-macro-situation-in-china-and-high-interest-rates-in-the-us-2",
  "indian-markets-if-the-bjp-loses-the-2024-election-2",
  "implications-of-global-repricing-of-risk-2",
  "has-india-decoupled-2",
  "consequences-of-putins-war-in-ukraine",
  "dear-prime-minister-give-us-a-message-of-hope-courage-and-equanimity",
  "trump-black-money-and-implications-for-stock-prices",
  "the-british-referendum-is-it-time-to-load-the-elephant-gun",
  "will-the-fed-raise-rates-and-the-implications-for-indian-markets",
];

const VENTURE_CAPITAL_SLUG_SEQUENCE = [
  "the-fallacy-of-growth-now-profits-later-approach-to-building-a-business",
  "5-reasons-your-venture-has-not-got-funding",
];

const CLIENT_QUESTIONS_SLUG_SEQUENCE = [
  // Page 1
  "indian-markets-if-the-bjp-loses-the-2024-election-2",
  "outlook-for-future-returns-5",
  "what-explains-our-optimism-when-they-are-lower-roe-vs-consumer-companies-and-hardly-generate-any-free-cash-flow",
  "how-do-we-decide-composition-of-smallmid-and-large-caps-in-the-portfolio-2",
  "pms-vs-mutual-funds-vs-alternate-investment-fund-2",
  "implications-of-global-repricing-of-risk-2",
  "why-not-sell-if-we-are-concerned-that-small-and-microcaps-are-overvalued-2",
  "our-approach-to-building-solidarity-2",
  "a-perspective-on-churn-2",
  "return-expectations-from-indian-equities-2",

  // Page 2
  "portfolio-positioning-and-approach-2",
  "gold-2",
  "has-india-decoupled-2",
  "why-do-we-not-own-commodities-2",
  "our-process-for-exit-decisions-part-2",
  "developing-a-process-to-shut-out-the-noise-2",
  "our-perspective-to-some-commonly-asked-questions-part-1-2",
  "the-futility-of-taking-cash-calls",
  // 'the-futility-of-taking-cash-calls-2',
  "our-perspective-to-some-commonly-asked-questions-part-2-2",
  "our-process-for-exit-decisions",

  // Page 3
  "observations-on-asset-allocation-2",
  "our-approach-to-portfolio-design-2",
];

interface Props {
  categoryTitle: string;
  filterCategory?: string;
}

export default function PerspectivesListingPage({
  categoryTitle,
  filterCategory,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("s") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("s");
    if (q !== null) {
      setSearchQuery(q);
      setSearchParams(
        (prev) => {
          prev.set("page", "1");
          return prev;
        },
        { replace: true },
      );
    }
  }, [searchParams]);

  const filteredPosts =
    filterCategory === "Company Perspective"
      ? ALL_POSTS.filter(
          (p) =>
            p &&
            (p.categories.includes("Company Perspective") ||
              p.categories.includes("Select Company Perspectives")),
        )
      : filterCategory
        ? ALL_POSTS.filter((p) => p && p.categories.includes(filterCategory))
        : ALL_POSTS;

  const orderedPosts =
    filterCategory === "Blogs"
      ? BLOGS_SLUG_SEQUENCE.map((slug) =>
          filteredPosts.find((post) => post && post.slug === slug),
        ).filter((post): post is (typeof filteredPosts)[number] =>
          Boolean(post),
        )
      : filterCategory === "Company Perspective"
        ? COMPANY_PERSPECTIVE_SLUG_SEQUENCE.map((slug) =>
            ALL_POSTS.find((post) => post && post.slug === slug),
          ).filter((post): post is PostData => Boolean(post))
        : filterCategory === "Investment Management"
          ? INVESTMENT_MANAGEMENT_SLUG_SEQUENCE.map((slug) =>
              filteredPosts.find((post) => post && post.slug === slug),
            ).filter((post): post is (typeof filteredPosts)[number] =>
              Boolean(post),
            )
          : filterCategory === "Perspective On Questions From Client Partners"
            ? CLIENT_QUESTIONS_SLUG_SEQUENCE.map((slug) =>
                filteredPosts.find((post) => post && post.slug === slug),
              ).filter((post): post is (typeof filteredPosts)[number] =>
                Boolean(post),
              )
            : filterCategory === "Asset Allocation"
              ? ASSET_ALLOCATION_SLUG_SEQUENCE.map((slug) =>
                  filteredPosts.find((post) => post && post.slug === slug),
                ).filter((post): post is (typeof filteredPosts)[number] =>
                  Boolean(post),
                )
              : filterCategory === "Equity"
                ? EQUITY_SLUG_SEQUENCE.map((slug) =>
                    filteredPosts.find((post) => post && post.slug === slug),
                  ).filter((post): post is (typeof filteredPosts)[number] =>
                    Boolean(post),
                  )
                : filterCategory === "Macro Environment"
                  ? MACRO_ENVIRONMENT_SLUG_SEQUENCE.map((slug) =>
                      filteredPosts.find((post) => post && post.slug === slug),
                    ).filter((post): post is (typeof filteredPosts)[number] =>
                      Boolean(post),
                    )
                  : filterCategory === "Venture Capital"
                    ? VENTURE_CAPITAL_SLUG_SEQUENCE.map((slug) =>
                        filteredPosts.find(
                          (post) => post && post.slug === slug,
                        ),
                      ).filter((post): post is (typeof filteredPosts)[number] =>
                        Boolean(post),
                      )
                    : filteredPosts;

  const searchedPosts = searchQuery.trim()
    ? ALL_POSTS.filter(
        (p) => p && p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : orderedPosts;

  const totalPages = Math.ceil(searchedPosts.length / POSTS_PER_PAGE);
  const pagePosts = searchedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const bannerTitle = searchQuery.trim()
    ? `Search Results: ${searchQuery.trim()}`
    : categoryTitle

  return (
    <InnerPageLayout
      title={bannerTitle}
      bannerBg="/assets/perspectives-banner.jpg"
    >
      <div className="perspectives-container">
        {/* ── Posts column ── */}
        <div className="posts-column" aria-live="polite">
          {searchQuery.trim() && searchedPosts.length === 0 && (
            <p className="posts-no-results">
              No results found for "{searchQuery}".
            </p>
          )}

          {pagePosts.map((post) => (
            <article key={post.id} className="post-item">
              <div className="post-item__body">
                <h2 className="post-item__title">
                  <Link to={`/perspectives/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <div className="post-item__excerpt">{post.excerpt}</div>
                <Link
                  to={`/perspectives/post/${post.slug}`}
                  className="post-item__read-more"
                >
                  Read More<span className="sr-only"> about {post.title}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <PerspectivesSidebar
          latestPosts={orderedPosts.slice(0, 3)}
        />
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-numbers${page === currentPage ? " current" : ""}`}
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("page", String(page));
                  return prev;
                });
                window.scrollTo(0, 0);
              }}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={page === currentPage ? `Page ${page}` : `Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </nav>
      )}
    </InnerPageLayout>
  );
}
