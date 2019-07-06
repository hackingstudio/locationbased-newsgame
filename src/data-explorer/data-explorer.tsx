import React, { useState, useCallback, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";
import { fetchValues } from "../hooks/datenguide";

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
    case "FINISHED": {
      const { year, stats, query } = action.payload;
      return {
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

const buildContent = (
  query: String,
  question: String,
  description: String,
  unit: String
) =>
  `import gql from 'graphql-tag';

export default {
  query: gql\`${query}\`,
  content: {
    question: "${question}",
    description: "${description}",
    unit: "${unit}",
  },
};
`;

const DataExplorer: React.SFC<{
  defaultID?: string;
  defaultFilter?: string;
}> = ({ defaultID = "", defaultFilter = "" }) => {
  const [statID, setStatID] = useState(defaultID);
  const [filter, setFilter] = useState(defaultFilter);

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  const [data, dispatch] = useReducer(dataReducer, {});

  const execute = useCallback(
    async e => {
      e.preventDefault();
      let queryString = "";
      try {
        const query = buildCityQuery(statID, filter);
        queryString = query.loc.source.body;
        const { stats, lowYear } = await fetchValues(
          query,
          Object.values(cities).map(c => c.id)
        );
        dispatch({
          type: "FINISHED",
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
        <TextField
          label="Question"
          placeholder="shown to user"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          placeholder="which statistic is used?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Unit"
          placeholder="shown with value"
          value={unit}
          onChange={e => setUnit(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="outlined">
          Build
        </Button>
      </form>
      <article style={{ marginTop: "4rem" }}>
        {error && (
          <>
            <h3 style={{ color: "red" }}>Error:</h3>
            <code>{error}</code>
          </>
        )}
        {stats && year && (
          <div
            style={{
              border: "3px solid rgba(0,0,0,0.5)",
              borderRadius: ".5rem",
              fontSize: "3rem",
              textAlign: "center"
            }}
          >
            <p>{year}</p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {stats.map(({ name, value }) => (
                <p>
                  {name}
                  <br />
                  {value}
                </p>
              ))}
            </div>
          </div>
        )}
        {query && (
          <>
            <h3>Query</h3>
            <pre>{query}</pre>
            <h3>Definition</h3>
            <pre>{buildContent(query, question, description, unit)}</pre>
          </>
        )}
      </article>
    </Container>
  );
};

export default DataExplorer;
