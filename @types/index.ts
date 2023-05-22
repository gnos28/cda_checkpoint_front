export type Continent = {
  code: string;
  name: string;
  countries: Country[];
};

export type Language = {
  code: null | string;
  name: string;
};

export type State = {
  code: String;
  name: String;
  country: Country;
};

export type Country = {
  code: string;
  name: string;
  native: string;
  phone: string;
  capital: null | string;
  currency: null | string;
  languages: Language[];
  emoji: string;
  emojiU: string;
  states: State[];
};

export type Selection = {
  continent: string;
  country: string;
};
