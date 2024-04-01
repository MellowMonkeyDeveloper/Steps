import {
  ButtonIconInstintStyles,
  ButtonImageInstintStyles,
  ButtonTextInstintStyles,
} from "@/types/interfaces/button";
import button from '../../../styles/button.module.scss';
import text from '../../../styles/text.module.scss';
import card from '../../../styles/card.module.scss';
const buttonIconStyles: ButtonIconInstintStyles = {
  button: {
    brandStyles: `${button.buttonIconBrandStandard}`,
    darkStyles: `${button.buttonIconDarkStandard}`,
    lightStyles: `${button.buttonIconLightStandard}`,
  },
  span: {
    brandStyles: `${text.textBrandStandard}`,
    darkStyles: `${text.textDarkStandard}`,
    lightStyles: `${text.textLightStandard}`,
  },
};

const buttonImageStyles: ButtonImageInstintStyles = {
  card: {
    brandStyles: "",
    darkStyles: "",
    lightStyles: "",
  },
  image: {
    brandStyles: "",
    darkStyles: "",
    lightStyles: "",
  },
  button: {
    brandStyles: "",
    darkStyles: "",
    lightStyles: "",
  },
};
const buttonTextStyles: ButtonTextInstintStyles = {
  button: {
    brandStyles: "",
    darkStyles: "",
    lightStyles: "",
  },
  card: {
    brandStyles: "",
    darkStyles: "",
    lightStyles: "",
  },
};
export {buttonIconStyles}