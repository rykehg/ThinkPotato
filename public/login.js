export default function loginGame() {
  const [$usernameInput] = document.getElementsByClassName('usernameInput'); 

  const [$loginPage] = document.getElementsByClassName('login page');
  const [$canvasPage] = document.getElementsByClassName('canvas page');  

  const socket = io();
  // Prompt for setting a username
  let username;
  let connected = false;
  let $currentInput = $usernameInput.focus();

  // Sets the client's username
  function setUsername () {
    username = $usernameInput.val().trim();

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $canvasPage.show();
      $loginPage.off('click');
      $currentInput = $canvasPage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

    // Whenever the server emits 'login', log the login message
    socket.on('login', (data) => {
      connected = true;
      // Display the welcome message
      const message = 'Welcome to Socket.IO Chat – ';
      log(message, {
        prepend: true
      });
      addParticipantsMessage(data);
    });

    return {
      setUsername
    }
}