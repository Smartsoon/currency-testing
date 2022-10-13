import React, {useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface IToastify {
    errorText: string | null
}

const Toastify: React.FC<IToastify> = ({errorText}) => {

    useEffect(() => {
        if (!errorText) return
        toast(errorText, {
            type: 'error',
            autoClose: 5000,
            position: "top-right",
            containerId: 'notifications'
        });
    }, [errorText])


    return (
        <ToastContainer enableMultiContainer
                        containerId={'notifications'}
                        pauseOnHover={false}
                        limit={1}/>
    );
}

export default Toastify