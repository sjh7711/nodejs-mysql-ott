const $signUpBt = document.querySelector('.signUp-bt');
const $signUpForm = document.querySelector('.signUp-form');
const $signupName = document.querySelector('.signup-name');
const $signupId = document.querySelector('.signup-id');
const $signupPw = document.querySelector('.signup-pw');
const $signupRepw = document.querySelector('.signup-repw');
const $signUpContent = document.querySelectorAll('.signUp-content');
const $input = document.querySelectorAll('input');
const regId = /dfsd/;
const regPw =  /dsdf/;

$input.onblur = () => {
  [...$input].forEach(inputNode => {
    console.log(inputNode.value);

    if (!inputNode.value) {
      $input.classList.add('errorColor');
      $input.classList.remove('correctColor');
      console.log(1);
    } else {
      $input.classList.remove('errorColor');
      $input.classList.add('correctColor');
      console.log(2);
    }
};

$signUpForm.onsubmit = async e => {
  e.preventDefault();

  // 빈칸 확인

  // 정규표현식 확인
  
  // DB와 아이디 중복확인

  // 비밀번호 중복 확인

  // 
};