import {toast} from "react-hot-toast";

const successMsg = (msg: string) => toast.success(msg, {duration: 4000});

const errorMsg = (msg: string) => toast.error(msg, {duration: 4000});

export {successMsg, errorMsg};
