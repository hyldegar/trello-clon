import { Paper, CssBaseline, makeStyles } from "@material-ui/core";
import AddCardorList from "./AddCardorList";
import ListTitle from "./ListTitle";
import TrelloCard from "./TrelloCard";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { useContext } from "react";
import ContextAPI from "../ContextAPI";

const TrelloList = ({ list, index }) => {
	const classes = useStyles();
	const { moveList } = useContext(ContextAPI);

	const [, drop] = useDrop({
		accept: ItemTypes.LIST,
		hover(item) {
			if (item.index !== index) {
				moveList(item.index, index);
				item.index = index;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.LIST,
		item: { id: list.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div ref={drop} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<Paper className={classes.root} ref={drag}>
				<CssBaseline />
				<ListTitle title={list.title} listId={list.id} />
				<div>
					{list.cards.map((card, index) => (
						<TrelloCard card={card} key={card.id} index={index} listId={list.id} />
					))}
				</div>
				<AddCardorList type="card" listId={list.id} />
			</Paper>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "300px",
		background: "#ebecf0",
		margin: theme.spacing(1),
	},
}));

export default TrelloList;
