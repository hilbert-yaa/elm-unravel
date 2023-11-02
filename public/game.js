document.addEventListener('click', musicPlay);
function musicPlay() {
  document.getElementById('bgm').play();
  console.log('bgm_play');
  document.removeEventListener('click', musicPlay);
}

const audioFiles = {
  win: "assets/win sound.mp3",
  roll: "assets/roll.mp3",
  reverse: "assets/reverse.mp3",
  reverse_long: "assets/reverse_long.mp3",
  reverse_1: "assets/reverse_1.mp3",
  reverse_2: "assets/reverse_2.mp3",
  reverse_3: "assets/reverse_3.mp3",
  reverse_4: "assets/reverse_4.mp3",
  reverse_5: "assets/reverse_5.mp3"
};

const audioObjects = Object.keys(audioFiles).reduce((acc, key) => {
  acc[key] = new Audio(audioFiles[key]);
  return acc;
}, {});

const bgmFiles = {
  bgm_1: { src: "assets/bgm_1.mp3", volume: 0.6 },
  bgm_2: { src: "assets/bgm_2.mp3", volume: 0.4 },
  bgm_3: { src: "assets/bgm_3.mp3" },
  bgm_4: { src: "assets/bgm_4.mp3", volume: 0.4 },
  bgm_5: { src: "assets/bgm_5.mp3", volume: 0.5 },
  bgm_6: { src: "assets/bgm_6.mp3", volume: 0.7 },
  bgm_7: { src: "assets/bgm_7.mp3" }
};

function player(string) {
  if (audioObjects.hasOwnProperty(string)) {
    audioObjects[string].play();
  } else if (bgmFiles.hasOwnProperty(string)) {
    const el = document.getElementById('bgm');
    el.volume = bgmFiles[string].volume || 1;
    el.src = bgmFiles[string].src;
    el.play();
  }
};

var app = Elm.Main.init({ node: document.getElementById("app") });
app.ports.playSound.subscribe(player);
document.addEventListener('wheel', function (event) {
  app.ports.onScroll.send(event.deltaY);
});
