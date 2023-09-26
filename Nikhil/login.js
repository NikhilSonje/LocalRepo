//After clicking on the login button the login form will be open and after clicking on the cross button the form will be close
const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formCloseBtn = document.querySelector(".form_close");
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
  formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

  //for to show the password and hide the password
  pwShowHide = document.querySelectorAll(".pw_hide");
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

//Toggling the form in signup and login
formContainer = document.querySelector(".form_container"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login")

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});