//ver 0.1
var editPhotoModule = function(){
    return{
        config: {
            minScale: 0.5,
            maxScale: 1.5,
            operateEl: 'uploadTpl',
            canvasEl: 'photoCanvas',
            debug: true,
            debugType: 0
        },
        operate: function(imgData){
            var that = this;
            if(that.config.debug){
                if(!document.getElementById(this.config.operateEl)){
                    that.sendMsg(this.config.operateEl + '元素不存在！');
                    return false;
                }
                if(!document.getElementById(this.config.canvasEl)){
                    that.sendMsg(this.config.canvasEl + '元素不存在！');
                    return false;
                }
            }
            that.edit(imgData);
        },
        edit: function(imgData){
            var that = this;
            var rotation = 0;
            var scale = 1;
            var x,y;
            var tempX,tempY;
            var panFlag = true;
            var canvas=document.getElementById(that.config.canvasEl);
            var ctx=canvas.getContext("2d");
            var img = new Image();
            img.src = imgData;
            img.onload = function(){
                setTimeout(function(){
                    var xPos = canvas.width / 2;
                    var yPos = canvas.height / 2;

                    ctx.clearRect(-canvas.width*3,-canvas.width*3,canvas.width*6,canvas.width*6);
                    ctx.save();
                    ctx.translate(xPos, yPos);
                    ctx.rotate(0 * Math.PI / 180);
                    ctx.translate(-xPos, -yPos);
                    ctx.drawImage(img, xPos - img.width / 2, yPos - img.height / 2);
                    ctx.restore();

                    var flag;
                    var _scale;
                    var editPhotoPanel = document.getElementById(that.config.operateEl);
                    var mc = new Hammer.Manager(editPhotoPanel);
                    var pan = new Hammer.Pan();
                    var pinch = new Hammer.Pinch();
                    var rotate = new Hammer.Rotate();
                    pinch.recognizeWith(rotate);
                    mc.add([pan, pinch]);
                    mc.off("pinch");
                    mc.on("pinchmove", function(e) {
                        if(e.rotation >= 0 && e.rotation <= 180){
                            flag = 1;
                        }else if(e.rotation > 180 && e.rotation < 360){
                            flag = 2;
                        }else if(e.rotation < 0 && e.rotation >= -180){
                            flag = 3;
                        }else if(e.rotation < -180 && e.rotation > -360){
                            flag = 4;
                        }
                        ctx.clearRect(-canvas.width*3,-canvas.width*3,canvas.width*6,canvas.width*6);
                        ctx.save();
                        ctx.translate(xPos, yPos);
                        ctx.rotate((e.rotation + rotation) * Math.PI / 180);
                        ctx.translate(-xPos, -yPos);


                        _scale = e.scale-1+scale;
                        if(_scale < that.config.minScale){
                            _scale = that.config.minScale;
                        }else if(_scale > that.config.maxScale){
                            _scale = that.config.maxScale
                        }
                        ctx.drawImage(img, xPos - img.width / 2+(img.width /2) * (1-_scale), yPos - img.height / 2+(img.height /2) * (1-_scale), img.width * _scale, img.height * _scale);
                        ctx.restore();
                    });
                    mc.on('pinchend', function(e){
                        if(flag == 1){
                            if(e.rotation >= 180){
                                rotation = rotation + e.rotation - 180;
                            }else if(e.rotation < 0){
                                rotation = rotation + e.rotation + 180;
                            }else{
                                rotation = rotation + e.rotation;
                            }
                        }else if(flag == 2){
                            if(e.rotation <= 180){
                                rotation = rotation + e.rotation + 180;
                            }else{
                                rotation = rotation + e.rotation;
                            }
                        }else if(flag == 3){
                            if(e.rotation >= 0){
                                rotation = rotation + e.rotation - 180;
                            }else{
                                rotation = rotation + e.rotation
                            }
                        }else if(flag == 4){
                            if(e.rotation > -180){
                                rotation = rotation + e.rotation - 180;
                            }else{
                                rotation = rotation + e.rotation
                            }
                        }

                        if(e.scale - 1 + scale < that.config.minScale){
                            scale = that.config.minScale;
                        }else if(e.scale - 1 + scale > that.config.maxScale){
                            scale = that.config.maxScale;
                        }else{
                            scale = e.scale - 1 + scale;
                        }
                    });

                    mc.on("panmove", function(e) {
                        if(panFlag){
                            tempX = e.deltaX < 0 ? -11 : 11;
                            tempY = e.deltaY < 0 ? -11 : 11;
                            panFlag = false;
                        }
                        x = e.deltaX - tempX;
                        y = e.deltaY - tempY;
                        ctx.clearRect(-canvas.width*3,-canvas.width*3,canvas.width*6,canvas.width*6);
                        ctx.translate(x,y);
                        ctx.save();
                        ctx.translate(xPos, yPos);
                        ctx.rotate(rotation * Math.PI / 180);//旋转47度
                        ctx.translate(-xPos, -yPos);
                        ctx.drawImage(img, xPos - img.width / 2+(img.width /2) * (1-(scale)), yPos - img.height / 2+(img.height /2) * (1-(scale)), img.width * (scale), img.height * (scale));
                        ctx.restore();

                        tempX = e.deltaX;
                        tempY = e.deltaY;
                    })
                    mc.on('panend', function(e){
                        panFlag = true;
                    });
                }, 300);
            };
        },
        sendMsg: function(str){
            var that = this;
            if(that.config.debugType === 0){
                alert(str);
            }else if(that.config.debugType === 1){
                console.log(str);
            }
        }
    }
}