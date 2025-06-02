export interface Influencer {
  platform: string;
  username: string;
  followers: number;
  description: string;
  thumbnail: string;
  engagement_rate: number;
  niche: string;
  location: string;
  quality_score: number;
  email?: string;
  image_url?: string;
  bio?: string;
}

export class InfluencerSearchEngine {
  async search(
    platform: string,
    query: string,
    filters?: {
      minFollowers?: number;
      maxFollowers?: number;
      niche?: string;
      location?: string;
    }
  ): Promise<Influencer[]> {
    try {
      const response = await fetch(`/mock_${platform}_influencers.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${platform} data`);
      }

      const data = await response.json();
      let influencers = data[`${platform}_influencers`];

      // Apply filters
      if (filters) {
        if (filters.minFollowers) {
          influencers = influencers.filter(
            (inf: Influencer) => inf.followers >= filters.minFollowers!
          );
        }
        if (filters.maxFollowers) {
          influencers = influencers.filter(
            (inf: Influencer) => inf.followers <= filters.maxFollowers!
          );
        }
        if (filters.niche) {
          influencers = influencers.filter(
            (inf: Influencer) =>
              inf.niche.toLowerCase() === filters.niche!.toLowerCase()
          );
        }
        if (filters.location) {
          influencers = influencers.filter(
            (inf: Influencer) =>
              inf.location.toLowerCase() === filters.location!.toLowerCase()
          );
        }
      }

      // Apply search query
      if (query) {
        const searchTerms = query.toLowerCase().split(" ");
        influencers = influencers.filter((inf: Influencer) => {
          const searchableText = [
            inf.username,
            inf.description,
            inf.niche,
            inf.location,
            inf.bio,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return searchTerms.every((term) => searchableText.includes(term));
        });
      }

      return influencers;
    } catch (error) {
      console.error("Error searching influencers:", error);
      return [];
    }
  }
}

export async function searchInfluencers(
  platform: string,
  query: string,
  filters?: {
    minFollowers?: number;
    maxFollowers?: number;
    niche?: string;
    location?: string;
  }
): Promise<Influencer[]> {
  const engine = new InfluencerSearchEngine();
  return engine.search(platform, query, filters);
} 