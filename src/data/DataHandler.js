import axios from "axios";

export async function validateUsername(username) {
  const usernames = await fetchUsernames();
  for (let currUsername of usernames) {
    if (currUsername === username) return true;
  }
  return false;
}

export async function fetchUsernames() {
  let usernames = [];
  let users = await fetchUsers();
  for (let user of users) {
    usernames.push(user["username"]);
  }
  return usernames;
}

export function validatePassword(password) {
  // Fixen 123456 lesz a jelszó minden esetben
  return password === "123456";
}

export async function fetchAlbums() {
  return await fetchData("https://jsonplaceholder.typicode.com/albums");
}

export async function fetchUsers() {
  return await fetchData("https://jsonplaceholder.typicode.com/users");
}

export function getUsernameById(id, users) {
  for(let user of users) {
      if(user.id === id)
          return user.username;
  }
  return 'Error';
}

async function fetchData(url) {
  let res = [];
  let jsonResponse = await axios.get(url);
  for (let element of jsonResponse["data"]) {
    res.push(element);
  }
  return res;
}
