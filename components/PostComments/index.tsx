import React from "react";
import { Divider, Paper, Tab, Tabs, Typography } from "@material-ui/core";

import styles from "./PostComments.module.scss";
import { Comment } from "../Comment";
import { AddCommentForm } from "../AddCommentForm";
import { CommentItem } from "../../utils/api/types";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { useComments } from "../../hooks/useComments";

interface PostCommentsProps {
	postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
	const userData = useAppSelector(selectUserData);
	const [activeTab, setActiveTab] = React.useState(0);
	const {comments, setComments} = useComments(postId);

	const onAddComment = (obj: CommentItem) => {
		setComments((prev) => [...prev, obj]);
	};

	const onRemoveComment = (id: number) => {
		setComments((prev) => prev.filter((obj) => obj.id !== id));
	};

	return (
		<Paper className={styles.wrapper} elevation={0}>
			<div className="container">
				<Typography className={styles.title} variant="h6">
					Comments
				</Typography>
				<Tabs onChange={(_, newValue) => setActiveTab(newValue)} className={styles.tabs} value={activeTab}
				      indicatorColor="primary" textColor="primary">
					<Tab label="Popular"/>
					<Tab label="In order"/>
				</Tabs>
				<Divider/>
				{userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId}/>}
				<div className={styles.commentsBlock}/>
				{
					comments.map(obj => <Comment key={obj.id} id={obj.id} user={obj.user} text={obj.text}
					                             createdAt={obj.createdAt}
					                             onRemove={onRemoveComment} currentUserId={userData?.id}/>)
				}
			</div>
		</Paper>
	);
};