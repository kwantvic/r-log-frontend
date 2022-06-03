import React from "react";
import {Button} from "@material-ui/core";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, FormProvider} from "react-hook-form";
import {setCookie} from "nookies";

import {registerFormSchema} from "../../../utils/schemas/registerValidation";
import FormField from "../../FormField";
import {UserApi} from "../../../utils/api/user";
import {CreateUserDto} from "../../../utils/api/types";
import Alert from "@mui/material/Alert";
import { setUserData } from "../../../redux/slices/user";
import { useAppDispatch } from "../../../redux/hooks";

interface IRegisterFormProps {
	onOpenRegister: () => void,
	onOpenLogin: () => void
}

const RegisterForm: React.FC<IRegisterFormProps> = ({onOpenRegister, onOpenLogin}) => {
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = React.useState("");
	const form = useForm({
		mode: "onChange",
		resolver: yupResolver(registerFormSchema)
	})

	const onSubmit = async (dto: CreateUserDto) => {
		try {
			const data = await UserApi.register(dto);
			setCookie(null, "authToken", data.token, {
				maxAge: 30 * 24 * 60 * 60,
				path: '/'
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
					<FormField name="fullName" label="First name and Last name"/>
					<FormField name="email" label="Email"/>
					<FormField name="password" label="Password"/>
					{errorMessage && <Alert className="mb-20" severity="error">{errorMessage}</Alert>}
					<div className="d-flex align-center justify-between">
						<Button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit"
						        onClick={onOpenRegister} color="primary"
						        variant="contained">
							Register
						</Button>
						<Button onClick={onOpenLogin} color="primary" variant="text">
							Login
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default RegisterForm;