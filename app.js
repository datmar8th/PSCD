document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".image-wrapper img");
    const paginationWrapper = document.querySelector(".pagination-wrapper");

    let activeIndex = 0;

    showImage(activeIndex);

    autoSlide = setInterval(() => {
        activeIndex = (activeIndex + 1) % images.length;
        showImage(activeIndex);
    }, 5000);

    document.querySelector(".btn-prev").addEventListener("click", function () {
        activeIndex = (activeIndex - 1 + images.length) % images.length;
        showImage(activeIndex);
    });

    document.querySelector(".btn-next").addEventListener("click", function () {
        activeIndex = (activeIndex + 1) % images.length;
        showImage(activeIndex);
    });

    paginationWrapper.addEventListener("click", function (e) {
        const paginationBtn = e.target.closest(".btn-pagination");
        if (paginationBtn) {
            activeIndex = parseInt(paginationBtn.parentElement.dataset.index, 10);
            showImage(activeIndex);
        }
    });

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add("active");
                img.style.display = "block";
                setTimeout(function() {
                    img.style.opacity = "1";
    
                  }, 1000);
                console.log(img.style.opacity);

            } else {
                img.classList.remove("active");
                img.style.display = "none";
                img.style.opacity = "0";
            }
        });
        const imageCaption = images[index].alt;
        paginationWrapper.innerHTML = createBtnPagination(index);
        paginationWrapper.insertAdjacentHTML("beforeend", `<span>${imageCaption}</span>`);

    }

    function createBtnPagination(index) {
        let dot = "";
        for (let i = 0; i < images.length; i++) {
            const isActive = (i === index) ? "active" : "";
            dot += `<li class="pagination-item"   data-index="${i}">
                        <button class="btn-pagination ${isActive}"></button>
                    </li>`;
        }
        return dot;
    }
});
