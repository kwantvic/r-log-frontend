import React from "react";
import { Button, Input } from "@material-ui/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import styles from "./WriteForm.module.scss";
import { Api } from "../../utils/api";
import { PostItem } from "../../utils/api/types";

// todo: 💊editor ts error
// @ts-ignore
const Editor = dynamic(() => import("../Editor").then((m) => m.Editor), { ssr: false });

interface WriteFormProps {
	data?: PostItem;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [title, setTitle] = React.useState(data?.title || "");
	const [blocks, setBlocks] = React.useState(data?.body || []);

	const onAddPost = async () => {
		try {
			setIsLoading(true);
			const obj = {
				title,
				body: blocks,
			};
			if (!data) {
				const post = await Api().post.create(obj);
				await router.push(`/write/${post.id}`);
			} else {
				await Api().post.update(data.id, obj);
			}
		} catch (err: any) {
			console.warn("❌post creation error: ", err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<Input value={title}
			       onChange={(e) => setTitle(e.target.value)}
			       classes={{ root: styles.titleField }}
			       placeholder="Title"/>
			<div className={styles.editor}>
				<Editor initialBlocks={data?.body} onChange={arr => setBlocks(arr)}/>
			</div>
			<Button onClick={onAddPost} disabled={isLoading || !blocks.length || !title} variant="contained" color="primary">
				{data ? "Save" : "Publish"}
			</Button>
		</div>
	);
};