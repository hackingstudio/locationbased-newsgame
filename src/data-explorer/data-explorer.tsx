import React, { useState, useCallback, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { ApolloClient, ApolloError } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://api-next.datengui.de/graphql" }),
  cache: new InMemoryCache()
});

const buildCityQuery = (statID: string, filter?: string) => {
  return gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: ${statID} ${filter ? `(${filter})` : ""} {
          year
          value
        }
      }
    }
  `;
};

const cities = {
  Essen: {
    id: "05113"
  },
  Nürnberg: {
    id: "09564"
  }
};

interface QueryResult {
  region: {
    stat: {
      year: number;
      value: number;
    }[];
  };
}

interface DataStats {
  name: string;
  value: number;
}

interface Data {
  year?: number;
  stats?: DataStats[];
  error?: string;
  query?: string;
}

const dataReducer = (state: Data, action): Data => {
  switch (action.type) {
    case "SET_DATA": {
      const { year, stats, query } = action.payload;
      return {
        ...state,
        year,
        stats,
        query
      };
    }
    case "ERROR": {
      const { error, query } = action.payload;
      return {
        error,
        query
      };
    }
    default:
      return state;
  }
};

const DataExplorer: React.SFC = props => {
  const [statID, setStatID] = useState("");
  const [filter, setFilter] = useState("");
  const [data, dispatch] = useReducer(dataReducer, {});
  const execute = useCallback(
    async e => {
      e.preventDefault();
      let queryString = "";
      try {
        const query = buildCityQuery(statID, filter);
        queryString = query.loc.source.body;
        const results = await Promise.all(
          Object.entries(cities).map(async ([name, { id }]) => {
            const { data }: { data: QueryResult } = await client.query({
              query,
              variables: { nuts3: id }
            });
            return { id, name, data };
          })
        );
        console.log(results);
        const lowYear = results.reduce((year, { data, name }) => {
          const { stat } = data.region;
          if (stat.length === 0) {
            throw new Error(`Statistics for ${name} is empty!`);
          }
          const lastYear = stat[stat.length - 1].year;
          if (lastYear < year) {
            return lastYear;
          }
          return year;
        }, new Date().getFullYear());
        const stats: DataStats[] = results.map(({ name, data }) => {
          const set = data.region.stat.find(({ year }) => year === lowYear);
          if (!set) {
            console.warn("year not found for city:", name);
          }
          const value = set ? set.value : 0;
          return {
            name,
            value
          };
        });
        console.log("year:", lowYear);
        console.log("stats:", stats);
        dispatch({
          type: "SET_DATA",
          payload: {
            year: lowYear,
            stats,
            query: queryString
          }
        });
      } catch (error) {
        let msg = error.message;
        if (error instanceof ApolloError && error.networkError) {
          const { result } = error.networkError as any;
          console.error(result);
          msg = result.errors.map(err => err.message).join("\n");
        }
        dispatch({
          type: "ERROR",
          payload: {
            error: msg,
            query: queryString
          }
        });
      }
    },
    [statID, filter]
  );

  const { year, stats, error, query } = data;
  return (
    <Container maxWidth="sm">
      <form onSubmit={execute}>
        <TextField
          label="ID"
          placeholder="ID der Statistik"
          value={statID}
          onChange={e => setStatID(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Filter"
          placeholder="leave empty to omit"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="outlined">
          Start Query
        </Button>
      </form>
      {error && (
        <>
          <h3 style={{ color: "red" }}>Error:</h3>
          <code>{error}</code>
        </>
      )}
      {stats && year && (
        <div>
          <p>Year: {year}</p>
          <h4>Werte:</h4>
          {stats.map(({ name, value }) => (
            <p>
              {name}: {value}
            </p>
          ))}
        </div>
      )}
      {query && (
        <>
          <h3>Query:</h3>
          <pre>{query}</pre>
        </>
      )}
    </Container>
  );
};

export default DataExplorer;
