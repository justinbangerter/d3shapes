var d3shapes = (function () {

	/*******
	 *Paths*
	 *******/

	var cosFF = Math.cos(Math.PI / 4);
	var sinFF = Math.sin(Math.PI / 4);

	var circlePath = function (r) {
		return [
			"M 0," + r,
			"m -" + r + ", 0",
			"a " + r + "," + r + " 0 1,0 " + (r * 2) + ",0",
			"a " + r + "," + r + " 0 1,0 -" + (r * 2) + ",0"
		].join("");
	};

	var marsPath = function (d) {
		var r = 10;
		if (d && d.r) {
			r = d.r;
		}

		var edgeX = r * cosFF;
		var edgeY = r * (1 - sinFF);
		var tipX = 2 * r * cosFF;
		var tipY = r * ( 1 - 2 * sinFF);
		var path = [
			circlePath(r),
			"M " + edgeX + " " + edgeY,
			"L " + tipX + ", " + tipY,
			"L " + edgeX + ", " + tipY,
			"M " + (tipX + 1) + ", " + tipY,
			"L " + (tipX + 1) + ", " + edgeY
		];
		return path.join("");
	};

	var venusPath = function (d) {
		var r = 10;
		if (d && d.r) {
			r = d.r;
		}

		var edgeY = 2 * r;
		var tipY = 3 * r;
		var rightTipX = 0.75 * r;
		var leftTipX = -rightTipX;
		var crossY = 2.5 * r;

		var path = [
			circlePath(r),
			"M 0, " + edgeY,
			"L 0, " + tipY,
			"M " + leftTipX + ", " + crossY,
			"L " + rightTipX + ", " + crossY
		];
		return path.join("");
	};

	var tipAngle = Math.PI / 4;
	var cosT = Math.cos(tipAngle);
	var sinT = Math.sin(tipAngle);

	var sideAngle = Math.PI / 4;
	var cosS = Math.cos(sideAngle);
	var sinS = Math.sin(sideAngle);

	var cutAngle = 0.38 * Math.PI;
	var cosC = Math.cos(cutAngle);
	var sinC = Math.sin(cutAngle);

	var weddingRingPath = function (d) {
		var r = 10;
		if (d && d.r) {
			r = d.r;
		}
		var tipY = 0.3 * r;
		var sideY = tipY - 0.6 * r * sinS;
		var sideX = tipY + 0.6 * r * cosS;
		var topY = sideY - 0.4 * r * sinT;
		var topX = sideX - 0.4 * r * cosT;
		var cutX = r * cosC;
		var cutY = r * sinC;

		var path = [
			"M -" + cutX + ", " + (r - cutY),
			"A " + r + "," + r + " 0 1,0 " + cutX + ", " + (r - cutY) ,
			"M 0, " + tipY,
			"L " + sideX + ", " + sideY,
			"L " + topX + ", " + topY,
			"L -" + topX + ", " + topY,
			"L -" + sideX + ", " + sideY,
			"L 0, " + tipY
		];
		return path.join("");
	};

	/******
	 *SVGs*
	 ******/

	var marsSvg = function (svg) {
		return svg.append("svg:g")
				.append("svg:path")
				.attr("stroke", "#26B")
				.attr("stroke-width", "3")
				.attr("fill", "none")
				.attr("d", marsPath)
				.attr("transform", function (d) {
					return "translate(" + d.p[0] + "," + (d.p[1] - d.r) + ")";
				});
	};

	var venusSvg = function (svg) {
		return svg.append("svg:g")
				.append("svg:path")
				.attr("stroke", "#B35")
				.attr("stroke-width", "3")
				.attr("fill", "none")
				.attr("d", venusPath)
				.attr("transform", function (d) {
					return "translate(" + d.p[0] + "," + (d.p[1] - d.r) + ")";
				});
	};

	var weddingRingSvg = function (svg) {
		return svg.append("svg:g")
				.append("svg:path")
				.attr("stroke", "#111")
				.attr("stroke-width", "3")
				.attr("fill", "none")
				.attr("d", weddingRingPath)
				.attr("transform", function (d) {
					return "translate(" + d.p[0] + "," + (d.p[1] - d.r) + ")";
				});
	};

	/***********
	 *Interface*
	 ***********/

	return {
		marsPath:marsPath,
		marsSvg:marsSvg,
		venusPath:venusPath,
		venusSvg:venusSvg,
		weddingRingPath:weddingRingPath,
		weddingRingSvg:weddingRingSvg
	}
})();
