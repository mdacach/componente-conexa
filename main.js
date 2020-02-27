let app = new Vue({
	el: '#app',
	data: {
		adjacencyList: [
			{ id: 1, direct: [1, 2, 3], indirect: [1, 6] },
			{ id: 2, direct: [2, 4, 5], indirect: [1, 2, 6] },
			{ id: 3, direct: [3, 4], indirect: [1, 3, 4] },
			{ id: 4, direct: [3, 4], indirect: [2, 3, 4] },
			{ id: 5, direct: [5, 6], indirect: [2, 5] },
			{ id: 6, direct: [1, 2, 6], indirect: [5, 6] },
		],
	}, // data is the adjacency list
	methods: {
		addNode() {
			this.adjacencyList.push({});
		},
		showList() {
			console.table(this.adjacencyList);
		},
		sanitize() {
			for (let i = 0; i < this.adjacencyList.length; i++) {
				let currentNode = this.adjacencyList[i];
				if (!currentNode.id) continue;

				currentNode.id = parseInt(currentNode.id);

				if (typeof currentNode.direct === 'string') {
					let directElts = currentNode.direct.split(',');
					console.log(directElts);
					currentNode.direct = [];
					for (elt of directElts) {
						console.log(elt);
						currentNode.direct.push(parseInt(elt));
					}
				}
				if (typeof currentNode.indirect === 'string') {
					let indirectElts = currentNode.indirect.split(',');
					currentNode.indirect = [];
					for (elt of indirectElts) {
						currentNode.indirect.push(parseInt(elt));
					}
				}
			}
		},
	},
});

getAdjacencyList = function() {
	let ADJACENCY_LIST = app.$data.adjacencyList;
	return ADJACENCY_LIST;
};

getAvailable = function() {
	let AVAILABLE = new Set();
	let ADJACENCY_LIST = getAdjacencyList();
	for (node of ADJACENCY_LIST) {
		AVAILABLE.add(node.id);
	}
	console.log({ AVAILABLE });
	return AVAILABLE;
};

let alg = new Vue({
	el: '#alg',
	data: {
		components: [],
		isFinished: false,
		numComponents: 1,
	},
	methods: {
		showAdjacencyList() {
			console.log(getAdjacencyList());
		},
		showAvailable() {
			console.log(getAvailable());
		},
		runAlgorithm() {
			let adjacencyList = getAdjacencyList();
			let available = getAvailable();
			let components = [];
			solve(adjacencyList, available, components);
			console.log(components);
			this.components = components;
			this.isFinished = true;
			this.numComponents = components.length;
			return components;
		},
		clear() {
			this.isFinished = false;
			this.components = '';
		},
	},
});
