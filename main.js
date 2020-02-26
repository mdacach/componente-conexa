new Vue({
	el: '#app',
	data: {
		adjList: {},
	}, // data is the adjacency list
	methods: {
		addNode(node) {
			this.adjList.push(node);
		},
		showList() {
			console.log(this.adjList);
		},
	},
});
