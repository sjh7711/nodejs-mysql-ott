const user = JSON.parse(localStorage.getItem('login'));

const $modiIf = document.querySelector('.modiIf');
const $modiIfContent = document.querySelectorAll('.modiIf-content');
const $modiIfName = document.querySelector('.modiIf-name');
const $modiIfId = document.querySelector('.modiIf-id');
const $penIcon = document.querySelector('.penIcon');
const $penIcon2 = document.querySelector('.penIcon2');
const $pw = document.querySelectorAll('.pw');
const $nameMessage = document.querySelector('.nameMessage');
const $pwMessage = document.querySelector('.pwMessage');

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

// key가 어떻게 user.key로 들어가게 하지???
const showChangedInput = (key, input) => {
  if (input.value !== user.name) {
    showGreenInput(input);
  } else {
    if (input.classList.contains('changedColor'))
    input.classList.remove('changedColor')
  }
}

// Event Handler
// input창 focusout 이벤트
$modiIf.addEventListener("focusout", e => {
  if (!e.target.matches('.modiIf input')) return;

  const reg = /^[A-Za-z0-9가-힣+]*$/g;

  // 빈칸 및 정규표현식 확인
  [...$pw].forEach(input =>
    (!input.value.trim() || !reg.test(input.value))
  ? console.log(input.value)
  : console.log(0)
  )

  // 현재 비밀번호 확인

  // 변경된 비밀번호 확인 일치여부 확인
  // 변경된 비밀번호와 현재 비밀번호 다른지 확인


});

$penIcon.onclick = e => {
  $modiIfName.toggleAttribute('disabled');
  $modiIfName.classList.toggle('activeColor');
  $penIcon.classList.toggle('activePenColor');
  const input = e.target.previousElementSibling;
  const reg = /^[A-Za-z0-9가-힣+]*$/g;
  
  // 이름 변경 안내메세지 보이기
  if (input.classList.contains('activeColor')){
    $nameMessage.style.display = 'block';
  } else {
    $nameMessage.style.display = 'none';
  }

  // 정규표현식과 빈칸확인 
  (!input.value.trim() || !reg.test(input.value)) 
    ? (
      input.classList.add('errorColor'),
      input.nextElementSibling.nextElementSibling.textContent = '이름을 올바르게 입력해주세요.'
    ) : (
      input.classList.remove('errorColor'),
      input.nextElementSibling.nextElementSibling.textContent = '',
      // 기존값과 바뀌면 초록색으로 색변경
      showChangedInput(name, input)
    )
}

$penIcon2.onclick = e => {
  const input = e.target.previousElementSibling;
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
