import React from "react"
import { Link } from "gatsby"

import View from './View';

const Home = () => (
  <View title="Events/Booking App with Authentication">
    <p>
      [<a href="https://www.github.com/bchehraz/gatsby-event-booking">See on Github</a>]
    </p>

    <br />
    <h3>Description</h3>
    <p>
      Simple Event/Booking Web App with Authentication using Gatsby, and GraphQL with MongoDB. For a complete experience, <Link to="/app/sign-up">create a new account</Link>.
    </p>

    <br />

    <h3>Tech</h3>
    <ul>
      <li>
        (Client) GatsbyJS with React
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">
          {`https://www.gatsbyjs.org`}
        </a>
      </li>
      <li>
        (Server) Powered by Heroku
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://www.heroku.com/">
          https://www.heroku.com/
        </a>
      </li>
      <li>
        (API) GraphQL with NodeJS, Express
      </li>
      <li>
        (Database) MongoDB with Atlas
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/cloud/atlas">
          {`https://www.mongodb.com/cloud/atlas`}
        </a>
      </li>
    </ul>

    <br />

    <h3>Acknowledgements</h3>
    <ul>
      <li>
      Client is based on the Simple Auth App which demonstrates client side routing using Gatsby
        <br />
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/gatsbyjs/gatsby/blob/master/examples/simple-auth/README.md">
          {`https://github.com/gatsbyjs/gatsby/blob/master/examples/simple-auth/README.md`}
        </a>
      </li>
    </ul>
    <ul>
      <li>
      Core server functionality based upon a tutorial by Academind
      <br />
      <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w">
        {`https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w`}
      </a>
      </li>
    </ul>
  </View>
);

export default Home;
