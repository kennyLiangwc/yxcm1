export default (state = {},action) => {
    switch(action.type) {
        case "GET_ROLELIST":
            return {
                ...state,
                roleList: action.payload
            }
        default:
            return state
    }
}