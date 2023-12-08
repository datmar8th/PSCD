document.addEventListener('DOMContentLoaded', function () {
    const scrollButtons = document.querySelectorAll('.menu-item');
    const menuBar = document.querySelector('.menu-bar');
    const mainMenu = document.querySelector('.main-menu');
    const closeMenu = document.querySelector('.close-menu');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = button.firstChild.getAttribute('href');
            scrollToSection(sectionId);
        });
    });

    // Hàm cuộn đến phần tử có ID tương ứng
    function scrollToSection(sectionId) {
        const header = document.querySelector('header'); // Assuming your header is the direct child of the body
        const headerHeight = header.getBoundingClientRect().height;

        const targetElement = document.querySelector(sectionId);
        if (targetElement) {
            const offset = targetElement.offsetTop - headerHeight;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }

    menuBar.addEventListener('click', function () {
        mainMenu.classList.add('opened');
    });

    closeMenu.addEventListener('click', function () {
        mainMenu.classList.remove('opened');
    });
});

