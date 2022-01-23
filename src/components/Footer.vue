<template>
	<footer class="p-10 footer bg-base-200 text-base-content footer-center">
		<div class="grid grid-flow-col gap-4">
			<a class="link link-hover">About us</a>
			<a class="link link-hover">Contact</a>
		</div>
		<div>
			<div class="text-sm breadcrumbs">
				<ul>
					<li>
						<router-link to="/">
							<font-awesome-icon icon="home" class="mr-2" />Hem
						</router-link>
					</li>
					<li v-for="r in $route.meta.breadcrumbs" :key="r.name">
						<router-link :to="r.path">
							<font-awesome-icon :icon="r.icon" class="mr-2" />{{ r.name }}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div>
			<p>Copyright © 2022 - All right reserved by Fredrik Burmester</p>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
}
</script>
