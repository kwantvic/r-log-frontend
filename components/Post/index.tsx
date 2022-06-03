import React from "react";
import Link from "next/link";
import { Paper, Typography } from "@material-ui/core";
import Image from "next/image";

import styles from "./Post.module.scss";
import { PostActions } from "../PostActions";

interface PostProps {
	title: string;
	id: number;
	description: string;
	imageUrl?: string;
}

export const Post: React.FC<PostProps> = ({ title, description, id, imageUrl }) => {
	return (
		<Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
			<Typography variant="h5" className={styles.title}>
				<Link href={`/news/${id}`}>
					<a>
						{title}
					</a>
				</Link>
			</Typography>
			<Typography className="mt-10 mb-15">
				{description}
			</Typography>
			{imageUrl && (
				<Image
					src="https://cdn-icons-png.flaticon.com/512/5149/5149112.png"
					height={500}
					width={500}
					alt="pictures"
				/>
			)}
			<PostActions/>
		</Paper>
	);
};