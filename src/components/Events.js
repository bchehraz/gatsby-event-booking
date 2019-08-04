import React from 'react';
import styled from 'styled-components';
import formStyles from './Form/form.module.css';
import View from './View';
import Modal from './Modal';
import BackDrop from './BackDrop';
import AuthContext from '../context/auth-context';
import EventsList from './Events/EventsList/';

const CreateEventContainer = styled.div`
  border: 1px solid black;
  text-align: center;
  padding: 1rem;
`;

class Events extends React.Component {
  state = {
    title: '',
    description: '',
    price: 0.0,
    date: '',
    creating: false,
    events: [],
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // this.titleRef = React.createRef();
    // this.priceRef = React.createRef();
    // this.dateRef = React.createRef();
    // this.descriptionRef = React.createRef();

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ ...this.state, creating: true });
  }

  onCancelCreateEvent = () => {
    this.setState({ ...this.state, creating: false });
  }

  onConfirmCreateEvent = () => {
    this.setState({ creating: false });
    // const title = this.titleRef.current.value;
    // const price = +this.priceRef.current.value;
    // const date = this.dateRef.current.value;
    // const description = this.descriptionRef.current.value;
    const { title, date, description } = this.state;
    const price = +this.state.price;

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

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <View title="Events">
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
              // ref={this.titleRef}
              name="title"
              onChange={this.handleUpdate}
            />
          </label>
          <label className={formStyles[`form__label`]}>
            Price
            <input
              className={formStyles[`form__input`]}
              type="number"
              // ref={this.priceRef}
              name="price"
              onChange={this.handleUpdate}
            />
          </label>
          <label className={formStyles[`form__label`]}>
            Date
            <input
              className={formStyles[`form__input`]}
              type="datetime-local"
              // ref={this.dateRef}
              name="date"
              onChange={this.handleUpdate}
            />
          </label>
          <label className={formStyles[`form__label`]}>
            Description
            <textarea
              className={formStyles[`form__textarea`]}
              rows={4}
              // ref={this.descriptionRef}
              name="description"
              onChange={this.handleUpdate}
            />
          </label>
        </form>
      </Modal>
      }
        {this.context.token && (
          <CreateEventContainer>
            <div>
              <p>Share your own Events!</p>
              <button
                className={formStyles[`form__button`]}
                onClick={this.startCreateEventHandler}
              >
                Create Event
              </button>
            </div>
          </CreateEventContainer>
        )}

        <EventsList events={this.state.events} />
      </View>
    );
  }
}

export default Events;
