import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import formStyles from '../../Form/form.module.css';

const BookingsList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 40rem;
  max-width: 100%;
`;

const BookingListItem = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #663399;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookingItemData = styled.div``;

const BookingItemActions = styled.div``;

const bookingList = (props) => (
  <BookingsList>
    {(props.bookings.length === 0) ? (
      <div style={{ textAlign: 'center', margin: '2rem', }}>
        <h4>You have not booked any events.</h4>
      </div>
    ) : (
      props.bookings.map(booking => {
        return (
          <BookingListItem key={booking._id}>
            <BookingItemData>
              {booking.event.title} - {' '}
              {new Date(booking.event.date).toLocaleDateString()}
            </BookingItemData>
            <BookingItemActions>
              <button
                className={formStyles[`form__button`]}
                onClick={props.onCancelBooking.bind(this, booking._id)}
              >
                Cancel
              </button>
            </BookingItemActions>
          </BookingListItem>
        );
      })
    )}
  </BookingsList>
);

bookingList.propTypes = {
  bookings: PropTypes.array.isRequired,
  onCancelBooking: PropTypes.func.isRequired,
}

export default bookingList;
