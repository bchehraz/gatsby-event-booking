const isBrowser = typeof window !== `undefined`;

const isResponseOk = (res) => {
  return !(res.status !== 200 && res.status !== 201);
}

const isValidEvent = (event) => {
  const { title, description, price, date } = event;
  return !(title.trim().length === 0 ||
      price < 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0);
}

export const createEvent = async (token, event) => {
  if (!isBrowser) return false;
  
  if (!isValidEvent(event)) {
    return false;
  }

  const requestBody = {
    query: `
      mutation CreateEvent(
          $title: String!,
          $description: String!,
          $price: Float!,
          $date: String!
        ) {
        createEvent(eventInput: {
          title: $title,
          description: $description,
          price: $price,
          date: $date
        }) {
          title
          description
          price
          date
        }
      }
    `,
    variables: {
      ...event
    }
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
      throw new Error('Create Event Failed!');
    }

    let { data } = await response.json();
    // There may be an edge case where there's a failing client token
    if (!data.createEvent) {
      console.log("Authentication Error");
      return false;
    }
    return { ...data.createEvent };
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const fetchEvents = async (filterOnlyFree = false) => {
  const requestBody = {
    query: `
      query Events($freeOnly: Boolean) {
        events(freeOnly: $freeOnly) {
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
    `,
    variables: {
      freeOnly: filterOnlyFree,
    }
  };

  try {
    const response = await fetch('https://graphql-event-booking.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!isResponseOk(response)) {
      throw new Error('Fetch Events Failed!');
    }

    const { data } = await response.json();
    return data.events;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const bookEvent = async (token, eventId) => {
  if (!isBrowser) return false;

  const requestBody = {
    query: `
      mutation BookEvent($eventId: ID!) {
        bookEvent(eventId: $eventId) {
          _id
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      eventId
    }
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
      throw new Error('Book Event Failed!');
    }

    const { data } = await response.json();

    if (!data.bookEvent) return false;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
