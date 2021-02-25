export default function loginGame() {
  const $usernameInput = $('.usernameInput'); 

  const [$loginPage] = document.getElementsByClassName('login');
  const $canvasPage = document.getElementsByClassName('.chat.page');  

  const socket = io();
  // Prompt for setting a username
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  let $currentInput = $usernameInput.focus();

    // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $canvasPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

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
}