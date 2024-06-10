// bind querySelector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// storage key
const PLAYER_STORAGE_KEY = "MUSIC_PLAYER";

// define variables
const playlist = $(".playlist");
const playingSongName = $(".playing-song-name");
const playingSongArtist = $(".playing-song-artist");
const cdThumbnail = $(".cd-thumbnail");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const repeatBtn = $(".btn-repeat");
const shuffleBtn = $(".btn-shuffle");
const song = $$(".song");
var shuffleArray = [];

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  configs: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

  songs: [
    {
      name: "Những Lời Hứa Bỏ Quên",
      singer: "VŨ. x DEAR JANE",
      path: "./assets/songs/Những Lời Hứa Bỏ Quên.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b273bc146f67374ea7e19c5d0c80",
    },
    {
      name: "Bạn Đời",
      singer: "KARIK (FT. GDUCKY) ",
      path: "./assets/songs/Bạn Đời.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcjAaz-2P6gODAcGI8O0HPPJ1X3BIJtbZWmA&s",
    },
    {
      name: "Ánh Sao Và Bầu Trời",
      singer: "T.R.I F.T Cá",
      path: "./assets/songs/Ánh Sao Và Bầu Trời.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduyKlUl1JhuLGUWzlEbFG63W9PV5f2BYQ2w&s",
    },
    {
      name: "Bài Hát Dành Cho Người Chơi Hệ Tâm Linh",
      singer: "APJ x Phong Ma Đạo Sĩ",
      path: "./assets/songs/Bài Hát Dành Cho Người Chơi Hệ Tâm Linh.mp3",
      image:
        "https://bizweb.dktcdn.net/100/330/208/files/phim-ma-cuong-thi-lam-chanh-anh-1.jpg?v=1649785643108",
    },
    {
      name: "Cao Ốc 20",
      singer: "B RAY x DatG (ft MASEW x K-ICM)",
      path: "./assets/songs/Cao Ốc 20.mp3",
      image: "https://i1.sndcdn.com/artworks-000556537428-fuinlx-t500x500.jpg",
    },
    {
      name: "Ghé Qua",
      singer: "Dick, Tofutns, PC",
      path: "./assets/songs/Ghé Qua.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/06/10/e/7/c/a/1623318290460_640.jpg",
    },
    {
      name: "Già Cùng Nhau Là Được",
      singer: "Tùng TeA, PC",
      path: "./assets/songs/Già Cùng Nhau Là Được.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2018/11/26/8/e/9/4/1543213836132_640.jpg",
    },
    {
      name: "I Should Have Stayed at Home",
      singer: "Ryan Mack",
      path: "./assets/songs/I Should Have Stayed at Home.mp3",
      image:
        "https://images.genius.com/12060124af7c39359d9eaa62be2b352e.1000x1000x1.jpg",
    },
    {
      name: "Lạc Trôi",
      singer: "Sơn Tùng MTP",
      path: "./assets/songs/Lạc Trôi.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7775aH_OzEdgYU3eVB5nZEPuP5qzhRSjsUQ&s",
    },
    {
      name: "Lệ Lưu Ly",
      singer: "Vũ Phụng Tiên, DT Tập Rap",
      path: "./assets/songs/Lệ Lưu Ly.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/6/9/3/f/693f8f516bfaa717ef4043f11edfdde2.jpg",
    },
    {
      name: "Người Lạ Ơi",
      singer: "Superbrothers x Karik x Orange",
      path: "./assets/songs/Người Lạ Ơi.mp3",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/3/33/Ng%C6%B0%E1%BB%9Di_l%E1%BA%A1_%C6%A1i.jpeg",
    },
    {
      name: "Rap Chậm Thôi",
      singer: "RPT MCK, RPT Orijinn, RZ Ma$",
      path: "./assets/songs/Rap Chậm Thôi.mp3",
      image: "https://i1.sndcdn.com/artworks-MJzw7NyzP3CEqyKj-5pguXA-t500x500.jpg",
    },
    {
      name: "Sau Lời Khướt Từ",
      singer: "Phan Mạnh Quỳnh",
      path: "./assets/songs/Sau Lời Khướt Từ.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE4AFK9yhhviD2KiHcwpLE_W0y_nl3YVOH_g&s",
    },
    {
      name: "Thằng Điên",
      singer: "JUSTATEE x PHUONG LY",
      path: "./assets/songs/Thằng Điên.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1b7XF-Is7LOnmzqvH5J4ZKt6GtesHoQAjRQ&s",
    },
    {
      name: "Thiêu Thân",
      singer: "B Ray, Sofia",
      path: "./assets/songs/Thiêu Thân.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPeyXZ-RMpsGCDEbPbA0jJONbdfjzJlqkyrg&s",
    },
    {
      name: "Thủ Đô Cypher",
      singer: " RPT Orijinn, LOW G, RZMas, RPT MCK",
      path: "./assets/songs/Thủ Đô Cypher.mp3",
      image:
        "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/6/2/b/3/62b3ac55aa9e2928c00efd619a561e68.jpg",
    },
  ],

  // set config for app
  setConfig: function (key, value) {
    this.configs[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.configs));
  },

  // render songs in above array to html
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index == this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="song-contain">
                    <div class="song-img" style="background-image: url('${
                      song.image
                    }')" alt="" class="song-image"></div>
                    <div class="song-text">
                        <h5 class="song-name">${song.name}</h5>
                        <p class="song-artist">${song.singer}</p>
                    </div>
                </div>
            </div>
            `;
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    // play button
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onplay = function () {
      app.isPlaying = true;
      playBtn.classList.add("song-playing");
      cdThumbAni.play();
    };

    audio.onpause = function () {
      app.isPlaying = false;
      playBtn.classList.remove("song-playing");
      cdThumbAni.pause();
    };

    // rotate cd
    const cdThumbAni = cdThumbnail.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });

    cdThumbAni.pause();

    // track song progress
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // seek
    progress.oninput = function (e) {
      const seekTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    };

    // next button
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
    };

    // previous button
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
    };

    // repeat button
    repeatBtn.onclick = function (e) {
      app.isRepeat = !app.isRepeat;
      app.setConfig("isRepeat", app.isRepeat);
      repeatBtn.classList.toggle("active", app.isRepeat);
    };

    // shuffle button
    shuffleBtn.onclick = function (e) {
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      shuffleBtn.classList.toggle("active", app.isRandom);
    };

    // next song when ended
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // click playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      var songs = $$(".song");
      songs[app.currentIndex].classList.remove("active");

      if (songNode || e.target.closest(".option")) {
        // Clicked on a song
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index);
          songs[app.currentIndex].classList.add("active");
          app.loadCurrentSong();
          audio.play();
        }
      }
    };
  },

  // load current song based on current index
  loadCurrentSong: function () {
    playingSongName.textContent = this.currentSong.name;
    playingSongArtist.textContent = this.currentSong.singer;
    cdThumbnail.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  // load all configs of app
  loadConfig: function () {
    this.isRandom = this.configs.isRandom;
    this.isRepeat = this.configs.isRepeat;

    if (app.isRepeat) {
      repeatBtn.classList.add("active");
    }

    if (app.isRandom) {
      shuffleBtn.classList.add("active");
    }
  },

  // handle nextSong event
  nextSong: function () {
    let songs = $$(".song");
    songs[this.currentIndex].classList.remove("active");

    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }

    songs[this.currentIndex].classList.add("active");
    this.loadCurrentSong();
  },

  // handle prevSong event
  prevSong: function () {
    let songs = $$(".song");
    songs[this.currentIndex].classList.remove("active");

    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }

    songs[this.currentIndex].classList.add("active");
    this.loadCurrentSong();
  },

  // handle randomSong event using fisher-Yates (aka Knuth) Shuffle algorithm
  randomSong: function () {
    let songs = $$(".song");
    songs[this.currentIndex].classList.remove("active");
    // If all songs have been played, reshuffle the array
    if (shuffleArray.length === 0) {
      shuffleArray = [...this.songs]; // Copy the songs array
      for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]]; // Swap elements
      }
    }

    // Get the next song from the shuffled array
    const nextSong = shuffleArray.pop();

    // Update the current index and load the song
    this.currentIndex = this.songs.indexOf(nextSong);
    songs[this.currentIndex].classList.add("active");
    this.loadCurrentSong();
  },

  // handle events when starting app
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};

// handle event when clicking favorite (heart) icon
function handleFavorite(event) {
  event.stopPropagation();
  const songElement = event.target.closest(".song");
  const dataIndex = songElement.dataset.index;
  const favBtn = $(`.song-favorite-${dataIndex}`);

  if (!app.songs[dataIndex].isFavorite) {
    favBtn.classList.replace("fa-regular", "fa-solid");
    app.songs[dataIndex].isFavorite = true;
  } else {
    favBtn.classList.replace("fa-solid", "fa-regular");
    app.songs[dataIndex].isFavorite = false;
  }
}

// handle event when clicking remove (delete) icon
function handleRemove(event) {
  event.stopPropagation();
  const songElement = event.target.closest(".song");
  const dataIndex = songElement.dataset.index;
  const removeBtn = $(`.song-remove-${dataIndex}`);

  const removeSong = removeBtn.closest(".song");
  app.songs.splice(removeSong, 1);
  removeSong.style.display = "none";
}

// starto
app.start();
