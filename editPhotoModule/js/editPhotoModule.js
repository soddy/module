var editPhotoModule = function(){
    return{
        config: {
            el: '',
            canvasEl: 'photoCanvas'
        },
        init: function(){
            var photoCanvas = document.getElementById(this.config.canvasEl);
            var mc = new Hammer(photoCanvas);
            mc.on("panmove", function(e) {
                photoCanvas.textContent = e.deltaX;
                console.log(ev.deltaX);
                $('#myElement').css({
                    'top': ev.deltaY + 'px',
                    'left': ev.deltaX + 'px'
                });
            });
        }
    }
}