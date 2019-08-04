import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventListItem from '../EventListItem/';

const StyledEventsList = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;

const EventsList = props => {
  const events = props.events.map(event => {
    return (
      <EventListItem
        key={event._id}
        eventId={event._id}
        title={event.title}
      />
    );
  })

  return <StyledEventsList>{events}</StyledEventsList>
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
}

export default EventsList;
