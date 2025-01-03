// 読み札リストを作成
let yomifudalist = shuffleExceptFirstAndSecond(fudalist);

// 何枚目かを表す数字を入れる
yomifudalist = concatNumberTag(yomifudalist);

// 表示する札を表す変数
let currentIndex = 0;

// 読み札の表示
function updateDisplay() {
  const shimonokuElement = document.getElementById('shimonoku');
  const kaminokuElement = document.getElementById('kaminoku');

  // innerHTMLを使用してHTMLタグを解釈して表示
  shimonokuElement.innerHTML = yomifudalist[currentIndex].shimonoku;
  kaminokuElement.innerHTML = yomifudalist[currentIndex + 1].kaminoku;
}


// 上の句クリックで進む
document.getElementById('kaminoku').addEventListener('click', () => {
  if (currentIndex < 101) {
      currentIndex++;
      updateDisplay();
  }
});


// 下の句クリックで戻る
document.getElementById('shimonoku').addEventListener('click', () => {
  if (currentIndex > 0) {
      currentIndex--;
      updateDisplay();
  }
});

// 初期表示
updateDisplay();


// 配列の3〜102番目のシャッフル
function shuffleExceptFirstAndSecond(array) {
    // 最初の2要素と最後の要素を保持
    const firstTwo = array.slice(0, 2);
    const last = array.slice(-1);
    // シャッフルする部分を取得
    const toShuffle = array.slice(2, -1);
    
    // Fisher-Yatesアルゴリズムでシャッフル
    for (let i = toShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
    }
    
    // 保持した要素とシャッフルした要素を結合
    return [...firstTwo, ...toShuffle, ...last];
}


// 数字をつける
function concatNumberTag(array) {
  // 配列のコピーを作成
  const result = [...array];
  
  // 配列に数字を付与する
  for (let i = 2; i < result.length - 1; i++) {
    let tag = "<span class='num'>" + (i - 1) + "</span>";
    result[i].kaminoku  = tag.concat(result[i].kaminoku);
    result[i].shimonoku = tag.concat(result[i].shimonoku);
  }
  
  return result;
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
          let duration;
          
          switch(button.id) {
              case 'top-button':
                  duration = 5;
                  animateCircle(circle, duration);
                  break;
              case 'middle-button':
                  animateMiddleButton(circle, quarterCircle);
                  break;
              case 'bottom-button':
                  duration = 6;
                  animateCircle(circle, duration);
                  break;
          }
      });
  });

  const toggleButton = document.getElementById('toggle-button');
  const floatButtons = document.querySelector('.float-buttons');

  toggleButton.addEventListener('click', () => {
    floatButtons.classList.toggle('visible');
  });
});

function animateCircle(circle, duration) {
  circle.style.animation = `disappear ${duration}s linear forwards`;
  
  setTimeout(() => {
      circle.style.animation = '';
  }, duration * 1000);
}

function animateMiddleButton(mainCircle, quarterCircle) {
  mainCircle.style.animation = 'disappear-main 4s linear forwards';
  
  setTimeout(() => {
      quarterCircle.style.animation = 'disappear-quarter 1s linear forwards';
      
      setTimeout(() => {
          mainCircle.style.animation = '';
          quarterCircle.style.animation = '';
      }, 1000);
  }, 3000);
}