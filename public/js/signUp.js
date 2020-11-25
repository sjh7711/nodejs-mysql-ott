const $signUpBt = document.querySelector('.signUp-bt');
const $signUpForm = document.querySelector('.signUp-form');
const $signupName = document.querySelector('.signup-name');
const $signupId = document.querySelector('.signup-id');
const $signupPw = document.querySelector('.signup-pw');
const $signupRepw = document.querySelector('.signup-repw');
const $signUpContent = document.querySelectorAll('.signUp-content');
const input = document.querySelector('input');
const regId = /dfsd/;
const regPw =  /dsdf/;

// regId.test(target); // true
// console.log(document.hasFocus);
// if (!$signupId.focus) {
//   // $signUpContent.style.border = '1px solid #fff';
//   console.log(1);
// }
console.log($signupName);
$signupName.onfocusout = () => {
  console.log(2);
};
$signupName.addEventListener("focusout", function(){
  console.log(1);
});
if (!input.value) {
  input.classList.add('errorColor');
} else {
  input.classList.remove('errorColor');
}

$signUpForm.onsubmit = async e => {
  e.preventDefault();

  // 빈칸 및 정규표현식 중복 확인
  if (!$signupName.value) {
    $signupName.classList.add('errorColor');
  }  
  // DB와 아이디 중복확인

  // 비밀번호 중복 확인

  // 
};