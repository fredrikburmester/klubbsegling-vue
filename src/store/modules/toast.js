import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const toast = (msg, type = 'success', timeout = 3000, position = 'bottom-right') => {
	createToast(msg, {
		type: type,
		timeout: timeout,
		position: position,
	})
}

export default { toast }
