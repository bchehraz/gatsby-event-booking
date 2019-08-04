import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledEventListItem = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #663399;
`;

const EventListItem = props => (
  <StyledEventListItem eventId={props.eventId}>
    {props.title}
  </StyledEventListItem>
);

EventListItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default EventListItem;
