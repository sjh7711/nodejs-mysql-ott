const $signUpBt = document.querySelector('.signUp-bt');
const $signUpForm = document.querySelector('.signUp-form');
const $signupName = document.querySelector('.signup-name');
const $signupId = document.querySelector('.signup-id');
const $signupPw = document.querySelector('.signup-pw');
const $signupRepw = document.querySelector('.signup-repw');
const $signUpInput = document.querySelectorAll('.signUp-input');
let i = 0;


const showErrorInput = (input) => {
  if(input.classList.contains('correctColor')) {
    input.classList.remove('correctColor');
  }
  input.classList.add('errorColor');
};

const showCorrectInput = (input) => {
  if(input.classList.contains('errorColor')) {
    input.classList.remove('errorColor');
    input.nextElementSibling.textContent = '';
  }
  input.classList.add('correctColor');
}

// input 빈칸 확인
// 만약 빈칸이면 errorColor class를 추가하고
// 빈칸이 아니면 correctColor class를 추가한다.
const checkblank = input => {
  const reg = /^[A-Za-z0-9가-힣+]*$/g;
  if (!input.value.trim() || !reg.test(input.value)) {
    showErrorInput(input);
    input.nextElementSibling.textContent = 
    input.id === 'id' 
      ? '아이디를 입력해 주세요.'
      : input.id === 'name'
      ? '이름을 입력해 주세요.'
      : input.id === 'pw'
      ? '비밀번호를 입력해 주세요.'
      : '비밀번호 확인을 입력해 주세요.';
    i++;
  } else {
    showCorrectInput(input);
  }; 
}

// 아이디 조건확인 및 중복확인
const checkValidId = async (input) => {
  try {
    // 조건확인
    // 정규표현식 조건 : 4자이상 영어와 숫자
    const regId = /^[A-Za-z0-9+]{4,15}$/g;
    if(!regId.test(input.value)) {
      showErrorInput(input);
      input.nextElementSibling.textContent = '아이디는 4~12자 이상, 영어와 숫자로 입력해 주세요.';
      i++;
      // return;
    } else {
      showCorrectInput(input);
    }

    // id중복확인 : DB에서 id 가져와 중복이면 경고문 
    const res = await fetch('/users')
    const users = await res.json();
    const userIds = users.map(user => user.id);
    if(userIds.find(userId => userId === input.value)) {
      if(input.classList.contains('correctColor')) {
        input.classList.remove('correctColor');
      }
      input.classList.add('errorColor');
      input.nextElementSibling.textContent = '아이디가 이미 존재합니다.'
      i++; 
    }
  } catch (err) {
    console.log("[ERROR]", err);
  }
  
}

// 비밀번호 조건 확인
const checkValidPw = (input) => {
  const regPw = /^[A-Za-z0-9+]{4,15}$/g;
    if(!regPw.test(input.value)) {
      showErrorInput(input);
      input.nextElementSibling.textContent = '비밀번호는 4~12자 이상, 영어와 숫자로 입력해 주세요.' 
      i++;
    } else {
      showCorrectInput(input);
    }
} 

// 비밀번호 중복 확인
const checkValidRepw = (input) => {
  if (input.value !== input.previousElementSibling.previousElementSibling.value){
    showErrorInput(input);
    showErrorInput(input.previousElementSibling.previousElementSibling);
    input.nextElementSibling.textContent = '비밀번호가 서로 다릅니다.' 
    console.log(1);
  } else {
    showCorrectInput(input);
    showCorrectInput(input.previousElementSibling.previousElementSibling);
    console.log(2);
  }
}

// Event Handler
$signupName.onblur = e => {
  checkblank(e.target);
}
$signupId.onblur = e => {
  checkblank(e.target);
  checkValidId(e.target);
}
$signupPw.onblur = e => {
  checkblank(e.target);
  checkValidPw(e.target)
  console.log(1);
}
$signupRepw.onblur = e => {
  checkValidRepw(e.target);
  console.log(2);
  checkblank(e.target);
}

$signUpForm.onsubmit = e => {
  e.preventDefault();
}

// $signUpInput.onblur = () => {
//   [...$signUpInput].forEach(input => {
//     console.log(input.value);
//     input.classList.add('errorColor');

//     if (!input.value) {
//       input.classList.remove('correctColor');
//       console.log(1);
//     } else {
//       input.classList.remove('errorColor');
//       input.classList.add('correctColor');
//       console.log(2);
//     }
//   })
// }