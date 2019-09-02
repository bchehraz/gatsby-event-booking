import React from "react"
import { Link } from "gatsby"

import View from './View';

const Home = () => (
  <View
    title="Events/Booking App with Authentication"
    style={{
      overflow: 'hidden',
      padding: '10px',
    }}
  >
    <h4>By Babak Chehraz</h4>
    <br />
    <p>
      [<a target="_blank" rel="noopener noreferrer" href="https://www.github.com/bchehraz/gatsby-event-booking">View Front-end on Github</a>]
     [<a target="_blank" rel="noopener noreferrer" href="https://www.github.com/bchehraz/graphql-event-booking">View Back-end on Github</a>]
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
        (Client) <a target="_blank" rel="noopener noreferrer" href="https://www.gatsbyjs.org">GatsbyJS</a> with React
        <br />
        Hosted by <a target="_blank" rel="noopener noreferrer" href="https://www.netlify.com">Netlify</a>
      </li>
      <li>
        (Server) <a target="_blank" rel="noopener noreferrer" href="https://graphql.org/">GraphQL</a> with NodeJS, Express
        <br />
        Hosted by <a target="_blank" rel="noopener noreferrer" href="https://www.heroku.com/">Heroku</a>
      </li>
      <li>
        (Database) MongoDB with <a target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/cloud/atlas">Atlas</a>
      </li>
    </ul>

    <br />

    <h3>Acknowledgements</h3>
    <ul>
      <li>
      Client is based on the Simple Auth App which demonstrates client side routing using Gatsby
        <br />
        [<a target="_blank" rel="noopener noreferrer" href="https://github.com/gatsbyjs/gatsby/blob/master/examples/simple-auth/README.md">
          {`Github Source`}
        </a>]
      </li>
    </ul>
    <ul>
      <li>
      Core server functionality based upon a tutorial by Academind
      <br />
      [<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w">
        {`Link to YouTube page`}
      </a>]
      </li>
    </ul>
  </View>
);

export default Home;
