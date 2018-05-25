export default (state = {},action) => {
	switch(action.type) {
		case "ADD_USER_INFO":
			return {
				id: action.info.uid,
				name: action.info.nickname
			}
		default: 
			return state
	}
}