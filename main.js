let form = document.getElementById("form");
let username = document.getElementById("username");
let password = document.getElementById("password");
let btn = document.getElementById("btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validation();
});

const setError = (ele, msg) => {
  let box = ele.parentElement;
  let error = box.querySelector(".error");

  error.innerText = msg;
  box.classList.add("error");
  box.classList.remove("success");
};

const setSuccess = (ele) => {
  let box = ele.parentElement;
  let error = box.querySelector(".error");

  error.innerText = "";
  box.classList.add("success");
  box.classList.remove("error");
};

const passFormat = (p) => {
  const re = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu;
  return re.test(p);
}

const userFormat = (u) => {
  const re = /[^0-9]/;
  return re.test(u);
}

function validation() {
  let user = username.value.trim();
  let pass1 = password.value.trim();

  if (user === "") {
    setError(username, "Username is required");
  } else if (!userFormat(user)) {
    setError(username, "Digital are not allowed");
  } else {
    setSuccess(username);
  }

  if (pass1 === "") {
    setError(password, "Password is required");
  } else if (!passFormat(pass1)) {
    setError(password, "Password must be a minimum of 8 characters including number, Upper, Lower And one special character");
  } else {
    setSuccess(password);
  
    submitForm(user, pass1);
  }
}

function submitForm(username, password) {
  
  const searchQuery = `?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  window.location.replace(`search.html${searchQuery}`);
}
