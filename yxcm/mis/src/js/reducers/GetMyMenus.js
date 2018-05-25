export default (state = [],action) => {
    switch(action.type) {
        case "GET_MY_MENUS":
            return action.menus
        default:
            return state
    }
}