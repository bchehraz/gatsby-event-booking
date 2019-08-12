import React from 'react';
import styled from 'styled-components';
import formStyles from './Form/form.module.css';
import View from './View';
import Modal from './Modal';
import BackDrop from './BackDrop';
import AuthContext from '../context/auth-context';
import EventsList from './Events/EventsList/';
import Spinner from './Spinner/';

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
    isLoading: false,
    selectedEvent: false,
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    // this.titleRef = React.createRef();
    // this.priceRef = React.createRef();
    // this.dateRef = React.createRef();
    // this.descriptionRef = React.createRef();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.onConfirmCreateEvent = this.onConfirmCreateEvent.bind(this);
    this.bookEventHandler = this.bookEventHandler.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  }

  onCancelAction = () => {
    this.setState({ creating: false, selectedEvent: null, });
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

      this.setState(prevState => {
        const updatedEvents = [...prevState.events];
        const { title, description, price, date } = resData.data.createEvent;
        updatedEvents.push({
          _id: this.context.userId,
          title: title,
          description: description,
          price: price,
          date: date,
          creator: {
            _id: this.context.userId
          },
        });
        return { events: updatedEvents };
      });
    }).catch(err => {
      console.log(err);
    });
  }

  fetchEvents() {
    this.setState({ isLoading: true });
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

      this.setState({ events: events, isLoading: false });
    }).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    })
  }

  bookEventHandler() {
    if (!this.context.token) {
      this.setState({ selectedEvent: null });
      return;
    }

    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${this.state.selectedEvent._id}") {
            _id
            createdAt
            updatedAt
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
      console.log("Server Output >> Book Event Mutation Successful");
      console.log("Server Output >> ");
      console.log(resData.data);
      //console.log(resData);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <View title="Events">
      {(this.state.creating || this.state.selectedEvent) && (
        <BackDrop onClick={this.onCancelAction} />
      )}
      {this.state.creating &&
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={this.onCancelAction}
          onConfirm={this.onConfirmCreateEvent}
          confirmText="Confirm"
        >
          <form className={formStyles.form}>
            <label className={formStyles[`form__label`]}>
              Title
              <input
                className={formStyles[`form__input`]}
                type="text"
                name="title"
                onChange={this.handleUpdate}
              />
            </label>
            <label className={formStyles[`form__label`]}>
              Price
              <input
                className={formStyles[`form__input`]}
                type="number"
                name="price"
                onChange={this.handleUpdate}
              />
            </label>
            <label className={formStyles[`form__label`]}>
              Date
              <input
                className={formStyles[`form__input`]}
                type="datetime-local"
                name="date"
                onChange={this.handleUpdate}
              />
            </label>
            <label className={formStyles[`form__label`]}>
              Description
              <textarea
                className={formStyles[`form__textarea`]}
                rows={4}
                name="description"
                onChange={this.handleUpdate}
              />
            </label>
          </form>
        </Modal>
      }
      {this.state.selectedEvent &&
        <Modal
          title={this.state.selectedEvent.title}
          canCancel
          canConfirm
          onCancel={this.onCancelAction}
          onConfirm={this.bookEventHandler}
          confirmText={this.context.token ? "Book This Event" : "Confirm"}
        >
          <h2>${this.state.selectedEvent.price} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h2>
          <p>{this.state.selectedEvent.description}</p>
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
                {`Create Event`}
              </button>
            </div>
          </CreateEventContainer>
        )}

        {this.state.isLoading
          ? <Spinner />
          : <EventsList
              events={this.state.events}
              authUserId={this.context.userId + ""}
              onViewDetail={this.showDetailHandler}
            />
        }
      </View>
    );
  }
}

export default Events;
