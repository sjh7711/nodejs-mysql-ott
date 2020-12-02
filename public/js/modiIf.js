const user = JSON.parse(localStorage.getItem('login'));

const $modiIfContent = document.querySelectorAll('.modiIf-content');
const $pw = document.querySelectorAll('.pw');

const $modiIf = document.querySelector('.modiIf');
const $modiIfName = document.querySelector('.modiIf-name');
const $modiIfId = document.querySelector('.modiIf-id');
const $modiIfCurPw = document.querySelector('.modiIf-curPw');
const $modiIfPw = document.querySelector('.modiIf-pw');
const $modiIfRePw = document.querySelector('.modiIf-rePw');
const $penIcon = document.querySelector('.penIcon');
const $penIcon2 = document.querySelector('.penIcon2');
const $nameMessage = document.querySelector('.nameMessage');
const $pwMessage = document.querySelector('.pwMessage');
const $submitBt = document.querySelector('.submit-bt');
const $cancleBt = document.querySelector('.cancle-bt');
const $preference = document.querySelector('.preference');

const regPw = /^[A-Za-z0-9+]{4,15}$/;

// 미로그인 시 로그인 화면으로 이동
if (!user.curlog) {
  window.location('/')
};

// localStorage에서 기존 정보 가져오기
$modiIfName.value = user.name;
$modiIfId.value = user.id;

const showErrorInput = (input) => {
  if(input.classList.contains('changedColor')) {
    input.classList.remove('changedColor');
  }
  input.classList.add('errorColor');
};

const showGreenInput = (input) => {
  if(input.classList.contains('errorColor')) {
    input.classList.remove('errorColor');
    input.nextElementSibling.textContent = '';
  }
  input.classList.add('changedColor');
}

const showChangedNameInput = (input) => {
  if (input.value !== user.name) {
    showGreenInput(input);
  } else {
    if (input.classList.contains('changedColor')){
      input.classList.remove('changedColor')
    }
  }
}

// Event Handler
// 이름 옆 펜아이콘 클릭 이벤트
$penIcon.onclick = e => {
  $modiIfName.toggleAttribute('disabled');
  $modiIfName.classList.toggle('activeColor');
  $penIcon.classList.toggle('activePenColor');

  const input = e.target.nextElementSibling;
  
  // 이름 변경 안내메세지 보이기
  if (input.classList.contains('activeColor')){
    $nameMessage.style.display = 'block';
  } else {
    $nameMessage.style.display = 'none';
  }
}

// 스페이스 바 입력 방지 이벤트
[...$modiIf.children].forEach(child => 
  child.onkeydown = e => {
  if (!e.target.matches('.modiIf input')) return;

  const kcode = e.keyCode;
  if(kcode === 32) return false;
})

// 이름 input에 값 입력되었을 때
// 1. 정규표현식으로 검사
// 2. 이름 변경 시 초록색으로 input창 변경
$modiIfName.oninput = e => {
  const reg = /^[A-Za-z0-9가-힣+]*$/g;

  (!reg.test(e.target.value))
    ? (
      showErrorInput(e.target),
      e.target.nextElementSibling.textContent = '이름을 올바르게 입력해주세요.'
    ) : (
      e.target.classList.remove('errorColor'),
      e.target.nextElementSibling.textContent = '',
      // 기존값과 바뀌면 초록색으로 색변경
      showChangedNameInput(e.target)
    )
}

// 비밀번호 옆 펜아이콘 클릭 이벤트
$penIcon2.onclick = e => {
  const input = e.target.nextElementSibling;
  [...$pw].forEach(input => input.toggleAttribute('disabled'));
  [...$pw].forEach(input => input.classList.toggle('activeColor'));
  $penIcon2.classList.toggle('activePenColor');

  // 비밀번호 변경 안내 메세지 보이기
  if (input.classList.contains('activeColor')){
    $pwMessage.style.display = 'block';
  } else {
    $pwMessage.style.display = 'none';
  }
}

// keydomn 시 비밀번호 정규표현식 조건 확인
$modiIf.onkeydown = e => {
  if (!e.target.classList.contains('pw')) return;

  if (!regPw.test(e.target.value)){
    e.target.nextElementSibling.textContent = '비밀번호는 4~12자, 영어와 숫자로 입력해 주세요.'
  } else {
    e.target.nextElementSibling.textContent = '';
  }
};

// input창 focusout 이벤트
// 비밀번호 input창 조건 확인
$modiIf.addEventListener("focusout", async e => {
  if (!e.target.matches('.pw')) return;

  // 모두 빈칸이면 border 변화없이 놔두기
  if ([...$pw].forEach(input => input.value === '')) {
    [...$pw].forEach(input => {
      if (input.classList.contains('changedColor')) {
        input.classList.remove('changedColor');
        input.nextElementSibling.textContent = ''
      } else if (input.classList.contains('errorColor')) {
        input.classList.remove('errorColor');
        input.nextElementSibling.textContent = ''
      }
    })
  }

  // 현재 비밀번호 확인
  if (e.target.id === 'curPw') {
    const res = await fetch(`/users/${user.id}`);
    const userInfo = await res.json();
    if (userInfo.pw !== e.target.value) {
      showErrorInput($modiIfCurPw);
      $modiIfCurPw.nextElementSibling.textContent = '현재 비밀번호가 올바르지 않습니다.';
    } else {
      showGreenInput($modiIfCurPw);
      $modiIfCurPw.nextElementSibling.textContent = '';
    }
  }

  // 변경된 비밀번호와 현재 비밀번호 다른지 확인
  if (e.target.id === 'pw') {
    if ($modiIfPw.value === $modiIfCurPw.value) {
      showErrorInput($modiIfPw);
      $modiIfPw.nextElementSibling.textContent = '기존 비밀번호와 동일합니다.';
    } else {
      showGreenInput($modiIfPw);
      $modiIfPw.nextElementSibling.textContent = '';
    }
  }

  // 변경된 비밀번호와 재입력 일치여부 확인
  if (e.target.id === 'rePw') {
    if ($modiIfPw.value !== $modiIfRePw.value) {
      showErrorInput($modiIfRePw);
      $modiIfRePw.nextElementSibling.textContent = '비밀번호가 서로 다릅니다.'
    } else {
      showGreenInput($modiIfRePw);
      $modiIfRePw.nextElementSibling.textContent = '';
    }
  }
});

// 수정 버튼 클릭 이벤트
$submitBt.onclick = e => {
  e.preventDefault();

  const selectedGenre = $preference.options[$preference.selectedIndex].value;
  let modifiedGenre;
  ( selectedGenre === 'none' || selectedGenre === user.genre ) 
    ? modifiedGenre = user.genre
    : modifiedGenre = selectedGenre

  // // localStorage로 바뀐 정보 보내기
  localStorage.setItem('login', 
    JSON.parse({
      id: user.id,
      name: $modiIfName.value,
      // 장르 고치기
      genre: modifiedGenre,
      savelog: user.savelog,
      curlog: user.curlog
    }))
  
  // DB로 바뀐 정보 보내기

  //

}

// 뒤로가기 클릭 이벤트
$cancleBt.onclick = () => {
  window.history.back();
}