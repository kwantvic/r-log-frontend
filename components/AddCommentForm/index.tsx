import React from "react";
import Input from "@material-ui/core/Input";

import styles from "./AddCommentForm.module.scss";
import { Button } from "@material-ui/core";
import { Api } from "../../utils/api";
import { CommentItem } from "../../utils/api/types";

interface AddCommentFormProps {
	postId: number;
	onSuccessAdd: (obj: CommentItem) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, onSuccessAdd }) => {
	const [clicked, setClicked] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [text, setText] = React.useState("");

	const onAddComment = async () => {
		try {
			setIsLoading(true);
			const comment = await Api().comment.create({
				postId,
				text,
			});
			onSuccessAdd(comment);
			setClicked(false);
			setText("");
		} catch (err: any) {
			console.warn("❌ERROR add comment: ", err);
			alert("Error submitting comment");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.form}>
			<Input onChange={e => setText(e.target.value)} value={text} onFocus={() => setClicked(true)}
			       disabled={isLoading}
			       minRows={clicked ? 5 : 1} classes={{ root: styles.fieldRoot }} placeholder="Write a comment..."
			       fullWidth multiline/>
			{clicked && <Button onClick={onAddComment} className={styles.addButton} disabled={isLoading}
                          variant="contained" color="primary">
          Publish
      </Button>}
		</div>
	);
};