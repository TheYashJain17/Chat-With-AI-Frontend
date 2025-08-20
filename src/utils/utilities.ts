import { AxiosError } from "axios";
import {toast} from "react-hot-toast";

const successMsg = (msg: string) => toast.success(msg, {duration: 4000});

const errorMsg = (msg: string) => toast.error(msg, {duration: 4000});

const extractErrorMessage = (error: unknown): string => {

    const err = error as AxiosError<{message: string}>;

    return err.response?.data?.message ?? err?.message;

}

export {successMsg, errorMsg, extractErrorMessage};
