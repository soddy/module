//===================================
ver 0.2.1
更新记录：
1.修改了iphone6和iphone6 plus中上传图片显示不正常的问题。

ver 0.2
更新记录：
1.将jquery.exif.js替换成了exif.js。
2.去掉了之前ios和android端的判断，统一用一套。
3.去掉了在body中添加img标签，废弃加载file上传的二进制流到img标签中，再利用jquery.exif.js来获取图片信息的方法。
4.加入debug功能，在config对象中加入debug和debugType属性，debug:true(debug功能打开，用户弹出上传图片的信息)，debugType:0(0代表alert方式弹出信息，1代表console.log方式打印信息)