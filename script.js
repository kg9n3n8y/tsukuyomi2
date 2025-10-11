// 読み札リストを作成
const yomifudalist = addNumberTags(shuffleExceptFirstAndSecond(fudalist));

// 表示対象とする要素の参照を保持
const shimonokuElement = document.getElementById('shimonoku');
const kaminokuElement = document.getElementById('kaminoku');
const middleButton = document.getElementById('middle-button');

// 何枚目かを表す数字を入れる
let currentIndex = 0;
const lastPlayableIndex = Math.max(0, yomifudalist.length - 2);

// 読み札の表示
function updateDisplay() {
  if (!shimonokuElement || !kaminokuElement) {
    return;
  }

  // innerHTMLを使用してHTMLタグを解釈して表示
  shimonokuElement.innerHTML = yomifudalist[currentIndex].shimonoku;
  const nextIndex = Math.min(currentIndex + 1, yomifudalist.length - 1);
  kaminokuElement.innerHTML = yomifudalist[nextIndex].kaminoku;
}

function showMiddleButton() {
  if (middleButton) {
    middleButton.style.display = 'block';
  }
}

// 上の句クリックで進む
if (kaminokuElement) {
  kaminokuElement.addEventListener('click', () => {
    if (currentIndex < lastPlayableIndex) {
      currentIndex++;
      updateDisplay();
      showMiddleButton();
    }
  });
}

// 下の句クリックで戻る
if (shimonokuElement) {
  shimonokuElement.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateDisplay();
      showMiddleButton();
    }
  });
}

// 初期表示
updateDisplay();


// 配列の3〜102番目のシャッフル
function shuffleExceptFirstAndSecond(array) {
    const SHUFFLE_START_INDEX = 2;
    const SHUFFLE_END_INDEX = array.length - 1;

    const fixedHead = array.slice(0, SHUFFLE_START_INDEX);
    const fixedTail = array.slice(SHUFFLE_END_INDEX);
    const toShuffle = array.slice(SHUFFLE_START_INDEX, SHUFFLE_END_INDEX);

    for (let i = toShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }

    return [...fixedHead, ...toShuffle, ...fixedTail];
}


// 数字をつける
function addNumberTags(array) {
  return array.map((item, index) => {
    if (index < 2 || index >= array.length - 1) {
      return { ...item };
    }

    const tag = `<span class='num'>${index - 1}</span>`;
    return {
      ...item,
      kaminoku: tag + item.kaminoku,
      shimonoku: tag + item.shimonoku,
    };
  });
}


// ページのリロード
function reloadPage(){
  let flag = window.confirm("読み札をシャッフルしますが，いいですか？");
  if(flag) {
    location.reload();
  }
}


// タイマー
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.float-button');

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const circle = button.querySelector('circle') || button.querySelector('.main-circle');
          const quarterCircle = button.querySelector('.quarter-circle');
          
          switch(button.id) {
              case 'middle-button':
                  animateMiddleButton(circle, quarterCircle, button);
                  break;
          }
      });
  });

  const floatButtons = document.querySelector('.float-buttons');
  const toggleButton = document.getElementById('toggle-button');

  if (toggleButton && floatButtons) {
    toggleButton.addEventListener('click', () => {
      floatButtons.classList.toggle('visible');
    });
  }
});

function animateCircle(circle, duration) {
  circle.style.animation = `disappear ${duration}s linear forwards`;
  
  setTimeout(() => {
      circle.style.animation = '';
  }, duration * 1000);
}

function animateMiddleButton(mainCircle, quarterCircle, button) {
  mainCircle.style.animation = 'disappear-main 4s linear forwards';
  
  setTimeout(() => {
      quarterCircle.style.animation = 'disappear-quarter 1s linear forwards';
      
      setTimeout(() => {
          mainCircle.style.animation = '';
          quarterCircle.style.animation = '';
          button.style.display = 'none'; // ボタンを非表示にする
      }, 1000);
  }, 3000);
}
