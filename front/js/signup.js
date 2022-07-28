//토큰 검사

const token = localStorage.getItem("x-access-token");
if (token) {
  alert("로그아웃 후 이용해주세요");
  location.href = "index.html";
}

//토큰 검사

//입력값 유효성 검사

//이메일
const inputEmail = document.getElementById("email");
const emailMessage = document.querySelector("div.email-message");
inputEmail.addEventListener("input", isValidEmail);
//비밀번호
const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input", isValidPassword);
//비밀번호 확인
const inputPasswordConfirm = document.getElementById("password-confirm");
const passwordConfirmMessage = document.querySelector(
  "div.password-confirm-message"
);
inputPasswordConfirm.addEventListener("input", isValidPasswordConfirm);
//닉네임
const inputNickname = document.getElementById("nickname");
const nicknameMessage = document.querySelector("div.nickname-message");
inputNickname.addEventListener("input", isValidNickname);

//이메일 형식 검사
function isValidEmail(event) {
  const currentEamil = inputEmail.value;
  // console.log(currentEamil);

  const emailReg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailReg.test(currentEamil)) {
    emailMessage.style.visibility = "visible";
    return false;
  }
  emailMessage.style.visibility = "hidden";
  return true;
}

//비밀번호 형식 검사
function isValidPassword(event) {
  const currentPassword = inputPassword.value;

  const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  if (!passwordReg.test(currentPassword)) {
    passwordMessage.style.visibility = "visible";
    return false;
  }
  passwordMessage.style.visibility = "hidden";
  return true;
}

//비밀번호 확인 검사
function isValidPasswordConfirm(event) {
  const currentPassword = inputPassword.value;
  const currentPasswordConfirm = inputPasswordConfirm.value;

  if (currentPassword !== currentPasswordConfirm) {
    passwordConfirmMessage.style.visibility = "visible";
    return false;
  }
  passwordConfirmMessage.style.visibility = "hidden";
  return true;
}

//닉네임 확인 검사
function isValidNickname(event) {
  const currentNickname = inputNickname.value;

  if (currentNickname.length < 2 || currentNickname.length > 10) {
    nicknameMessage.style.visibility = "visible";
    return false;
  }
  nicknameMessage.style.visibility = "hidden";
  return true;
}

//회원가입 API 요청
const buttonSignup = document.getElementById("signup");
buttonSignup.addEventListener("click", signup);

async function signup(event) {
  const isValideReg =
    isValidEmail() &&
    isValidPassword() &&
    isValidPasswordConfirm() &&
    isValidNickname();

  if (!isValideReg) {
    alert("회원 정보를 확인해주세요");
    return false;
  }
  const currentEamil = inputEmail.value;
  const currentPassword = inputPassword.value;
  const currentNickname = inputNickname.value;

  const config = {
    method: "post",
    url: url + "/user",
    data: {
      email: currentEamil,
      password: currentPassword,
      nickname: currentNickname,
    },
  };
  try {
    const res = await axios(config);
    console.log(res);

    if (res.data.code === 400) {
      alert(res.data.message);
      location.reload(); //새로고침
      return false;
    }
    if (res.data.code === 200) {
      alert(res.data.message);
      location.href = "signin.html";
      return true;
    }
  } catch (error) {
    console.log(err);
  }
}
