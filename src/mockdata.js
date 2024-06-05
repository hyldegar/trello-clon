const mockData = {
	listIds: ["list-1", "list-2"],
	lists: {
		"list-1": {
			id: "list-1",
			title: "To Do",
			cards: [
				{ id: "card-1", title: "Task 1" },
				{ id: "card-2", title: "Task 2" },
			],
		},
		"list-2": {
			id: "list-2",
			title: "In Progress",
			cards: [
				{ id: "card-3", title: "Task 3" },
				{ id: "card-4", title: "Task 4" },
			],
		},
	},
};

export default mockData;
