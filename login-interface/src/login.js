export default function login({ email, password }) {
  const delay = (0.7 + Math.random() * 2) * 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password === "password123") {
        resolve(true);
      } else {
        reject({ message: "Email or password wrong." });
      }
    }, delay);
  });
}
