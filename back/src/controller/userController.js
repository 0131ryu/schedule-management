const userDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../front/js/secret");

exports.signup = async function (req, res) {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원가입 중 입력 값을 확인해주세요",
    });
  }
  const isValidEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!isValidEmail.test(email)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "메세지 형식을 확인하세요.",
    });
  }

  //8~16자 영문, 숫자 조합
  const isValidPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (!isValidPassword.test(password)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "비밀번호 형식을 확인하세요.",
    });
  }

  if (nickname.length < 2 || nickname > 10) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "닉네임 형식(2글자 이상 10글자 미만)을 확인하세요.",
    });
  }

  //DB 입력
  const insertUserRow = await userDao.insertUser(email, password, nickname);

  //중복 회원 검사
  const isDuplicatedEmail = await userDao.selectUserbyEmail(email);

  if (isDuplicatedEmail.length > 0) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "이미 가입된 회원입니다.",
    });
  }

  if (!insertUserRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원가입 실패, 관리자에게 문의하세요",
    });
  }
  return res.send({
    isSuccess: true,
    code: 200,
    message: "회원가입 성공",
  });
};

exports.signin = async function (req, res) {
  const { email, password } = req.body; //객체로 할당

  if (!email || !password) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "회원정보를 입력해주세요",
    });
  }

  //회원여부 검사
  const isValidUser = await userDao.selectUser(email, password);
  if (!isValidUser) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "DB에러, 담당자에게 문의해주세요",
    });
  }
  if (isValidUser.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "존재하지 않는 회원입니다..",
    });
  }

  //jwt 토큰 발급
  const [userInfo] = isValidUser;
  const userIdx = userInfo.userIdx;
  const token =
    // 페이로드, 시크릿키
    jwt.sign({ userIdx: userIdx }, jwtSecret);

  return res.send({
    result: { token: token },
    isSuccess: false,
    code: 200,
    message: "로그인 성공",
  });

  console.log(isValidUser);
};

exports.getNicknameByToken = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  //비구조할당법
  const [userInfo] = await userDao.selectNicknameByUserIdx(userIdx);
  //console.log(userInfo);
  const nickname = userInfo.nickname;
  console.log(nickname);
  return res.send({
    result: { nickname: nickname },
    isSuccess: true,
    code: 200,
    message: "토큰 검증 성공",
  });
};
