import React from 'react';
import styled from 'styled-components';
import formStyles from './Form/form.module.css';
import View from './View';
import Modal from './Modal';
import BackDrop from './BackDrop';
import AuthContext from '../context/auth-context';

const CreateEventContainer = styled.div`
  border: 1px solid black;
  text-align: center;
  padding: 1rem;
`;

const EventsList = styled.ul`
  width: 40rem;
  max-width: 90%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;

const EventsListItem = styled.li`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #663399;
`;

class Events extends React.Component {
  state = {
    creating: false,
    events: [],
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.priceRef = React.createRef();
    this.dateRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  }

  onCancelCreateEvent = () => {
    this.setState({ creating: false });
  }

  onConfirmCreateEvent = () => {
    this.setState({ creating: false });
    const title = this.titleRef.current.value;
    const price = +this.priceRef.current.value;
    const date = this.dateRef.current.value;
    const description = this.descriptionRef.current.value;

    // if (!title || !price || !data || )
    if (title.trim().length === 0 ||
        price <= 0 ||
        date.trim().length === 0 ||
        description.trim().length === 0) {
          console.log("One of more fields empty");
          return;
        }

    const event = {
      title, price, date, description
    }
    console.log(event);

    //prepare the graphql api request

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {
            title: "${title}",
            description: "${description}",
            price: ${price},
            date: "${date}"
          }) {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    console.log("Preparing Server Request >> Request Body Complete.");

    const { token } = this.context;

    if (!token) {
      console.log("Preparing Request Header >> Invalid Token Found");
    } else {
      console.log("Preparing Request Header >> Valid Token Found");
    }

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
      console.log("Server Output >> Create Event Successful");
      console.log("Server Output >> ");
      console.log(resData.data);

      this.fetchEvents();
    }).catch(err => {
      console.log(err);
    });
  }

  fetchEvents() {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    console.log("Preparing Server Request >> Request Body Complete.");

    fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    }).then(resData => { // successful login or sign up
      console.log("Server Output >> Events Query Successful");
      console.log("Server Output >> ");
      console.log(resData.data);

      const events = resData.data.events;
      this.setState({ events: events });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const eventList = this.state.events.map(event => {
      return <EventsListItem key={event._id}>{event.title}</EventsListItem>
    })
    return (
      <View title="Events">
        <CreateEventContainer>
          {this.state.creating && <BackDrop />}
          {this.state.creating &&
            <Modal
              title="Add Event"
              canCancel
              canConfirm
              onCancel={this.onCancelCreateEvent}
              onConfirm={this.onConfirmCreateEvent}
            >
            <form className={formStyles.form}>
              <label className={formStyles[`form__label`]}>
                Title
                <input
                  className={formStyles[`form__input`]}
                  type="text"
                  ref={this.titleRef}
                  //onChange={handleUpdate}
                />
              </label>
              <label className={formStyles[`form__label`]}>
                Price
                <input
                  className={formStyles[`form__input`]}
                  type="number"
                  ref={this.priceRef}
                  //onChange={handleUpdate}
                />
              </label>
              <label className={formStyles[`form__label`]}>
                Date
                <input
                  className={formStyles[`form__input`]}
                  type="datetime-local"
                  ref={this.dateRef}
                  //onChange={handleUpdate}
                />
              </label>
              <label className={formStyles[`form__label`]}>
                Description
                <textarea
                  className={formStyles[`form__textarea`]}
                  rows={4}
                  ref={this.descriptionRef}
                  //onChange={handleUpdate}
                />
              </label>
            </form>
            </Modal>
          }
          {this.context.token && (
            <div>
              <p>Share your own Events!</p>
              <button
                className={formStyles[`form__button`]}
                onClick={this.startCreateEventHandler}
              >
                Create Event
              </button>
            </div>
          )}
        </CreateEventContainer>

        <EventsList>
          {eventList}
        </EventsList>
      </View>
    );
  }
}

export default Events;
