// LISTA DE ADJACENCIA
const adjacencyList = {
	1: {
		direct: [1, 2, 3],
		indirect: [1, 6],
	},
	2: {
		direct: [2, 4, 5],
		indirect: [1, 2, 6],
	},
	3: {
		direct: [3, 4],
		indirect: [1, 3, 4],
	},
	4: {
		direct: [3, 4],
		indirect: [2, 3, 4],
	},
	5: {
		direct: [5, 6],
		indirect: [2, 5],
	},
	6: {
		direct: [1, 2, 6],
		indirect: [5, 6],
	},
};

let available = new Set([1, 2, 3, 4, 5, 6]); // todos os nos estao disponiveis

let isEqual = function(setA, setB) {
	if (setA.size !== setB.size) {
		return false;
	} else {
		for (let item of setA) {
			if (!setB.has(item)) return false;
		}
	}
	return true;
};

let transitiveDirect = function(nodeNumber) {
	let previous = new Set();
	let r = new Set();
	let node = adjacencyList[nodeNumber];
	node.direct.forEach((elt) => r.add(elt));

	// paramos quando a proxima iteracao retorna o mesmo resultado
	while (!isEqual(previous, r)) {
		previous = r;
		for (let node of r) {
			node = adjacencyList[node];
			node.direct.forEach((elt) => r.add(elt));
		}
	}

	return r;
};

let transitiveIndirect = function(nodeNumber) {
	let previous = new Set();
	let r = new Set();
	let node = adjacencyList[nodeNumber];
	node.indirect.forEach((elt) => r.add(elt));

	// paramos quando a proxima iteracao retorna o mesmo resultado
	while (!isEqual(previous, r)) {
		previous = r;
		for (let node of r) {
			node = adjacencyList[node];
			node.indirect.forEach((elt) => r.add(elt));
		}
	}

	return r;
};

let intersection = function(setA, setB) {
	let result = new Set();
	if (setA.size <= setB.size) {
		for (let item of setA) {
			if (setB.has(item)) {
				result.add(item);
			}
		}
	} else {
		for (let item of setB) {
			if (setA.has(item)) {
				result.add(item);
			}
		}
	}
	return result;
};

let removeSeen = function(available, seen) {
	for (let item of seen) {
		available.delete(item);
	}
	return available;
};

let components = [];

let solve = function(available) {
	if (available.size == 0) return;

	let nodes = Array.from(available);
	let node = nodes[0]; // comecando por um no qualquer
	console.log({ node });

	let direct = transitiveDirect(node);
	console.log({ direct });
	let indirect = transitiveIndirect(node);
	console.log({ indirect });
	let component = intersection(direct, indirect);

	components.push(component);
	console.log({ component });
	console.log({ components });
	available = removeSeen(available, component);
	console.log({ available });

	solve(available);
};

solve(available);

console.log(components);
