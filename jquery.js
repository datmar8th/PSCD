$(() => {
    const totalImage = $(".image-wrapper img").length;
    let activeIndex = 0;
    {
        let dot = "";
        for (let i = 0; i < totalImage; i++) {
            dot += `<li class="select-item"><button class="btn-pagination ${i === 0 ? 'active' : ''}"></button></li>`;
        }
        $(".pagination-wrapper").html(dot);
    }
    const updateSlide = () => {
        $(".image-wrapper").css("transform", `translateX(${-activeIndex * 100}%)`);
        $(".btn-pagination").removeClass("active");
        $(".btn-pagination").eq(activeIndex).addClass("active");
        const imageAlt = $(".image-wrapper img").eq(activeIndex).attr("alt");
        $(".image-caption").text(imageAlt);
    };
    $(".btn-next").on("click", () => {
        activeIndex = (activeIndex + 1) % totalImage;
        updateSlide();
    });
    $(".btn-prev").on("click", () => {
        activeIndex = (activeIndex - 1 + totalImage) % totalImage;
        updateSlide();
    });
    $(".btn-pagination").on("click", (e) => {
        const newIndex = $(e.target).closest('li').index();
        if (newIndex !== activeIndex) {
            activeIndex = newIndex;
            updateSlide();
        }
    });
});
