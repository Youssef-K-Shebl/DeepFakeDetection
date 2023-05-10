const navbar = document.querySelector("header");

const sectionn = document.querySelectorAll("section");
const navlinkss = document.querySelectorAll("nav ul li a");

window.onscroll = () => {
  if (window.scrollY > 100) {
    navbar.classList.add("bg-color-primary-dark");
    navbar.classList.add("border-b");
    navbar.classList.add("border-color-gray");
  } else {
    navbar.classList.remove("bg-color-primary-dark");
    navbar.classList.remove("border-b");
    navbar.classList.remove("border-color-gray");
  }

  // active link
  let current = "home";

  sectionn.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });
  navlinkss.forEach((item) => {
    item.classList.remove("text-color-secondary");
    if (item.href.includes(current)) {
      item.classList.add("text-color-secondary");
    }
  });
};

// Mobile menu
const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");
const hLink = document.querySelectorAll("#hLink");
const faSolid = document.querySelector(".fa-solid");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  faSolid.classList.toggle("fa-xmark");
});

hLink.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    faSolid.classList.toggle("fa-xmark");
  });
});

// testimonial
const userTexts = document.getElementsByClassName("user-text");
const userPics = document.getElementsByClassName("user-pic");

function showReview() {
  for (let userPic of userPics) {
    userPic.classList.remove("active-pic");
  }
  for (let userText of userTexts) {
    userText.classList.remove("active-text");
  }

  let i = Array.from(userPics).indexOf(event.target);

  userPics[i].classList.add("active-pic");
  userTexts[i].classList.add("active-text");
}

// const toggleBtn = document.getElementById('toggleBtn');

const card_1_front = document.querySelector("#card_1_front");
const card_1_back = document.querySelector("#card_1_back");

const card_2_front = document.querySelector("#card_2_front");
const card_2_back = document.querySelector("#card_2_back");

const card_3_front = document.querySelector("#card_3_front");
const card_3_back = document.querySelector("#card_3_back");

document.getElementById("videoUpload").onchange = function (event) {
  let file = event.target.files[0];
  let blobURL = URL.createObjectURL(file);
  document.querySelector("video").src = blobURL;
};
// document.getElementById("seeResBtn").onclick = function (e) {
//   let resImg = document.getElementById("resImg");
//   location.href = "#res";
//   this.classList.add("laoding");
//   this.innerHTML = "<span class='icon'>&#8635</span>loading..";
//   let resContainer = document.getElementById("res");
//   resContainer.style.visibility = "visible";
//   showFake();
//   // showReal();
// };

let showReal = function () {
  let real = document.getElementById("real");
  real.style.display = "";
};
let showFake = function () {
  let fake = document.getElementById("fake");
  fake.style.display = "";
};


document.getElementById("result").onclick = function () {
  document.getElementById("overlay").style.display = 'block'
  document.getElementById("loader").style.display = 'block'
}
