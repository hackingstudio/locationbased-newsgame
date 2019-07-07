import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/es/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid";

import CountDown from "../../components/countDown";
import { categoryIcons, categories } from "../../assets/categories";
import styles from "./categories.module.scss";

const Categories = ({
  choosing = true,
  category,
  question,
  setCategory,
  randomCategory,
  nextStep,
  findQuestion,
}) => {
  useEffect(() => {
    if (!category) {
      const timer = setTimeout(() => randomCategory(), 10000);
      return () => clearTimeout(timer);
    } else {
      findQuestion(); // async!
      if (question) {
        const timer = setTimeout(() => nextStep(), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [category, question]);

  const categoryEntries = Object.entries(categories);

  return (
    <>
      <CountDown />
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.header}>
          <Typography variant="h3" component="h2">
            {choosing
              ? "Wähle eine Kategorie:"
              : "Dein Gegner wählt eine Kategorie!"}
          </Typography>
        </Grid>
        {categoryEntries.map(([cat, name]) => {
          const Icon = categoryIcons[cat];
          const selected = cat === category;
          const hasChoosen = !!category;
          return (
            <Grid item xs={12} key={cat}>
              <Button
                color={selected ? "secondary" : "primary"}
                variant="contained"
                disabled={(!choosing || hasChoosen) && !selected}
                fullWidth
                onClick={() => setCategory(cat)}
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
  choosing: PropTypes.bool,
  category: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
  randomCategory: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  findQuestion: PropTypes.func.isRequired,
};

export default Categories;
