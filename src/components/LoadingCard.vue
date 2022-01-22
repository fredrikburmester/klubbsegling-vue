
<template>
	<div>
		<div class="border border-blue-300 shadow-xl rounded-2xl p-4 h-56 mt-4 w-full mx-auto">
			<div class="animate-pulse flex">
				<div class="flex flex-col">
					<div class="mx-4 h-2 bg-gray-300 rounded w-32 mt-8"></div>
					<div class="mx-4 h-2 bg-gray-300 rounded w-64 mt-8"></div>
					<div class="mx-4 h-12 w-24 bg-gray-300 rounded-lg mt-8"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoadingCard',
}
</script>
