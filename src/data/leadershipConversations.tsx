import type { PostData } from "./posts";

interface LeadershipConversation {
  id: string;
  slug: string;
  title: string;
  date: string;
  youtubeId: string;
  summary: string;
}

const conversations: LeadershipConversation[] = [
  {
    id: "leadership-conversation-sealmatic-2026-11-05",
    slug: "leadership-conversation-with-umar-a-k-balwa-sealmatic-india",
    title: "Conversation with Mr Umar A K Balwa of Sealmatic India",
    date: "November 5, 2026",
    youtubeId: "qmDoOxE6xY0",
    summary:
      "Mr Umar A K Balwa, Managing Director of Sealmatic India, discusses the leadership and execution behind the company's growth.",
  },
  {
    id: "leadership-conversation-synergy-green-2026-04-02",
    slug: "leadership-conversation-with-v-srinivasa-reddy-synergy-green",
    title: "Conversation with Mr V Srinivasa Reddy of Synergy Green Industries",
    date: "April 2, 2026",
    youtubeId: "kpab4veU-Ak",
    summary:
      "Mr V Srinivasa Reddy, Executive Director of Synergy Green Industries, shares lessons from nearly three decades in critical castings manufacturing.",
  },
  {
    id: "leadership-conversation-yasho-2026-02-27",
    slug: "leadership-conversation-with-parag-jhaveri-yasho-industries",
    title: "Conversation with Mr Parag Jhaveri of Yasho Industries",
    date: "February 27, 2026",
    youtubeId: "6kjbn4lqQsA",
    summary:
      "Mr Parag Jhaveri, Managing Director of Yasho Industries, discusses the company's growth and approach to building a sustainable future.",
  },
  {
    id: "leadership-conversation-anurag-surana-2025-09-03",
    slug: "leadership-conversation-with-anurag-surana-specialty-chemicals",
    title: "Conversation with Mr Anurag Surana on Indian Specialty Chemicals",
    date: "September 3, 2025",
    youtubeId: "MaWtOm8jdSw",
    summary:
      "Industry expert Mr Anurag Surana discusses the opportunities and challenges facing Indian specialty chemical companies.",
  },
];

function ConversationVideo({
  youtubeId,
  title,
  summary,
}: Pick<LeadershipConversation, "youtubeId" | "title" | "summary">) {
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

  return (
    <div>
      <p>{summary}</p>
      <div className="leadership-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p>
        <a href={watchUrl} target="_blank" rel="noopener noreferrer">
          Watch this conversation on YouTube
        </a>
      </p>
    </div>
  );
}

export const LEADERSHIP_CONVERSATION_POSTS: PostData[] = conversations.map(
  (conversation) => ({
    id: conversation.id,
    slug: conversation.slug,
    title: conversation.title,
    date: conversation.date,
    author: "Solidarity Investment Managers",
    categories: ["Leadership Conversations"],
    categoryLinks: [
      {
        label: "Leadership Conversations",
        path: "/perspectives/leadership-conversations",
      },
    ],
    excerpt: <p>{conversation.summary}</p>,
    content: (
      <ConversationVideo
        youtubeId={conversation.youtubeId}
        title={conversation.title}
        summary={conversation.summary}
      />
    ),
  }),
);
