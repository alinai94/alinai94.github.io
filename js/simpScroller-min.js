/*!
 ** create by zhangxinxu(.com) 2013-07-15
 ** a simple method for custom scrolling
 ** it can be used on both mobile and parts desktop browser IE9+/FF/Chrome/...
 */
var simpScroller = (function() {
	var c = !((window.DocumentTouch && document instanceof window.DocumentTouch) || "ontouchstart" in window) * 1,
		b = {
			start: ["touchstart", "mousedown"][c],
			move: ["touchmove", "mousemove"][c],
			end: ["touchend", "mouseup"][c]
		};
	var a = function(e, l, f) {
		var n = "top",
			o = "Top",
			p = "height",
			g = "Height",
			d = "pageY";
		if(l == "horizontal") {
			n = "left";
			o = "Left";
			p = "width";
			g = "Width";
			d = "pageX"
		}
		var i = null;
		if(f.hideScrollBar == false) {
			i = document.createElement("div");
			i.className = "scroller_" + l;
			f.container.appendChild(i)
		}
		var m = e["client" + g],
			h = 0;
		var j = function() {
			if(i == null) {
				return
			}
			var r = i.style[p].replace("px", ""),
				q = e["scroll" + o] / (h - m) * (m - r);
			if(m - r - q <= 0) {
				q = m - r
			}
			i.style[n] = q + "px"
		};
		var k = {};
		e.addEventListener(b.start, function(q) {
			h = this["scroll" + g];
			k[d] = q.touches ? q.touches[0][d] : q[d];
			k[n] = this["scroll" + o];
			document.moveFollow = true;
			if(i && h > m) {
				i.style.opacity = 1;
				i.style[p] = (m * m / h) + "px";
				j()
			}
			c && q.preventDefault()
		});
		e.addEventListener(b.move, function(q) {
			if(c == false || (document.moveFollow == true)) {
				this["scroll" + o] = k[n] + (k[d] - (q.touches ? q.touches[0][d] : q[d]));
				j();
				f.onScroll.call(this, q)
			}
			q.preventDefault()
		});
		e.addEventListener(b.end, function(q) {
			i && (i.style.opacity = 0)
		});
		if(c == true) {
			document.addEventListener("mouseup", function() {
				this.moveFollow = false
			})
		}
	};
	return function(d, f) {
		f = f || {};
		var j = new Object({
				verticalScroll: true,
				horizontalScroll: false,
				hideScrollBar: false,
				onScroll: function() {}
			}),
			g;
		for(g in f) {
			j[g] = f[g]
		}
		if(window.getComputedStyle(d).position == "static") {
			d.style.position = "relative"
		}
		var i = d.childNodes,
			e = document.createDocumentFragment();
		[].slice.call(i).forEach(function(k) {
			e.appendChild(k)
		});
		var h = document.createElement("div");
		h.style.height = "100%";
		h.style.width = "100%";
		h.style.overflow = "hidden";
		d.appendChild(h);
		h.appendChild(e);
		j.container = d;
		if(j.verticalScroll == true) {
			a(h, "vertical", j)
		}
		if(j.horizontalScroll == true) {
			a(h, "horizontal", j)
		}
	}
})();