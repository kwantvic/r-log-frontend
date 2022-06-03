import React, { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Paper, Button, IconButton, Avatar, List, ListItem } from "@material-ui/core";
import {
	SearchOutlined as SearchIcon,
	SmsOutlined as MessageIcon,
	Menu as MenuIcon,
	NotificationsNoneOutlined as NotificationIcon,
	AccountCircleOutlined as UserIcon,
	ExpandMoreOutlined as ArrowBottom,
} from "@material-ui/icons";

import styles from "./Header.module.scss";
import { AuthDialog } from "../AuthDialog";
import logoR from "../../public/static/img/logo.svg";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { ListItemButton } from "@mui/material";
import { PostItem } from "../../utils/api/types";
import { Api } from "../../utils/api";

export const Header: React.FC = () => {
	const userData = useAppSelector(selectUserData);
	const [authVisible, setAuthVisible] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState("");
	const [posts, setPosts] = React.useState<PostItem[]>([]);

	const openAuthDialog = () => {
		setAuthVisible(true);
	};

	const closeAuthDialog = () => {
		setAuthVisible(false);
	};

	React.useEffect(() => {
		if (authVisible && userData) {
			setAuthVisible(false);
		}
	}, [authVisible, userData]);

	const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		try {
			const {items} = await Api().post.search({ title: e.target.value });
			setPosts(items);
		} catch (err: any) {
			console.warn("❌ERROR: ", err);
		}
	};

	return (
		<Paper classes={{ root: styles.root }} elevation={0}>
			<div className={styles.left}>
				<IconButton>
					<MenuIcon/>
				</IconButton>
				<Link href="/">
					<a>
						<Image
							src={logoR}
							alt="Logo"
							height={30}
							width={30}
						/>
					</a>
				</Link>
				<div className={styles.searchBlock}>
					<SearchIcon/>
					<input value={searchValue} onChange={handleChangeInput} placeholder="Search..."/>
					{(posts.length > 0 && searchValue) &&
              <Paper className={styles.searchBlockPopup}>
                  <List>
										{
											posts.map((obj) => (
												<Link key={obj.id} href={`/news/${obj.id}`}>
													<a>
														<ListItem onClick={() => setSearchValue("")} button>
															{obj.title}
														</ListItem>
													</a>
												</Link>
											))
										}
                  </List>
              </Paper>}
				</div>
				<Link href="/write">
					<a>
						<Button variant="contained" className={styles.penButton}>
							New post
						</Button>
					</a>
				</Link>
			</div>
			<div className={styles.right}>
				<IconButton>
					<MessageIcon/>
				</IconButton>
				<IconButton>
					<NotificationIcon/>
				</IconButton>
				{userData ? (
					<Link href="/profile/1">
						<a className="d-flex align-center">
							<Avatar
								className={styles.avatar}
								alt="avatar"
								src="https://cdn-icons-png.flaticon.com/512/7652/7652498.png"
							/>
							<ArrowBottom/>
						</a>
					</Link>) : (
					<div className={styles.loginButton} onClick={openAuthDialog}>
						<UserIcon/>
						Login
					</div>
				)}
			</div>
			<AuthDialog onClose={closeAuthDialog} visible={authVisible}/>
		</Paper>
	);
};