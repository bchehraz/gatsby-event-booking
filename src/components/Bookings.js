import React from 'react';
import styled from 'styled-components';

import AuthContext from '../context/auth-context';
import View from './View';
import Spinner from './Spinner';
import BookingList from './Bookings/BookingList';
import BookingsChart from './Bookings/BookingsChart';
import BookingsControls from './Bookings/BookingsControls';
import delay from '../utils/delay';
import { getToken } from '../utils/auth';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

class Bookings extends React.Component {
  static contextType = AuthContext;

  state = {
    isLoading: false,
    bookings: [],
    graphView: false,
  }

  componentDidMount() {
    this.fetchBookings();
  }

  cancelBookingHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId
      }
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
      console.log("Server Output >> Cancel Booking Mutation Successful");
      console.log("Server Output >> ");
      console.log(resData.data);

      this.setState(prevState => {
        const updatedBookings = prevState.bookings.filter(booking => {
          return booking._id !== bookingId;
        });

        return { bookings: updatedBookings, isLoading: false };
      });
    }).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  }


  fetchBookings = () => {
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
              price
            }
          }
        }
      `
    };
    console.log("Preparing Server Request >> Request Body Complete.");

    //const { token } = this.context;
    const token = this.context.token || getToken();
    /*console.log(getUser());
    console.log(this.context || getUser());
    console.log(token);*/
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
      delay(() => this.setState({ bookings: bookings, isLoading: false }), 1000);
    }).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    });

  }

  onChangeView = () => {
    const { graphView } = this.state;
    this.setState({ graphView: !graphView });
  }

  render() {
    const { bookings, isLoading } = this.state;
    let content = <Spinner />;
    if (!isLoading) {
      content = (
        <React.Fragment>
          <Header>
            <h1>Your Bookings</h1>
            <BookingsControls
              graphView={this.state.graphView}
              onChangeView={() => this.onChangeView()}
            />
          </Header>
          <div>
            {(this.state.graphView) ? <BookingsChart bookings={bookings || []} /> : (
              <BookingList
                bookings={bookings || []}
                onCancelBooking={this.cancelBookingHandler}
              />
            )}
          </div>
        </React.Fragment>
      );
    }
    return (
      <View title="">
        {content}
      </View>
    );
  }
}

export default Bookings;
