import { GraphQLRequest } from "apollo-link";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  link: createHttpLink({ uri: "https://api-next.datengui.de/graphql" }),
  cache: new InMemoryCache()
});

export interface QueryResult {
  region: {
    stat: {
      year: number;
      value: number;
    }[];
  };
}

export interface StatResult {
  id: string;
  value: number;
};

class DataMissingError extends Error {
  public id: string;

  constructor(msg: string, id: string) {
    super(msg);
    this.id = id;
  }
}

export const fetchValues = async (query: GraphQLRequest, locations: string[]) => {
  const results = await Promise.all(
    locations.map(async (id) => {
      const { data }: { data: QueryResult } = await client.query({
        query,
        variables: { nuts3: id }
      });
      return { id, data };
    })
  );

  const lowYear = results.reduce((year, { data, id }) => {
    const { stat } = data.region;
    if (stat.length === 0) {
      throw new DataMissingError(`Statistics for ${id} is empty!`, id);
    }
    const lastYear = stat[stat.length - 1].year;
    if (lastYear < year) {
      return lastYear;
    }
    return year;
  }, new Date().getFullYear());

  const stats: StatResult[] = results.map(({ id, data }) => {
    const { value = "" } = data.region.stat.find(({ year }) => year === lowYear) || {};
    if (!value) {
      throw new DataMissingError(`Data for last year not available in ${id}`, id);
    }
    return {
      id,
      value,
    };
  });

  return {
    stats,
    lowYear,
  };
}
