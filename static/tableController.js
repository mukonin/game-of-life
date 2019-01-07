angular.module('app').controller("tableController", function ($scope) {

	$scope.data = {};
	$scope.data.data = [];

	const alive = {"background-color":"red"};
	const dead = {"background-color":"black"};
	const height = 100;
	const width = 100;

	$scope.init = function () {
		for (var index1 = 0; index1 < height; index1++) {
			var row = [];
			for (var index2 = 0; index2 < width; index2++) {
				var random = Math.round((Math.random() * 10));
				var color = random % 2 === 0
				? alive
				: dead;
				row.push(color);
			}
			$scope.data.data.push(row);
		}
		setInterval(click, 500);

	};

	$scope.calculate = function () {
		var newData = [];
		for (var index1 = 0; index1 < height; index1++) {
			var row = [];
			for (var index2 = 0; index2 < width; index2++) {
				var color = isAlive(index1, index2)
					? alive
					: dead;
				row.push(color);

			}
			newData.push(row);
		}
		$scope.data.data = newData.slice();
		console.log("tick");
		console.log($scope.data);
	};

	function click() {
		document.getElementById("click").click()
	}

	function isAlive(index1, index2) {
		var neighbours = [];

		var northRow = index1 - 1;
		if (northRow === -1) {
			northRow = height - 1;
		}

		var southRow = index1 + 1;
		if (southRow === height) {
			southRow = 0;
		}

		var westColumn = index2 - 1;
		if (westColumn === -1) {
			westColumn = width - 1;
		}

		var eastColumn = index2 + 1;
		if (eastColumn === width) {
			eastColumn = 0;
		}

		neighbours.push({row: northRow, column: westColumn});
		neighbours.push({row: northRow, column: index2});
		neighbours.push({row: northRow, column: eastColumn});
		neighbours.push({row: index1, column: westColumn});
		neighbours.push({row: index1, column: eastColumn});
		neighbours.push({row: southRow, column: westColumn});
		neighbours.push({row: southRow, column: index2});
		neighbours.push({row: southRow, column: eastColumn});

		var aliveNeighbors = 0;
		var aliveItself = $scope.data.data[index1][index2] === alive;
		neighbours.forEach(function (neighbour) {
			if ($scope.data.data[neighbour.row][neighbour.column] === alive) {
				aliveNeighbors++;
			}
		});
		if (aliveItself && aliveNeighbors < 2) {
			return false;
		}
		if (aliveItself && aliveNeighbors > 3) {
			return false
		}
		if (!aliveItself && aliveNeighbors === 3) {
			return true;
		}
		if (aliveItself && (aliveNeighbors ===2 || aliveNeighbors === 3)) {
			return true;
		}
		return false;
	}
});