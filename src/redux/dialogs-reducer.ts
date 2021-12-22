const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogsType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name:"Alex"},
        {id: 2, name:"Tom"},
        {id: 3, name:"Marry"},
        {id: 4, name:"Lisa"},
        {id: 5, name:"Kate"},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message:'Hi'},
        {id: 2, message:"Buy"},
        {id: 3, message:"You so funny"},
        {id: 4, message:"Fuck you anyway"},
        {id: 5, message:"I love you"},
    ] as Array<MessagesType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export let sendMessageCreator = (newMessageBody: string):SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;