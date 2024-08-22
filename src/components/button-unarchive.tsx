import React from 'react'
import { useLocale } from '@/hooks/use-locale'
import { localeData } from '@/utils/locale'
import { toast } from 'react-toastify';
import { unarchiveNote } from '@/utils/api';
import useToastOptions from '@/hooks/use-toast-options';
import { useRouter } from 'next/router';

interface Props{
    noteId: string
}

const ButtonUnarchive: React.FC<Props> = ({noteId}) => {
    const {locale} = useLocale();
    const localeWords = localeData[locale.toLowerCase()]
    const toastOptions = useToastOptions()
    const router = useRouter()

    async function onArchive(){
        const response = await unarchiveNote(noteId)

        toast[response.error ? 'error' : 'success'](response.error ? localeWords.toast_archive_error : localeWords.toast_archive_success, toastOptions)
    
        if(!response.error){
            router.push('/')
        }
    }

    return (
    <button onClick={onArchive} className='flex justify-center items-center border py-2 px-4 my-4'>{localeWords.button_active}</button>
  )
}

export default ButtonUnarchive