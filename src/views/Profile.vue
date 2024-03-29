<template>
    <div v-if="!loading" class="wrapper w-full max-w-2xl justify-self-center grid px-6 mb-16">
        <div v-if="profilePictureLoaded" class="avatar px-6 pt-12 justify-self-center" @click="openChangeProfileModal">
            <div class="mb-8 rounded-full w-32 h-32">
                <img :src="profilePicture" />
            </div>
        </div>
        <div v-else class="avatar placeholder px-6 pt-12 justify-self-center" @click="openChangeProfileModal">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-32 h-32">
                <span class="text-3xl">{{ me.firstName[0] }}</span>
            </div>
        </div>

        <input type="checkbox" id="changeProfileModal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <form id="form">
                    <label for="file-upload" class="btn" disabled>Välj bild</label>

                    <input class="hidden" type="text" name="ref" value="api::user.user" />
                    <input class="hidden" type="text" name="refId" :value="me.id" />
                    <input class="hidden" type="text" name="field" value="profilePicture" />
                    <input class="hidden" id="file-upload" name="files" type="file" @change="showImageName" />
                </form>
                <p class="text-black">{{ imageName || '' }}</p>
                <div class="modal-action">
                    <label for="changeProfileModal" class="btn btn-primary" @click="upload">Ladda upp</label>
                    <label for="changeProfileModal" class="btn">Avbryt</label>
                </div>
            </div>
        </div>

        <h2 class="card-title text-2xl text-center mt-4">{{ me.firstName }} {{ me.lastName }}</h2>
        <p class="text-center">
            {{ me.about || null }}
        </p>
        <h1 class="mt-4 font-bold">Mina Båtar:</h1>
        <BoatCard v-for="b in userBoats" :key="b.id" :boat="b" />

        <AddBoatForm @boat="updateBoats" class="mt-4" :userboats="userBoats" @newBoat="onNewBoat" />
        <button class="btn btn-error" @click="logout">Logga ut</button>
    </div>
    <LoadingArticle v-else />
</template>

<script>
import { AUTH_LOGOUT } from '../store/actions/auth'
import { API_URL } from '../store/actions/auth'
import { uploadProfilePicture, getUserBoats } from '../api/API'
import AddBoatForm from '../components/AddBoatForm.vue'
import BoatCard from '../components/BoatCard.vue'
import LoadingCard from '@/components/LoadingCard.vue'
import LoadingAvatar from '@/components/LoadingAvatar.vue'
import LoadingArticle from '@/components/LoadingArticle.vue'

export default {
    components: {
        AddBoatForm,
        BoatCard,
        LoadingCard,
        LoadingAvatar,
        LoadingArticle,
    },
    data() {
        return {
            me: this.$store.getters.getProfile,
            loading: true,
            userBoats: [],
            imageLoading: true,
            imageName: '',
            profilePictureLoaded: false,
            profilePictureUrl: '',
        }
    },
    async mounted() {
        await this.updateBoats()
        this.loading = false
    },
    methods: {
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT).then(() => {
                if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl)
                } else {
                    this.$router.push('/')
                }
            })
        },
        async updateBoats() {
            await getUserBoats(this.me.id).then(boats => {
                this.userBoats = boats
            })
        },
        getOwnerName(boat) {
            // return boat.owner.name
            if (!!boat.owner) {
                return boat.owner.name
            } else {
                return 'No owner'
            }
        },
        getBoatImage(boat) {
            if (!!boat.image) {
                return `${API_URL}${boat.image.url}`
            } else {
                this.imageLoading = false
                return null
            }
        },
        imageLoaded() {
            this.imageLoading = false
        },
        openChangeProfileModal() {
            var checkbox = document.getElementById('changeProfileModal')
            checkbox.checked = !checkbox.checked
        },
        showImageName(e) {
            const filename = e.srcElement.value.split('\\').pop()
            this.imageName = filename
        },
        upload() {
            const formElement = document.querySelector('form')
            const image = document.getElementById('file-upload')
            const formData = new FormData(formElement)

            for (var [key, value] of formData.entries()) {
            }
            uploadProfilePicture(formData).then(res => {})
        },
    },
}
</script>
<style>
@media (max-width: 640px) {
    #logout {
        width: 90vw;
        margin-left: 5vw;
        left: 0;
    }
}
</style>
