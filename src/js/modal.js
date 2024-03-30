// 임직원 신규 등록 모달
const modal = document.querySelector(".executive-add__modal");
const executiveAddBtn = document.querySelector(".executive-add-btn");
const closeIcon = document.querySelector(".close-icon");

executiveAddBtn.addEventListener("click", () => {
    modal.style.display = "block";
});
closeIcon.addEventListener("click", () => {
    closeIcon.parentNode.parentNode.style.display = "none";
});

// 임직원 수정 모달
const modiModal = document.querySelector(".modi-executive__modal");
const executiveModiBtn = document.querySelector(".executive-modi");
const closeicon = document.querySelector(".close__icon");

// executiveModiBtn.addEventListener("click", () => {
//   modiModal.style.display = "block";
// });
closeicon.addEventListener("click", () => {
  closeicon.parentNode.parentNode.style.display = "none";
});