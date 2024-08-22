import React, { FormEvent } from "react";
import { localeData } from "@/utils/locale";
import { useLocale } from "@/hooks/use-locale";
import { LocaleDataType } from "@/utils/locale";
import useFieldText from "@/hooks/use-field-text";
import { toast, ToastContainer } from "react-toastify";
import useToastOptions from "@/hooks/use-toast-options";
import { register } from "@/utils/api";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { publicPath, authPath } from "@/utils/utils";

const RegisterCard = () => {
  const { locale } = useLocale();
  const localeWords: LocaleDataType = localeData[locale.toLowerCase()];
  const toastOptions = useToastOptions();
  const router = useRouter();

  const [email, onChangeEmail] = useFieldText();
  const [password, onChangePassword] = useFieldText();
  const [name, onChangeName] = useFieldText();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error, message } = await register({
        name,
        email,
        password,
      });
      toast[error ? "error" : "success"](message, toastOptions);

      router.push(publicPath.login);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center py-4 w-full border gap-y-4"
    >
      <ToastContainer />

      <h2 className="text-2xl font-semibold">
        {localeWords.navigation_register}
      </h2>
      <input
        className="w-full py-2 px-4 bg-transparent focus:border "
        type="name"
        name="name"
        id="name"
        defaultValue={name}
        onChange={onChangeName}
        placeholder={localeWords.dialog_name_placeholder}
        required
      />
      <input
        className="w-full py-2 px-4 bg-transparent focus:border "
        type="email"
        name="email"
        id="email"
        defaultValue={email}
        onChange={onChangeEmail}
        placeholder={localeWords.dialog_email_placeholder}
        required
      />
      <input
        className="w-full py-2 px-4 bg-transparent focus:border "
        type="password"
        name="password"
        id="password"
        defaultValue={password}
        onChange={onChangePassword}
        placeholder={localeWords.dialog_password_placeholder}
        autoComplete="off"
        required
      />

      <input
        type="submit"
        value={localeWords.navigation_register}
        className="w-full rounded-full border font-semibold cursor-pointer py-2 px-4"
      />
    </form>
  );
};

export default RegisterCard;
