import CompareArrows from '@material-ui/icons/CompareArrows';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import LocalHospital from '@material-ui/icons/LocalHospital';

export const categories = {
  "arbeit-wirtschaft": "Arbeit & Wirtschaft",
  "bildung": "Bildung",
  "gesundheit": "Gesundheit",
  "umwelt": "Umwelt",
};

export const categoryIcons = {
  "arbeit-wirtschaft": CompareArrows,
  "bildung": LocalFlorist,
  "gesundheit": EuroSymbol,
  "umwelt": LocalHospital,
}

export type Category = keyof typeof categories;
