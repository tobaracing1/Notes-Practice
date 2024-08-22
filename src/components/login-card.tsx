import React, { FormEvent } from "react";
import { localeData } from "@/utils/locale";
import { useLocale } from "@/hooks/use-locale";
import { LocaleDataType } from "@/utils/locale";
import useFieldText from "@/hooks/use-field-text";
import {toast, ToastContainer} from 'react-toastify'
import useToastOptions from "@/hooks/use-toast-options";
import { login } from "@/utils/api";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import { publicPath, authPath } from "@/utils/utils";

const LoginCard = () => {
  const { locale } = useLocale();
  const localeWords: LocaleDataType = localeData[locale.toLowerCase()];
  const toastOptions = useToastOptions();
  const { setAuth } = useAuth()
  const router = useRouter()

  const [email, onChangeEmail] = useFieldText();
  const [password, onChangePassword] = useFieldText();

  const  onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const {data, error, message} = await login({email, password});
      console.log
      toast[error ? 'error' : 'success'](message, toastOptions)

      if(!error){
        setAuth({data})
        router.push(authPath.index)
      }
      else{
        router.push(publicPath.login)
      }

    }catch(error){

    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center py-4 w-full border gap-y-4"
    >

      <h2 className="text-2xl font-semibold">{localeWords.navigation_login}</h2>

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

      <input type="submit" value={localeWords.navigation_login} className="w-full rounded-full border font-semibold cursor-pointer py-2 px-4"/>
    </form>
  );
};

export default LoginCard;
