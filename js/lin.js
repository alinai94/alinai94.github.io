	
	var touchstart = "ontouchstart" in window ? "touchstart" : "mousedown";
	var touchmove = "ontouchmove" in window ? "touchmove" : "mousemove";
	var touchend = "ontouchend" in window ? "touchend" : "mouseup";

	var clientWidth;
	(function (doc, win) {
	  var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
		 
		 if (docEl.clientWidth>docEl.clientHeight){
			clientWidth = docEl.clientWidth-64;
		 }else{
			clientWidth = docEl.clientHeight;
		 };
		  if (!clientWidth) return;
		  docEl.style.fontSize = 100 * (clientWidth / 568) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	
	})(document, window);

	//适应横竖屏
	function checkDirect(){
		var a = document.documentElement.clientHeight, s = document.documentElement.clientWidth;

		var e = function(e, n) {// 横屏

			var t, i = s / a, r = 568 / 320;
			t = i < r ? a / 320 :s / 568, $(e).css({
				"-webkit-transform-origin":n,
				"transform-origin":n,
				"-webkit-transform":"scale(" + t + ");",
				transform:"scale(" + t + ");"
			});

		};

		var d = function(e, n) {// 横屏
			 $(e).css({
				"width":s,
				"height":a,
				"margin":0,
				'left':0,
				'top':0,
				"-webkit-transform-origin":0,
				"transform-origin":0,
				"-webkit-transform":"rotate(0)",
				transform:"rotate(0)"
			});

		};

		var eh = function(e, n) {//竖屏

	    
			var t;//i = s / a, r = 568 / 320;
			 t =  s / 320, $(e).css({
				"-webkit-transform-origin":n,
				"transform-origin":n,
				"-webkit-transform":"rotate(90deg) scale(" + t + ")",
				transform:"rotate(90deg) scale(" + t + ");"
			});
		};

		var ed = function(e, n) {//竖屏
			var t;//i = s / a, r = 568 / 320;
			var v = -(s-a)/2 + "px 0px  0px " + (s-a)/2 +"px";


			 t =  a / 568, $(e).css({
				"width": a,
				"height":s,
				"margin":v,
				"-webkit-transform-origin":n,
				"transform-origin":n,
				"-webkit-transform":"rotate(90deg)",
				'transform':"rotate(90deg)"
			});
		};

		//a>s?eh("body","center center"):e("body","center center");
		a>s?d("body","center center"):ed("body","center center");
	}
	checkDirect();
	var evt = "onorientationchanged" in window ? "orientationchanged" : "resize";
	window.addEventListener(evt, checkDirect , false);
	

