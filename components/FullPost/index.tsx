import { Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import { PostActions } from "../PostActions";
import MessageIcon from "@material-ui/icons/TextsmsOutlined";
import UserAddIcon from "@material-ui/icons/PersonAddOutlined";

import styles from "./FullPost.module.scss";
import Image from "next/image";
import { OutputData } from "@editorjs/editorjs";

interface FullPostProps {
	title: string;
	blocks: OutputData["blocks"];
}

export const FullPost: React.FC<FullPostProps> = ({ title, blocks }) => {
	return (
		<Paper elevation={0} className={styles.paper}>
			<div className="container">
				<Typography variant="h4" className={styles.title}>
					{title}
				</Typography>
				<div className={styles.text}>
					{
						blocks.map((obj) => (
							<Typography key={obj.id} dangerouslySetInnerHTML={{__html: obj.data.text}}/>
						))
					}
					<div style={{ width: 250, marginLeft: -14 }}>
						<PostActions/>
					</div>
					<div className="d-flex justify-between align-center mt-30 mb-30">
						<div className={styles.userInfo}>
							<Image
								src="https://cdn-icons-png.flaticon.com/512/2810/2810488.png"
								width={25} height={25} alt="User avatar"/>
							<b>Donnie Darko</b>
							<span>+1685</span>
						</div>
						<div>
							<Button variant="contained" className="mr-15">
								<MessageIcon/>
							</Button>
							<Button variant="contained">
								<UserAddIcon/>
								<b className="ml-10">Подписаться</b>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Paper>
	);
};