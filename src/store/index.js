import { createStore } from 'vuex'

// import user from "./modules/user";
import auth from './modules/auth'

export default createStore({
	modules: {
		auth,
	},
})
