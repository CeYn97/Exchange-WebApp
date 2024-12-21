// document.addEventListener("DOMContentLoaded", function () {
//   const navItems = document.querySelectorAll(".nav-item a");

//   // Проверка, есть ли сохраненная активная ссылка
//   const activeLink = localStorage.getItem("activeLink");
//   if (activeLink) {
//     const activeElement = document.querySelector(`a[href="${activeLink}"]`);
//     if (activeElement) {
//       activeElement.classList.add("active");
//       const icon = activeElement.querySelector(".icon");
//       if (icon) {
//         icon.style.filter = "grayscale(0%) brightness(0) invert(1)";
//       }
//     }
//   }

//   navItems.forEach((item) => {
//     item.addEventListener("click", function (event) {
//       // Убираем класс active и возвращаем иконки в исходное состояние
//       navItems.forEach((link) => {
//         link.classList.remove("active");
//         const icon = link.querySelector(".icon");
//         if (icon) {
//           icon.style.filter = ""; // Возвращаем цвет иконки к исходному
//         }
//       });

//       // Добавляем класс active и меняем цвет иконки для текущей ссылки
//       this.classList.add("active");
//       const icon = this.querySelector(".icon");
//       if (icon) {
//         icon.style.filter = "grayscale(0%) brightness(0) invert(1)"; // Меняем цвет на черный
//       }

//       // Сохраняем ссылку, на которую был совершен клик
//       localStorage.setItem("activeLink", this.getAttribute("href"));
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Get all nav items
  const navItems = document.querySelectorAll(".nav-item");

  // Add click event listener to each nav item
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove the 'active' class from all items
      navItems.forEach((i) => i.classList.remove("active"));

      // Add the 'active' class to the clicked item
      item.classList.add("active");
    });
  });
});
