//===================================
ver 0.1
更新记录：
1.图片缩放旋转模块，用于移动端。
2.使用方法：
    a.加载editPhotoModule.js模块，实例化editPhotoModule
    b.调用config对象配置参数，minScale:图片最小缩放比，maxScale：图片最大缩放比，operateEl: 拖动缩放图片的控制元素id，就是一个div，位于最高层，canvasEl:绘制图片canvas元素id，debug: 检测元素是否存在，默认为false，debugType: debug打印形式，0为console，1位alert
    c.实例化后调用operate方法，有一个参数为图片地址或者图片流二进制数据，可以结合uploadModule模块同时使用