class Profile {
  constructor() {
    this.clientid = '';
    this.clientSecret = '';
  }

  async getProfile(username) {
    const profileResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    );
    const profile = await profileResponse.json();

    const todoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`
    );

    const todo = await todoResponse.json();
    return {
      profile: profile,
      todo,
    };
  }

  async getUsernames() {
    const usernamesResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    );

    const userNames = await usernamesResponse.json();
    let allUsers = [];
    userNames.forEach((userName) => allUsers.push(userName.username));

    return {
      allUsers: allUsers,
    };
  }
}
