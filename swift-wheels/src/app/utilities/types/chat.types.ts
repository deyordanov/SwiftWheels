//types
import { Dispatch, SetStateAction } from "react";

export type propTypes = {
    isChatModalOpen: boolean;
    setIsChatModalOpen: Dispatch<SetStateAction<boolean>>;
    chat: any;
};
