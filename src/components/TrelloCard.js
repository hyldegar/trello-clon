import { Paper, makeStyles } from "@material-ui/core";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { useContext } from "react";
import ContextAPI from "../ContextAPI";

const TrelloCard = ({ card, index, listId }) => {
	const classes = useStyles();
	const { moveCard } = useContext(ContextAPI);

	const [, drop] = useDrop({
		accept: ItemTypes.CARD,
		hover(item) {
			if (item.index !== index || item.listId !== listId) {
				moveCard(item.listId, item.index, listId, index);
				item.index = index;
				item.listId = listId;
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: { id: card.id, index, listId },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<Paper className={classes.trellocard}>{card.title}</Paper>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	trellocard: {
		padding: theme.spacing(1, 1, 1, 2),
		margin: theme.spacing(1),
	},
}));

export default TrelloCard;
