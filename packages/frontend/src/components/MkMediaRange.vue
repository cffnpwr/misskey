<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<!-- Media系専用のinput range -->
<template>
<div :style="props.sliderBgWhite ? '--sliderBg: rgba(255, 255, 255, 0.25);' : '--sliderBg: var(--scrollbarHandle);'">
	<div :class="$style.controlsSeekbar">
		<progress
			:class="$style.buffer"
			:value="bufferRef"
			min="0"
			max="1"
		>
			{{ Math.round(bufferRef * 100) }}% buffered
		</progress>
		<input
			v-model="rangeModel"
			:class="$style.seek"
			:style="{
				'--value': `${rangeRef * 100}%`,
			}"
			type="range"
			min="0"
			max="1"
			step="any"
			@change="emit('dragEnded', rangeRef)"
		/>
	</div>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	buffer?: number;
	sliderBgWhite?: boolean;
}>(), {
	buffer: undefined,
	sliderBgWhite: false,
});

const emit = defineEmits<{
	dragEnded: [value: number];
}>();

const bufferRef = computed(() => props.buffer || 0);

const rangeModel = defineModel<string | number>({ required: true });
const rangeRef = computed({
	get: () => {
		if (typeof rangeModel.value !== 'number') {
			return parseFloat(rangeModel.value) || 0;
		}
		return rangeModel.value || 0;
	},
	set: v => {
		rangeModel.value = v;
	},
});
</script>

<style lang="scss" module>
.controlsSeekbar {
	position: relative;
}

.seek {
	position: relative;
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	border: 0;
	border-radius: 26px;
	color: var(--accent);
	display: block;
	height: 19px;
	margin: 0;
	min-width: 0;
	padding: 0;
	transition: box-shadow 0.3s ease;
	width: 100%;

	&::-webkit-slider-runnable-track {
		background-color: var(--sliderBg);
		background-image: linear-gradient(to right, currentColor var(--value, 0), transparent var(--value, 0));
		border: 0;
		border-radius: 99rem;
		height: 5px;
		transition: box-shadow 0.3s ease;
		user-select: none;
	}

	&::-moz-range-track {
		background: transparent;
		border: 0;
		border-radius: 99rem;
		height: 5px;
		transition: box-shadow 0.3s ease;
		user-select: none;
		background-color: var(--sliderBg);
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		background: #fff;
		border: 0;
		border-radius: 100%;
		box-shadow: 0 1px 1px rgba(35, 40, 47, 0.15), 0 0 0 1px rgba(35, 40, 47, 0.2);
		height: 13px;
		margin-top: -4px;
		position: relative;
		transition: all 0.2s ease;
		width: 13px;

		&:active {
			box-shadow: 0 1px 1px rgba(35, 40, 47, 0.15), 0 0 0 1px rgba(35, 40, 47, 0.15), 0 0 0 3px rgba(255, 255, 255, 0.5);
		}
	}

	&::-moz-range-thumb {
		background: #fff;
		border: 0;
		border-radius: 100%;
		box-shadow: 0 1px 1px rgba(35, 40, 47, 0.15), 0 0 0 1px rgba(35, 40, 47, 0.2);
		height: 13px;
		position: relative;
		transition: all 0.2s ease;
		width: 13px;

		&:active {
			box-shadow: 0 1px 1px rgba(35, 40, 47, 0.15), 0 0 0 1px rgba(35, 40, 47, 0.15), 0 0 0 3px rgba(255, 255, 255, 0.5);
		}
	}

	&::-moz-range-progress {
		background: currentColor;
		border-radius: 99rem;
		height: 5px;
	}
}

.buffer {
	appearance: none;
	background: transparent;
	color: var(--sliderBg);
	border: 0;
	border-radius: 99rem;
	height: 5px;
	left: 0;
	margin-top: -2.5px;
	padding: 0;
	position: absolute;
	top: 50%;
	width: 100%;

	&::-webkit-progress-bar {
		background: transparent;
	}

	&::-webkit-progress-value {
		background: currentColor;
		border-radius: 100px;
		min-width: 5px;
		transition: width 0.2s ease;
	}

	&::-moz-progress-bar {
		background: currentColor;
		border-radius: 100px;
		min-width: 5px;
		transition: width 0.2s ease;
	}
}
</style>
