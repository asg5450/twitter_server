let users = [
  {
    id: "1",
    username: "apple",
    password: "1111",
    name: "김사과",
    email: "apple@apple.com",
    url: "https://img.freepik.com/premium-photo/young-asian-man-her-clean-face-with-fresh-healthy-skin-ai-generated_145713-6656.jpg",
  },
  {
    id: "2",
    username: "banana",
    password: "2222",
    name: "반하나",
    email: "banana@banana.com",
    url: "https://img.freepik.com/premium-photo/young-asian-man-her-clean-face-with-fresh-healthy-skin-ai-generated_145713-6656.jpg",
  },
  {
    id: "3",
    username: "orange",
    password: "3333",
    name: "오렌지",
    email: "orange@orange.com",
    url: "https://img.freepik.com/premium-photo/young-asian-man-her-clean-face-with-fresh-healthy-skin-ai-generated_145713-6656.jpg",
  },
];

export async function createUser(username, password, name, email) {
  const user = {
    id: "4",
    username,
    // username  과   username = username  이 똑같이 동작함 (javascript 문법)
    password: password,
    name: name,
    email: email,
    url: "https://img.freepik.com/premium-photo/young-asian-man-her-clean-face-with-fresh-healthy-skin-ai-generated_145713-6656.jpg",
  };

  users = [...users, user];
  return user;
}

export async function findByUsername(username) {
  const user = users.find((user) => user.username == username);
  return user;
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}
