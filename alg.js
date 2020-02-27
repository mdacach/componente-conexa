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

let transitiveDirect = function(adjacencyList, nodeNumber) {
	let previous = new Set();
	let current = new Set();
	let node = adjacencyList.find((elt) => elt.id === nodeNumber);
	node.direct.forEach((elt) => current.add(elt));

	// paramos quando a proxima iteracao retorna o mesmo resultado
	while (!isEqual(previous, current)) {
		previous = current;
		for (let nodeNumber of current) {
			node = adjacencyList.find((elt) => elt.id === nodeNumber);

			console.log(node.direct);

			node.direct.forEach((elt) => current.add(elt));
		}
	}

	return current;
};

let transitiveIndirect = function(adjacencyList, nodeNumber) {
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

let solve = function(adjacencyList, available, components) {
	if (available.size == 0) return;

	let nodes = Array.from(available);
	let node = nodes[0]; // comecando por um no qualquer
	console.log({ node });

	let direct = transitiveDirect(adjacencyList, node);
	console.log({ direct });
	let indirect = transitiveIndirect(adjacencyList, node);
	console.log({ indirect });
	let component = intersection(direct, indirect);

	components.push(component);
	console.log({ component });
	console.log({ components });
	available = removeSeen(available, component);
	console.log({ available });

	solve(adjacencyList, available, components);
};
