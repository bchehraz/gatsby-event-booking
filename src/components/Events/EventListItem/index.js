import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import formStyles from '../../Form/form.module.css';

const StyledEventListItem = styled.li`
  margin: 0;
  padding: 1rem;
  border: 3px solid #663399;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1rem;
    color: #663399;
  }

  h2 {
    margin: 0;
    font-size: 0.75rem;
    color: #7c7c7c;
  }

  p {
    margin: 0;
  }

  :first-child {
    border-top: 3px solid #663399;
  }

  @media only screen and (min-width: 500px) {
    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1rem;
    }
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
              {`Details`}
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
