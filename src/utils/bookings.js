import { isResponseOk, isBrowser } from './helpers';

export const fetchBookings = async (token) => {
  const requestBody = {
    query: `
      query {
        bookings {
          _id
          createdAt
          event {
            title
            date
            price
          }
        }
      }
    `
  };

  try {
    const response = await fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Fetch Bookings Failed!');
    }

    const { data } = await response.json();
    const { bookings } = data;
    
    if (bookings.length === 0) {
      return false;
    }

    return bookings;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const cancelBooking = async (token, bookingId) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      mutation CancelBooking($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId) {
          _id
          title
        }
      }
    `,
    variables: {
      bookingId
    }
  }

  try {
    const response = await fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Cancel Booking Failed!');
    }

    const { data } = await response.json();

    if (!data.cancelBooking.title) {
      return false;
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
