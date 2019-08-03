import React from "react"
import { Link } from "gatsby"

import View from './View';

const Home = () => (
  <View title="Simple Authentication Example">
    <p>
      Project Description goes here
    </p>
    <p>
    For the full experience, go to
    {` `}
    <Link to="/app/events">Events</Link>.
    </p>
  </View>
)

export default Home;
