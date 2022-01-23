<template>
	<div class="flex space-x-4 mb-4 m-0">
		<label for="register-modal" class="btn btn-primary text-base-content modal-button">
			Lägg till båt
		</label>
		<input id="register-modal" type="checkbox" class="modal-toggle" />
		<div class="modal m-0">
			<div class="modal-box m-0">
				<p>Välj båt att lägga till:</p>
				<div>
					<select
						v-model="selectedBoat"
						class="select select-bordered select w-full max-w-xs mt-4"
					>
						<option disabled value="Välj båt">Välj båt</option>
						<option v-for="b in allBoats" :key="b.id" :value="b">
							{{ b.name }}
						</option>
					</select>
				</div>

				<div class="modal-action flex justify-start">
					<label for="register-modal" class="btn btn-primary" @click="addBoat"
						>Lägg till</label
					>
					<label for="register-modal" class="btn">Avbryt</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { addBoatToUser } from '../api/addBoatToUser'
import { API_URL } from '../store/actions/auth'
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
	name: 'AddBoatForm',
	props: {
		userboats: {
			type: Array,
			required: true,
		},
	},
	emits: ['boats'],
	data() {
		return {
			userBoats: this.userboats,
			allBoats: [],
			selectedBoat: '',
			me: this.$store.getters.getProfile,
		}
	},
	async mounted() {
		try {
			const response = await axios.get(`${API_URL}/boats`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('jwt')}`,
				},
			})
			this.allBoats = response.data
			this.selectedBoat = this.allBoats[0]
		} catch (err) {
			if (process.env.NODE_ENV === 'development') {
				console.error(err)
			}
		}
	},
	methods: {
		addBoat() {
			// Add boats to user via api request
			// Send the new boats to parent compoennt to show the new boat in the table
			addBoatToUser(this.userBoats, this.selectedBoat, this.me)
				.then((boat) => {
					createToast(`${boat.name} tillagd!`, {
						type: 'success',
						timeout: 3000,
						position: 'top-right',
					})
					this.$emit('newBoat', boat)
				})
				.catch((err) => {
					if (process.env.NODE_ENV === 'development') {
						console.error(err)
					}
					createToast(err, {
						type: 'danger',
						timeout: 3000,
						position: 'top-right',
					})
				})
		},
	},
}
</script>
