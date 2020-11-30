const openBtns = document.querySelectorAll(".open");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal_overlay");
const closeBtn = modal.querySelector(".close");

const openModal = (event) => {
  modal.classList.remove("hidden");
  console.log("open!");
  console.log(event.target);
}

const closeModal = () => {
  modal.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

for(const btn of openBtns) {
  btn.addEventListener("click", openModal);
}

/*
회원 탈퇴 비밀번호 확인
*/
// const withdrawBtn = document.getElementById("withdraw_open");
// const withdrawModal = document.querySelector(".withdrawModal");
// const withdraw_overlay = withdrawModal.querySelector(".modal_overlay");
// const withdraw_close = withdrawModal.querySelector(".close");
