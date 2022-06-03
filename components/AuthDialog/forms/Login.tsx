import React from "react";
import { Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "nookies";

import { loginFormSchema } from "../../../utils/schemas/loginValidation";
import FormField from "../../FormField";
import { LoginDto } from "../../../utils/api/types";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";
import { Api } from "../../../utils/api";

interface ILoginFormProps {
	onOpenRegister: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onOpenRegister }) => {
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = React.useState("");
	const form = useForm({
		mode: "onChange",
		resolver: yupResolver(loginFormSchema),
	});

	const onSubmit = async (dto: LoginDto) => {
		try {
			const data = await Api().user.login(dto);
			setCookie(null, "authToken", data.token, {
				maxAge: 30 * 24 * 60 * 60,
				path: "/",
			});
			setErrorMessage("");
			dispatch(setUserData(data));
		} catch (err: any) {
			console.warn("❌Registration error", err);
			if (err.response) {
				setErrorMessage(err.response.data.message);
			}
		}
	};

	return (
		<div>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField name="email" label="Email"/>
					<FormField name="password" label="Password"/>
					{errorMessage && <Alert className="mb-20" severity="error">{errorMessage}</Alert>}
					<div className="d-flex align-center justify-between">
						<Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" color="primary"
						        variant="contained">
							Login
						</Button>
						<Button onClick={onOpenRegister} color="primary" variant="text">
							Register
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default LoginForm;