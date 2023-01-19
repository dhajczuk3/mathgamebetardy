const btn = $("#btn");
const icon = $("btn > i");
const audio = $("audio")[0];

btn.on("click", function () {
    if (audio.paused) {
        audio.volume = 0.3;
        audio.play();
        icon.removeClass('fa-volume-up');
        icon.addClass('fa-volume-mute');
    }

    else {
        audio.pause();
        icon.removeClass('fa-volume-mute');
        icon.addClass('fa-volume-up');
    }

});