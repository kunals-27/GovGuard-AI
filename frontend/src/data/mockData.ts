export interface Article {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  contradictionLevel: 'high' | 'medium' | 'low' | 'none';
  sentiment: 'positive' | 'neutral' | 'negative';
  topics: string[];
  url: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Congressional Budget Office Reports Record High Infrastructure Spending',
    source: 'Reuters',
    timestamp: '2025-01-13T10:30:00Z',
    summary: 'The Congressional Budget Office released its quarterly report showing infrastructure spending reached $2.3 trillion this fiscal year, representing a 15% increase from the previous year. The report highlights significant investments in renewable energy projects, bridge repairs, and digital infrastructure upgrades across 48 states.',
    contradictionLevel: 'medium',
    sentiment: 'positive',
    topics: ['Economy', 'Politics'],
    url: 'https://example.com/article1'
  },
  {
    id: '2',
    title: 'Healthcare Reform Bill Passes Senate Committee with Bipartisan Support',
    source: 'AP News',
    timestamp: '2025-01-13T08:15:00Z',
    summary: 'A comprehensive healthcare reform bill focusing on prescription drug pricing and mental health coverage passed the Senate Health Committee with a 14-8 vote. The legislation aims to reduce prescription costs by 30% over the next five years and expand mental health services in rural communities.',
    contradictionLevel: 'low',
    sentiment: 'positive',
    topics: ['Healthcare', 'Politics'],
    url: 'https://example.com/article2'
  },
  {
    id: '3',
    title: 'Climate Action Summit Yields Mixed Results on Carbon Emission Targets',
    source: 'The Guardian',
    timestamp: '2025-01-13T06:45:00Z',
    summary: 'The international climate summit concluded with 15 nations committing to new carbon reduction goals, though critics argue the targets fall short of scientific recommendations. The summit produced agreements on renewable energy investments but failed to reach consensus on fossil fuel phase-out timelines.',
    contradictionLevel: 'high',
    sentiment: 'neutral',
    topics: ['Climate', 'Politics'],
    url: 'https://example.com/article3'
  },
  {
    id: '4',
    title: 'Federal Education Department Announces $50B Investment in STEM Programs',
    source: 'CNN',
    timestamp: '2025-01-13T05:20:00Z',
    summary: 'Education Secretary announced a landmark $50 billion investment program targeting STEM education in underserved communities. The initiative will establish 500 new technology centers and train 100,000 teachers in advanced mathematics and computer science over the next decade.',
    contradictionLevel: 'none',
    sentiment: 'positive',
    topics: ['Education', 'Technology'],
    url: 'https://example.com/article4'
  },
  {
    id: '5',
    title: 'Trade Agreement Negotiations Face New Obstacles Over Agricultural Policies',
    source: 'BBC News',
    timestamp: '2025-01-13T04:10:00Z',
    summary: 'Ongoing trade negotiations between major economic partners encountered significant hurdles this week as disagreements over agricultural subsidies and import tariffs intensified. Both sides remain committed to reaching an agreement but acknowledge that resolution may take several more months.',
    contradictionLevel: 'medium',
    sentiment: 'negative',
    topics: ['Economy', 'Politics'],
    url: 'https://example.com/article5'
  },
  {
    id: '6',
    title: 'Cybersecurity Initiative Receives Unanimous Congressional Approval',
    source: 'Washington Post',
    timestamp: '2025-01-12T22:30:00Z',
    summary: 'Congress unanimously approved a comprehensive cybersecurity initiative allocating $25 billion for federal agency security upgrades and private sector partnerships. The bill includes provisions for improved threat detection systems and enhanced coordination between government and technology companies.',
    contradictionLevel: 'none',
    sentiment: 'positive',
    topics: ['Technology', 'Politics'],
    url: 'https://example.com/article6'
  }
];