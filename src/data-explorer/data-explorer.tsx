import React, { useState, useCallback, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://api-next.datengui.de/graphql" }),
  cache: new InMemoryCache()
});

const buildCityQuery = (statID: string) => {
  return gql`
    query($nuts3: String!) {
      region(id: $nuts3) {
        name
        stat: ${statID} {
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
}

const dataReducer = (state: Data, action): Data => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        year: action.payload.year,
        stats: action.payload.stats
      };
    default:
      return state;
  }
};

const DataExplorer: React.SFC = props => {
  const [statID, setStatID] = useState("");
  const [{ year, stats }, dispatch] = useReducer(dataReducer, {});
  const execute = useCallback(
    async e => {
      e.preventDefault();
      const query = buildCityQuery(statID);
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
      const lowYear = results.reduce((year, { data }) => {
        const { stat } = data.region;
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
          stats
        }
      });
    },
    [statID]
  );
  return (
    <Container maxWidth="sm">
      <form onSubmit={execute}>
        <TextField
          placeholder="ID der Statistik"
          value={statID}
          onChange={e => setStatID(e.target.value)}
        />
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
      </form>
    </Container>
  );
};

export default DataExplorer;
