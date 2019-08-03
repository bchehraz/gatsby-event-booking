import React from 'react';

const eventItem = props => {
  <li key={props.eventId} className={styles[`event__li`]}>
    {props.title}
  </li>
}
