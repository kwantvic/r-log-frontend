import { GetServerSidePropsContext, NextPageContext } from "next";
import Cookies, { parseCookies } from "nookies";
import axios from "axios";

import { UserApi } from "./user";
import { PostApi } from "./post";
import { CommentApi } from "./comment";

export type ApiReturnType = {
	user: ReturnType<typeof UserApi>;
	post: ReturnType<typeof PostApi>;
	comment: ReturnType<typeof CommentApi>;
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
	const cookies = ctx ? Cookies.get(ctx) : parseCookies();
	const token = cookies.authToken;

	const instance = axios.create({
		// baseURL: typeof window === "undefined" ? publicRuntimeConfig.API_NODE_URL : publicRuntimeConfig.API_CLIENT_URL,
		baseURL: "http://localhost:8888/",
		headers: {
			Authorization: "Bearer " + token,
		},
	});

	const apis = {
		user: UserApi,
		post: PostApi,
		comment: CommentApi,
	};

	const result = Object.entries(apis).reduce((prev, [key, f]) => {
		return {
			...prev,
			[key]: f(instance),
		};
	}, {} as ApiReturnType);

	// return {
	// 	user: UserApi(instance),
	// 	post: PostApi(instance),
	// };
	return result;
};