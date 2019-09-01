import React from 'react';
import styled from 'styled-components';

import AuthContext from '../context/auth-context';
import View from './View';
import Spinner from './Spinner';
import BookingList from './Bookings/BookingList';
import BookingsChart from './Bookings/BookingsChart';
import BookingsControls from './Bookings/BookingsControls';
import { fetchBookings, cancelBooking } from '../utils/bookings.js';
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
    this.getBookings();
  }

  cancelBookingHandler = async (bookingId) => {
    this.setState({ isLoading: true });

    const { token } = this.context;

    const canceled = await cancelBooking(token, bookingId);

    if (!canceled) {
      this.setState({ isLoading: false });
      return;
    }

    this.setState(prevState => {
      const updatedBookings = prevState.bookings.filter(booking => {
        return booking._id !== bookingId;
      });

      return { bookings: updatedBookings, isLoading: false };
    });
  }


  getBookings = async () => {
    this.setState({ isLoading: true });


    const token = this.context.token || getToken();

    const bookings = await fetchBookings(token);

    if (!bookings) {
      this.setState({ isLoading: false });
      return;
    }

    this.setState({ bookings: bookings, isLoading: false });
  }

  onChangeView = () => {
    const { graphView } = this.state;
    this.setState({ graphView: !graphView });
  }

  render() {
    const { isLoading } = this.state;
    let bookings = this.state.bookings || [];
    let content = <Spinner />;
    if (!isLoading) {
      content = (
        <React.Fragment>
          <Header>
            <h1>Your Bookings</h1>

            {(bookings.length !== 0) && <BookingsControls
              graphView={this.state.graphView}
              onChangeView={() => this.onChangeView()}
            />}
          </Header>
          <div>
            {(this.state.graphView) ? <BookingsChart bookings={bookings} /> : (
              <BookingList
                bookings={bookings}
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
