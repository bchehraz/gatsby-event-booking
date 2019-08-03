const isBrowser = typeof window !== `undefined`;

const getUser = () =>
  window.localStorage.user
    ? JSON.parse(window.localStorage.user)
    : {};

const setUser = user => {
  window.localStorage.user = JSON.stringify(user);
}

/* * * * * *
  LOG IN and SIGN UP in one function
* * * * * */

export const handleLogin = ({ email = "", password = "", signUp }, context) => {
  if (!isBrowser) return false;

  if (email.trim().length === 0 || password.trim().length === 0) {
    return false;
  }

  let requestBody = {
    query: `
      query Login {
        login(
          email: "${email}",
          password: "${password}"
        ) {
          userId
          token
          tokenExpiration
        }
      }
    `
  };
  if (signUp) {
    requestBody = {
      query: `
        mutation SignUp {
          createUser(userInput: {
            email: "${email}",
            password: "${password}"
          }) {
            _id
            email
          }
        }
      `
    };
  }
  console.log("[Loading] Request Body Complete. Sign up = " + signUp);
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if(res.status !== 200 && res.status !== 201) {
      return false;
      throw new Error('Failed!');
    }
    return res.json();
  }).then(resData => { // successful login or sign up
    console.log(resData);
    console.log("RESULT DATA>>");
    /*console.log(resData.data.login.token);
    console.log(resData.data.login.userId);
    console.log(resData.data.login.tokenExpiration);*/
    console.log(resData.data);


    if (resData.data.login) {
      context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
      return true;
    } else if (resData.data.createUser) {
      //
    }

  }).catch(err => {
    console.log(err);
  });



  return false;
}

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();
  return !!user.email;
}

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;

  console.log(`Ensuring the \`user\` property exists.`);
  setUser({});
  callback();
}
