$(() => {
    let activeIndex = 0,
        imgWidth = 748,
        totalImage = $(".image-wrapper img").length;
    {
        let dot = "";
        for (let i = 0; i < totalImage; i++) {
            const isActive = (i === activeIndex) ? "active" : "";
            dot += `<li class="pagination-item"><button class="btn-pagination ${isActive}"></button></li>`;
        }
        $(".pagination-wrapper").html(dot);
    }
    const updateSlide = (index, direction) => {
        $(".image-wrapper img[class!=active]").hide();
        $(".image-wrapper").css("left", 0);
        let leftPosition = 0;
        if (direction) {
            leftPosition = -1 * imgWidth;
            if (index > activeIndex) {
                for (let j = activeIndex + 1; j <= index; j++)
                    $(".image-wrapper").append($(".image-wrapper img[alt=img" + j + "]").show());
                leftPosition = (activeIndex - index) * imgWidth;
            } else $(".image-wrapper").append($(".image-wrapper img[alt=img" + index + "]").show());
        } else {
            let step = 1;
            if (index < activeIndex) {
                for (let j = activeIndex - 1; j >= index; j--)
                    $(".image-wrapper").prepend($(".image-wrapper img[alt=img" + j + "]").show());
                step = activeIndex - index;
            } else $(".image-wrapper").prepend($(".image-wrapper img[alt=img" + index + "]").show());
            $(".image-wrapper").css("left", `${-(step * imgWidth)}px`)
        }
        $(".image-wrapper").animate({ left: leftPosition }, 500);
        $(".pagination-wrapper li:eq(" + activeIndex + ") button").removeClass("active");
        $(".pagination-wrapper li:eq(" + index + ") button").addClass("active");
        $(".image-wrapper img[alt=img" + activeIndex + "]").removeClass("active");
        $(".image-wrapper img[alt=img" + index + "]").addClass("active");
        activeIndex = index;
    };
    $(".btn-next").on("click", () => {
        const changeIndex = activeIndex + 1 > totalImage - 1 ? 0 : activeIndex + 1;
        updateSlide(changeIndex, true);
    });
    $(".btn-prev").on("click", () => {
        const changeIndex = activeIndex - 1 < 0 ? totalImage - 1 : activeIndex - 1;
        updateSlide(changeIndex, false);
    });
    $(".pagination-item").on("click", function () {
        let newIndex = $('.pagination-wrapper .pagination-item').index(this);
        let direction = (newIndex > activeIndex);
        updateSlide(newIndex, direction);
    });
});
