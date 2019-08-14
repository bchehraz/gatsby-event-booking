import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventListItem from '../EventListItem/';

const StyledEventsList = styled.ul`
  width: 40rem;
  max-width: 100%;
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
        price={event.price}
        date={event.date}
        userId={props.authUserId}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  })

  return <StyledEventsList>{events}</StyledEventsList>
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
  authUserId: PropTypes.string.isRequired,
  onViewDetail: PropTypes.func.isRequired,
}

export default EventsList;
