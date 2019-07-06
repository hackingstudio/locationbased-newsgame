import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";

import CountDown from "../../components/countDown";
import { categoryIcons, categories } from "../../assets/categories";
import styles from "./categories.module.scss";

const Categories = ({ choosing = true }) => {
  const [timeLeft, setTimeLeft] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(false), 10000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const categoryEntries = Object.entries(categories);
  return (
    <>
      <CountDown />
      <Grid container spacing={3}>
        {choosing && (
          <Grid item xs={12}>
            <Typography variant="h3" component="h2">
              Wähle eine Kategorie:
            </Typography>
          </Grid>
        )}
        {!choosing && (
          <Grid item xs={12}>
            <Typography variant="h3" component="h2">
              Dein Gegner wählt eine Kategorie!
            </Typography>
          </Grid>
        )}
        {categoryEntries.map(([cat, name]) => {
          const Icon = categoryIcons[cat];
          return (
            <Grid item xs={12} key={cat} >
              <Button
                color={!timeLeft ? "secondary" : "primary"}
                variant="contained"
                disabled={!choosing && timeLeft}
                fullWidth
              >
                <Icon className={styles.buttonIcon} />
                {name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

Categories.propTypes = {
  choosing: PropTypes.bool
};

export default Categories;
