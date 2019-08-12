import React from 'react';
import View from './View';
import Spinner from './Spinner';
import AuthContext from '../context/auth-context';

class Bookings extends React.Component {
  state = {
    isLoading: false,
    bookings: [],
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.fetchBookings = this.fetchBookings.bind(this);
  }

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              title
              date
            }
          }
        }
      `
    };
    console.log("Preparing Server Request >> Request Body Complete.");

    const { token } = this.context;

    fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    }).then(resData => { // successful login or sign up
      console.log("Server Output >> Bookings Query Successful");
      console.log("Server Output >> ");
      console.log(resData.data);

      const { bookings } = resData.data;

      this.setState({ bookings: bookings, isLoading: false });
    }).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { bookings, isLoading } = this.state;
    return (
      <View title="Your Bookings">
        {isLoading ? <Spinner /> : (
          <ul>
            {bookings.map(booking => {
              return (
                <li key={booking._id}>
                  {booking.event.title} - {' '}
                  {new Date(booking.event.date).toLocaleDateString()}
                </li>
              );
            })}
          </ul>
        )}
      </View>
    );
  }
}

export default Bookings;
