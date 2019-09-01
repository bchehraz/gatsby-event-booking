import React from 'react';

import View from './View';
import Modal from './Modal';
import BackDrop from './BackDrop';
import AuthContext from '../context/auth-context';
import EventsList from './Events/EventsList/';
import Spinner from './Spinner/';
import CustomSwitch from './CustomSwitch/';
import CreateEventButton from './Buttons/CreateEvent';
import AddEventForm from './Form/AddEvent/';
import { createEvent, fetchEvents, bookEvent } from '../utils/events.js';

class Events extends React.Component {
  static contextType = AuthContext;
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      price: '',
      date: '',
      creating: false,
      events: [],
      isLoading: false,
      selectedEvent: false,
      checked: false,
      startDate: new Date(),
      endDate: new Date(),
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.onConfirmCreateEvent = this.onConfirmCreateEvent.bind(this);
    this.bookEventHandler = this.bookEventHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getEvents(false);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  }

  onCancelAction = () => {
    this.setState({ creating: false, selectedEvent: null });
  }

  sortEventsByDate(events) {
    events.sort(function(a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return events;
  }

  onConfirmCreateEvent = async () => {
    this.setState({ creating: false, isLoading: true });

    const { token } = this.context;
    if (!token) {
      return;
    }

    const { title, date, description } = this.state;
    const price = parseFloat(this.state.price);

    const newEvent = { title, description, date, price };
    const data = await createEvent(token, newEvent);

    if (!data) {
      this.setState({ isLoading: false });
      return;
    }

    // Add new event to the events list and update state
    this.setState(prevState => {
      let updatedEvents = [...prevState.events];
      const { title, description, price, date } = data;
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
      // Sort events by date before updating the state
      updatedEvents = this.sortEventsByDate(updatedEvents);
      return { events: updatedEvents };
    });

    this.setState({ isLoading: false, endDate: new Date() });
  }

  getEvents = async (filterOnlyFree = false) => {
    this.setState({ isLoading: true });

    let events = await fetchEvents(filterOnlyFree);

    if (!events) {
      this.setState({ isLoading: false });
      return;
    }

    events = this.sortEventsByDate(events);

    this.setState({ events, isLoading: false });
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleDateChange = date => {
    this.setState({
      endDate: date,
      date: date.toISOString(),
    });
  };

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    })
  }

  async bookEventHandler() {
    const { token } = this.context;
    if (!token) {
      this.setState({ selectedEvent: null });
      return;
    }
    const selectedEventId = this.state.selectedEvent._id;
    const response = await bookEvent(token, selectedEventId);

    if (!response) return;

    this.setState({ selectedEvent: null });
  }

  handleChange(checked) {
    this.setState({ checked });
    this.getEvents(checked);
  }

  render() {
    return (
      <View title="Events">
        <CustomSwitch
          onChange={this.handleChange}
          checked={this.state.checked}
        />
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
            confirmText="Publish Event"
          >
            <AddEventForm
              onChange={this.handleUpdate}
              onDateChange={this.handleDateChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
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
          <CreateEventButton
            buttonText={`New Event`} onClick={this.startCreateEventHandler}
          />
        )}

        {this.state.isLoading
          ? <Spinner />
          : (
            <EventsList
              events={this.state.events}
              authUserId={this.context.userId + ""}
              onViewDetail={this.showDetailHandler}
            />
          )
        }
      </View>
    );
  }
}

export default Events;
