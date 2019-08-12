import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import formStyles from '../../Form/form.module.css';

const StyledEventListItem = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #663399;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #663399;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    color: #7c7c7c;
  }

  p {
    margin: 0;
  }
`;

const EventListItem = props => (
  <StyledEventListItem eventId={props.eventId}>
    <div>
      <h1>{props.title}</h1>
      <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
    </div>
    <div>
      {
        (props.userId === props.creatorId)
          ? <p>{`You're the owner of this event`}</p>
          : <button
              className={formStyles[`form__button`]}
              onClick={props.onDetail.bind(this, props.eventId)}
            >
              View Details
            </button>
      }
    </div>
  </StyledEventListItem>
);

EventListItem.propTypes = {
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
  onDetail: PropTypes.func.isRequired,
}

export default EventListItem;
