import { gql } from "@apollo/client";

const worldRequest = {
  getContinents: gql`
    query continents {
      continents {
        code
        name
        countries {
          code
          name
          native
          phone
          capital
          currency
          languages {
            code
            name
          }
          emoji
          emojiU
          states {
            code
            name
          }
        }
      }
    }
  `,
};

export { worldRequest };
