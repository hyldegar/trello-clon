import { Button, IconButton, InputBase, Paper, alpha, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import MoreHorizonIcon from "@material-ui/icons/MoreHoriz";
import contextAPI from "../ContextAPI";

const AddCardorListText = ({ type, setOpen, listId }) => {
	const [title, setTitle] = useState("");
	const classes = useStyle();
	const { addCard, addList } = useContext(contextAPI);

	const handleAddCardorList = () => {
		if (type === "card") {
			addCard(title, listId);
		} else {
			addList(title);
		}
		setTitle("");
		setOpen(false);
	};

	return (
		<>
			<Paper className={classes.card}>
				<InputBase
					multiline
					value={title}
					onBlur={() => setOpen(false)}
					onChange={(e) => setTitle(e.target.value)}
					placeholder={type === "card" ? "Enter a title for this card..." : "Enter list title..."}
					inputProps={{ className: classes.input }}
				/>
			</Paper>
			<div className={classes.confirm}>
				<div className={classes.options}>
					<Button className={classes.btnConfirm} onClick={handleAddCardorList}>
						Add {type}
					</Button>
					<IconButton onClick={() => setOpen(false)}>
						<ClearIcon />
					</IconButton>
				</div>

				<IconButton>
					<MoreHorizonIcon />
				</IconButton>
			</div>
		</>
	);
};
const useStyle = makeStyles((theme) => ({
	card: {
		width: "280px",
		paddingBottom: theme.spacing(4),
		margin: theme.spacing(0, 0, 0, 1),
	},
	input: {
		margin: theme.spacing(1),
	},
	options: {
		flexGrow: 1,
	},
	confirm: {
		display: "flex",
		margin: theme.spacing(0, 1, 1, 1),
	},
	btnConfirm: {
		background: "#5aac44",
		color: "#fff",
		"&:hover": {
			background: alpha("#5aac44", 0.75),
		},
	},
}));
export default AddCardorListText;
