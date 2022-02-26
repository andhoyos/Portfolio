AOS.init();
//toggle
const toggleBtn = document.querySelector(".toggle-btn");
const linkContainer = document.querySelector(".links_container");

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
          </div>
  </div>
  `;
});

//contact form

const send = document.querySelector(".send");
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const email = document.querySelector(".email");
const msg = document.querySelector(".message");

send.addEventListener("click", () => {
  if (
    firstName.value.length &&
    lastName.value.length &&
    email.value.length &&
    msg.value.length
  ) {
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
    fetch("/mail", {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
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
        lastName.value = "";
        email.value = "";
        msg.value = "";
      });
  }
});
