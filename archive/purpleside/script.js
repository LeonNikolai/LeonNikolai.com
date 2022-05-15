function generateNoise(opacity, h, w) {
    function makeCanvas(h, w) {
         var canvas = document.createElement('canvas');
         canvas.height 	= h;
         canvas.width 	= w;
         return canvas;
    }

    function randomise(data, opacity) {
        var i, x;
        for (i = 0; i < data.length; i = i + 4) {
            x = Math.floor(Math.random() * 0xffffff);
            data[i    ] =  x &     0xff        ;
            data[i + 1] = (x &   0xff00) >>>  8;
            data[i + 2] = (x & 0xff0000) >>> 16;
            data[i + 3] = opacity;
        }
    }

    function initialise(opacity, h, w) {
        var canvas = makeCanvas(h, w),
            context = canvas.getContext('2d'),
            image = context.createImageData(h, w);
            opacity = Math.floor((opacity || 0.2) * 0x255);
        return function () {
            randomise(image.data, opacity);
            context.putImageData(image, 0, 0);
            document.getElementById("noise").style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
        };
    }

    return initialise(opacity, h || 55, w || 55);
}
noise = generateNoise(.02, 64, 64);

(function loop() {
    noise();
    requestAnimationFrame(loop);
})();
