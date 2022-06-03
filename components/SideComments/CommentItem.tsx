import React from "react";
import Link from "next/link";

import styles from "./SideComments.module.scss";
import { PostItem, ResponseUser } from "../../utils/api/types";
import { Avatar } from "@material-ui/core";

interface CommentItemProps {
	user: ResponseUser;
	text: string;
	post: PostItem;
}

export const CommentItem: React.FC<CommentItemProps> = ({user, text, post}) => {
	return (
		<div className={styles.commentItem}>
			<div className={styles.userInfo}>
				<Avatar>{user.fullName.split(" ")[0][0]}{user.fullName.split(" ")[0][1]}</Avatar>
				<Link href={`/profile/${user.id}`}>
					<a>
						<b>{user.fullName}</b>
					</a>
				</Link>
			</div>
			<p className={styles.text}>{text}</p>
			<Link href={`/news/${post.id}`}>
				<a>
					<span className={styles.postTitle}>{post.title}</span>
				</a>
			</Link>
		</div>
	);
};