import { makeStyles } from "@material-ui/core";
import "./App.css";
import background_image from "./images/background.jpg";
import mockData from "./mockdata.js";
import TrelloList from "./components/TrelloList";
import AddCardorList from "./components/AddCardorList";
import { useState } from "react";
import uuid from "react-uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ContextAPI from "./ContextAPI.js";

function App() {
	const classes = useStyles();
	const [data, setData] = useState(mockData);

	const updateListTitle = (updatedTitle, listID) => {
		const list = data.lists[listID];
		list.title = updatedTitle;
		setData({
			...data,
			lists: {
				...data.lists,
				[listID]: list,
			},
		});
	};

	const addCard = (title, listId) => {
		const newCardId = uuid();
		const newCard = {
			id: newCardId,
			title: title,
		};
		const list = data.lists[listId];
		list.cards = [...list.cards, newCard];
		setData({
			...data,
			lists: {
				...data.lists,
				[listId]: list,
			},
		});
	};

	const addList = (title) => {
		const newListId = uuid();
		setData({
			listIds: [...data.listIds, newListId],
			lists: {
				...data.lists,
				[newListId]: {
					id: newListId,
					title,
					cards: [],
				},
			},
		});
	};

	const moveList = (dragIndex, hoverIndex) => {
		const newListIds = Array.from(data.listIds);
		const [removed] = newListIds.splice(dragIndex, 1);
		newListIds.splice(hoverIndex, 0, removed);

		setData({
			...data,
			listIds: newListIds,
		});
	};

	const moveCard = (sourceListId, sourceIndex, destinationListId, destinationIndex) => {
		const sourceList = data.lists[sourceListId];
		const destinationList = data.lists[destinationListId];

		const [removedCard] = sourceList.cards.splice(sourceIndex, 1);
		destinationList.cards.splice(destinationIndex, 0, removedCard);

		setData({
			...data,
			lists: {
				...data.lists,
				[sourceListId]: sourceList,
				[destinationListId]: destinationList,
			},
		});
	};

	return (
		<ContextAPI.Provider value={{ updateListTitle, addCard, addList, moveList, moveCard }}>
			<div className={classes.root}>
				<DndProvider backend={HTML5Backend}>
					<div className={classes.container}>
						{data.listIds.map((listID, index) => {
							const list = data.lists[listID];
							return <TrelloList list={list} key={listID} index={index} />;
						})}
						<div>
							<AddCardorList type="list" />
						</div>
					</div>
				</DndProvider>
			</div>
		</ContextAPI.Provider>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundImage: `url(${background_image})`,
		backgroundPosition: "center",
		overflowY: "auto",
		minHeight: "100vh",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	},
	container: {
		display: "flex",
	},
}));

export default App;
