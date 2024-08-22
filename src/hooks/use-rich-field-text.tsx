import React, { ChangeEvent, useState } from 'react'

const useRichFieldText = (): [string, (e: ChangeEvent<HTMLTextAreaElement>) => void] => {
    const [value, setValue] = useState('');

    function valueHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.innerHTML);
      }
  
    return [value, valueHandler]
}

export default useRichFieldText



