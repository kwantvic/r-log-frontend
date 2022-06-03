import React from "react";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";

import styles from "./Comment.module.scss";
import { ResponseUser } from "../../utils/api/types";
import { Api } from "../../utils/api";

interface CommentPostProps {
	id: number;
	user: ResponseUser;
	text: string;
	createdAt: string;
	currentUserId?: number;
	onRemove: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({ id, user, text, createdAt, currentUserId, onRemove }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	// @ts-ignore
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickRemove = async () => {
		if (window.confirm("Delete comment?")) {
			try {
				await Api().comment.remove(id);
				onRemove(id);
			} catch (err: any) {
				console.warn("❌ERROR remove comment: ", err);
				alert("Failed to delete comment");
			} finally {
				handleClose();
			}
		}
	};

	return (
		<div className={styles.comment}>
			<div className={styles.userInfo}>
				<Avatar>{user.fullName.split(" ")[0][0]}{user.fullName.split(" ")[0][1]}</Avatar>
				<b>{user.fullName}</b>
				<span>{createdAt}</span>
			</div>
			<Typography className={styles.text}>
				{text}
			</Typography>
			{user.id === currentUserId &&
          <><IconButton onClick={handleClick}>
              <MoreIcon/>
          </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  elevation={2}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  keepMounted>
                  <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
                  <MenuItem onClick={handleClose}>Редактировать</MenuItem>
              </Menu></>
			}
		</div>
	);
};