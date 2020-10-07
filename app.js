const profile = new Profile();
const ui = new UI();
const searchProfile = document.querySelector('#searchProfile');

profile.getUsernames().then((response) => {
  ui.autocomplete(ui.selection, response.allUsers);
});

console.log(profile.getProfile());

searchProfile.addEventListener('keyup', (event) => {
  let input = event.target.value;
  let text = input.replace(/^./, input[0].toUpperCase());
  ui.clear();
  if (text !== '') {
    profile
      .getProfile(text)
      .then((response) => {
        if (response.profile.length !== 0) {
          ui.showProfile(response.profile[0]);
          ui.showTodo(response.todo);
        } else {
          ui.showAlert(text);
        }
      })
      .catch((err) => {
        ui.showAlert(text);
      });
  }
});
