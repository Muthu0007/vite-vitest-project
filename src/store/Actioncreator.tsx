import { ADD_INPUT } from "./ActionTypes"

export const add_input = (input:string) =>( {
    type: ADD_INPUT,
    payload:input
})