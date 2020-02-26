// LISTA DE ADJACENCIA
const adjacencyList = [
	{ id: 1, direct: [1, 2, 3], indirect: [1, 6] },
	{ id: 2, direct: [2, 4, 5], indirect: [1, 2, 6] },
	{ id: 3, direct: [3, 4], indirect: [1, 3, 4] },
	{ id: 4, direct: [3, 4], indirect: [2, 3, 4] },
	{ id: 5, direct: [5, 6], indirect: [2, 5] },
	{ id: 6, direct: [1, 2, 6], indirect: [5, 6] },
];

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
	let current = new Set();
	let node = adjacencyList.find((elt) => elt.id === nodeNumber);
	node.direct.forEach((elt) => current.add(elt));

	// paramos quando a proxima iteracao retorna o mesmo resultado
	while (!isEqual(previous, current)) {
		previous = current;
		for (let nodeNumber of current) {
			node = adjacencyList.find((elt) => elt.id === nodeNumber);

			node.direct.forEach((elt) => current.add(elt));
		}
	}

	return current;
};

let transitiveIndirect = function(nodeNumber) {
	let previous = new Set();
	let current = new Set();
	let node = adjacencyList.find((elt) => elt.id === nodeNumber);
	node.indirect.forEach((elt) => current.add(elt));

	// paramos quando a proxima iteracao retorna o mesmo resultado
	while (!isEqual(previous, current)) {
		previous = current;
		for (let nodeNumber of current) {
			node = adjacencyList.find((elt) => elt.id === nodeNumber);
			node.indirect.forEach((elt) => current.add(elt));
		}
	}

	return current;
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

console.log('**************');
console.log('ANSWER: ');
console.log(components);
