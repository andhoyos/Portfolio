AOS.init();
//toggle
const toggleBtn = document.querySelector(".toggle-btn");
const linkContainer = document.querySelector(".links_container");
const nav = document.querySelector(".navbar");

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  linkContainer.classList.toggle("show");
});

//date
function date() {
  let date = document.querySelector(".date");
  const year = new Date().getFullYear();

  date.innerHTML += year;
}
date();

//links
const links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((e) => {
      e.classList.remove("active");
      linkContainer.classList.remove("show");
      toggleBtn.classList.remove("active");
    });
    link.classList.add("active");
  });
});

function downloadBtn() {
  const download = document.getElementById("download");
  setTimeout(() => {
    Swal.fire("Descarga completa!", "", "success");
  }, 1000);
  download.click();
}

const projectsContainer = document.querySelector(".project-container");

projects.forEach((project) => {
  projectsContainer.innerHTML += `
  <div class="project-card" data-aos="flip-left"
  data-aos-easing="ease-out-cubic"
  data-aos-duration="2000">
        <img src="images/${project.image}" alt="" />
          <div class="content">
            <h1 class="project-name">${project.name}</h1>
            <span class="tags">${
              !project.description ? "" : project.description
            } 
            Tecnologias usadas:
              <h3>${project.tags}</h3>
            </span>
            <a href="${project.git}" class="btn-repo" target="_blank">
              <button>Repo</button>
            </a>
          </div>
  </div>
  `;
});

const check = document.getElementById("theme");
const body = document.querySelector("body");
const separation = document.querySelector(".separation");

check.addEventListener("change", (ev) => {
  let menu = toggleBtn.children;
  if (ev.target.checked) {
    body.style.color = "var(--color-btn)";
    body.style.background = "var(--color)";
    nav.style.background = "var(--color)";
    linkContainer.style.background = "var(--color)";
    for (let i = 0; i < menu.length; i++) {
      menu[i].style.background = "var(--color-btn)";
    }
    links.forEach((link) => {
      link.style.color = "var(--color-btn)";
    });

    console.log(menu);
  } else {
    console.log("no-check");
    body.style.color = "var(--color)";
    body.style.background = "var(--background)";
    if (screen.width > 500) {
      nav.style.background = "rgb(206 255 245)";
    } else {
      nav.style.background = "#00bfa6";
    }
    linkContainer.style.background = "inherit";
    for (let i = 0; i < menu.length; i++) {
      menu[i].style.background = "var(--color)";
    }
    links.forEach((link) => {
      link.style.color = "var(--color)";
    });
  }
});

var i = 0;
let slideIndex = 1;

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  let i;
  const slide = document.getElementsByClassName("slider-img-form");

  if (n > slide.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slide.length;
  }

  for (i = 0; i < slide.length; i++) {
    slide[i].style.display = "none";
  }

  slide[slideIndex - 1].style.display = "block";
}

function callDivs() {
  plusDivs(1);
}
showDivs(slideIndex);
setInterval(callDivs, 15000);

//contact form

const send = document.querySelector(".send");
const firstName = document.querySelector(".first-name");
const email = document.querySelector(".email");
const msg = document.querySelector(".message");

send.addEventListener("click", () => {
  if (firstName.value.length && email.value.length && msg.value.length) {
    Swal.fire({
      background: "bottom",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
      },
    });
    const loader = document.querySelector(".swal2-loader");
    loader.style =
      "width: 80px; height: 80px; border: 6px solid; border-color: #2778c4 transparent #2778c4 transparent;";
    // axios
    //   .post("/mail", {
    //     body: JSON.stringify({
    //       firstName: firstName.value,
    //       lastName: lastName.value,
    //       email: email.value,
    //       msg: msg.value,
    //     }),
    //   })
    //   .then(function (res) {
    //     console.log(res.data);
    //     Swal.fire({
    //       title: res.data,
    //       padding: "3em",
    //       color: "#560bad",
    //     });
    //     firstName.value = "";
    //     lastName.value = "";
    //     email.value = "";
    //     msg.value = "";
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    fetch("/mail", {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        firstName: firstName.value,
        email: email.value,
        msg: msg.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: data,
          padding: "3em",
          color: "#560bad",
        });
        firstName.value = "";
        email.value = "";
        msg.value = "";
      });
  }
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let nav = document.querySelector(".navbar");
  let check = document.querySelector(".switch");
  var currentScrollPos = window.pageYOffset;
  if (screen.width > 500) {
    nav.style.bottom = "auto";
    if (prevScrollpos < currentScrollPos) {
      nav.style.top = "-100px";
      check.style.top = "-30px";
      linkContainer.classList.remove("show");
      toggleBtn.classList.remove("active");
    } else {
      nav.style.top = "0";
      check.style.top = "65px";
    }
  } else {
    nav.style.top = "auto";
    if (prevScrollpos < currentScrollPos) {
      nav.style.bottom = "-100px";
      check.style.top = "-30px";
    } else {
      nav.style.bottom = "0";
      check.style.top = "2%";
    }
  }

  prevScrollpos = currentScrollPos;
};
