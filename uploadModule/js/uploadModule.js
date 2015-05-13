//ver 0.2
var uploadModule = function(){
    return{
        config: {
            el: '',
            imgH: 0,
            quality: 0.7,
            debug: false,
            debugType: 0
        },
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var ua = navigator.userAgent.toLowerCase();
            return { //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
                weixin: ua.match(/MicroMessenger/i) == "micromessenger"
            };
        }(),
        upload: function(imgData){
            var that = this;
            var imgW, imgNw;
            var imgH, imgNh;
            var canvasH, canvasW, canvasTop, canvasLeft;
            var imgTop, imgLeft;
            var canvas;
            var ctx;
            var tmpcanvasW, tmpcanvasH;
            var el = this.config.el;
            var _imgH = this.config.imgH;
            var quality = this.config.quality;
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            if(!el) throw console.error('el empty');
            $(el).change(function () {
                var Orientation = 0;
                var file = this.files[0];
                if (file !== undefined) {
                    setTimeout(function(){
                        window.URL = window.webkitURL;
                        var src = window.URL.createObjectURL(file);
                        var img = new Image();
                        img.src = src;
                        img.onload = function () {
                            EXIF.getData(file, function(){
                                if(that.config.debug){
                                    if(that.config.debugType === 0){
                                        alert(EXIF.pretty(this));
                                    }else if(that.config.debugType === 1){
                                        console.log(EXIF.getAllTags(this));
                                    }
                                }
                                Orientation = EXIF.getTag(this, 'Orientation');
                                if (Orientation == 1) {
                                    imgW = img.width;
                                    imgH = img.height;
                                    if (imgW >= imgH) {
                                        imgNw = _imgH;
                                        imgNh = imgNw * imgH / imgW;
                                        canvasH = imgNh;
                                        canvasW = imgNw;

                                        ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                        canvas.width = tmpcanvasW = canvasW;
                                        canvas.height = tmpcanvasH = canvasH;
                                        if (3260 < imgW || imgH > 2440) {
                                            if ((that.versions.iosv).indexOf(8) == 1) {
                                                ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                            } else {
                                                ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                            }
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                        }
                                        pos = 0;
                                    } else {
                                        imgNh = _imgH;
                                        imgNw = imgNh * imgW / imgH;
                                        canvasH = imgNh;
                                        canvasW = imgNw;

                                        ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                        canvas.width = tmpcanvasW = canvasW;
                                        canvas.height = tmpcanvasH = canvasH;

                                        if (3260 < imgH || imgW > 2440) {
                                            if ((that.versions.iosv).indexOf(8) == 1) {
                                                ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                            } else {
                                                ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                            }
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                        }
                                        pos = 1;
                                    }
                                }else if (Orientation == 3){
                                    imgW = img.width;
                                    imgH = img.height;
                                    if (imgW >= imgH) {
                                        imgNw = _imgH;
                                        imgNh = imgNw * imgH / imgW;
                                        canvasH = imgNh;
                                        canvasW = imgNw;

                                        ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                        canvas.width = tmpcanvasW = canvasW;
                                        canvas.height = tmpcanvasH = canvasH;
                                        ctx.translate(imgNw, imgNh);
                                        ctx.rotate(180 * Math.PI / 180);
                                        if (3260 < imgW || imgH > 2440) {
                                            if ((that.versions.iosv).indexOf(8) == 1) {
                                                ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                            } else {
                                                ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                            }
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                        }
                                        pos = 0;
                                    } else {
                                        imgNh = _imgH;
                                        imgNw = imgNh * imgW / imgH;
                                        canvasH = imgNh;
                                        canvasW = imgNw;

                                        ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                        canvas.width = tmpcanvasW = canvasW;
                                        canvas.height = tmpcanvasH = canvasH;

                                        if (3260 < imgH || imgW > 2440) {
                                            if ((that.versions.iosv).indexOf(8) == 1) {
                                                ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                            } else {
                                                ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                            }
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                        }
                                        pos = 1;
                                    }
                                }else if (Orientation == 6) {
                                    imgW = img.width;
                                    imgH = img.height;
                                    imgNw = _imgH;
                                    imgNh = imgNw * imgH / imgW;
                                    canvasH = imgNh;
                                    canvasW = imgNw;

                                    ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                    canvas.width = tmpcanvasH = canvasH;
                                    canvas.height = tmpcanvasW = canvasW;
                                    ctx.translate(imgNh, 0);
                                    ctx.rotate(90 * Math.PI / 180);

                                    if (3260 < imgW || imgH > 2440) {
                                        if ((that.versions.iosv).indexOf(8) == 1) {
                                            ctx.drawImage(img, imgLeft, imgTop, imgNw, imgNw);
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                        }
                                    } else {
                                        ctx.drawImage(img, imgLeft, imgTop, imgNw, imgNw);
                                    }
                                    pos = 1;
                                }else if (Orientation == 8) {
                                    imgW = img.width;
                                    imgH = img.height;
                                    imgNw = _imgH;
                                    imgNh = imgNw * imgH / imgW;
                                    canvasH = imgNh;
                                    canvasW = imgNw;

                                    ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                    canvas.width = tmpcanvasH = canvasH;
                                    canvas.height = tmpcanvasW = canvasW;
                                    ctx.translate(0, imgNw);
                                    ctx.rotate(270 * Math.PI / 180);

                                    if (3260 < imgW || imgH > 2440) {
                                        if ((that.versions.iosv).indexOf(8) == 1) {
                                            ctx.drawImage(img, 0, 0, imgNw, imgNw);
                                        } else {
                                            ctx.drawImage(img, 0, 0, imgW / 2, imgH / 2, 0, 0, imgNw, imgNh);
                                        }
                                    } else {
                                        ctx.drawImage(img, 0, 0, imgNw, imgNw);
                                    }
                                    pos = 1;
                                }else{
                                    imgW = img.width;
                                    imgH = img.height;
                                    if (imgW > imgH) {
                                        //横
                                        imgNw = _imgH;
                                        imgNh = imgNw * imgH / imgW;
                                        canvasH = imgNh;
                                        canvasW = imgNw;
                                        pos = 0;
                                    } else if (imgW < imgH) {
                                        //竖
                                        imgNh = _imgH;
                                        imgNw = imgNh * imgW / imgH;
                                        canvasH = imgNh;
                                        canvasW = imgNw;
                                        pos = 1;
                                    } else if (imgW == imgH) {
                                        //正方
                                        imgNw = _imgH;
                                        imgNh = _imgH;
                                        canvasH = _imgH;
                                        canvasW = _imgH;
                                        pos = 1;
                                    }

                                    ctx.clearRect(0, 0, tmpcanvasW, tmpcanvasH);
                                    canvas.width = tmpcanvasW = canvasW;
                                    canvas.height = tmpcanvasH = canvasH;
                                    ctx.drawImage(img, 0, 0, imgNw, imgNh);
                                }
                                imgData(function(){
                                    return {
                                        'img': canvas.toDataURL('image/jpeg', quality),
                                        'pos': pos
                                    };
                                }());
                            });
                        };
                    },300);
                };
            });
        }
    }
};