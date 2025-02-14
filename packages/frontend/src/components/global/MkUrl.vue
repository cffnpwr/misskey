<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<component
	:is="self ? 'MkA' : 'a'"
	ref="rootEl"
	:class="$style.root"
	class="_link"
	:[attr]="self ? props.url.substring(local.length) : props.url"
	:rel="rel ?? 'nofollow noopener'"
	:target="target"
	:behavior="props.navigationBehavior"
	@contextmenu.stop="() => {}"
>
	<template v-if="!self">
		<span :class="$style.schema">{{ schema }}//</span>
		<span :class="$style.hostname">{{ hostname }}</span>
		<span v-if="port !== ''">:{{ port }}</span>
	</template>
	<template v-if="pathname === '/' && self">
		<span :class="$style.self">{{ hostname }}</span>
	</template>
	<span v-if="pathname !== ''" :class="$style.pathname">{{ self ? pathname.substring(1) : pathname }}</span>
	<span :class="$style.query">{{ query }}</span>
	<span :class="$style.hash">{{ hash }}</span>
	<i v-if="target === '_blank'" :class="$style.icon" class="ti ti-external-link"></i>
</component>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, shallowRef } from 'vue';
import { toUnicode as decodePunycode } from 'punycode/';
import { url as local } from '@/config.js';
import { popup } from '@/os.js';
import { useTooltip } from '@/scripts/use-tooltip.js';
import { safeURIDecode } from '@/scripts/safe-uri-decode.js';
import { isEnabledUrlPreview } from '@/instance.js';
import MkA, { type MkABehavior } from '@/components/global/MkA.vue';

const props = withDefaults(defineProps<{
	url: string;
	rel?: string;
	showUrlPreview?: boolean;
	navigationBehavior?: MkABehavior;
}>(), {
	showUrlPreview: true,
});

const self = props.url.startsWith(local);
const url = new URL(props.url);
if (!['http:', 'https:'].includes(url.protocol)) throw new Error('invalid url');

const rootEl = shallowRef<HTMLAnchorElement | InstanceType<typeof MkA> | null>(null);
const anchorElement = computed(() => {
	if (rootEl.value == null) return null;
	if (rootEl.value instanceof HTMLAnchorElement) return rootEl.value;
	return rootEl.value.getAnchorElement();
});

useTooltip(anchorElement, (showing) => {
	if (props.showUrlPreview && isEnabledUrlPreview.value && anchorElement.value != null) {
		const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkUrlPreviewPopup.vue')), {
			showing,
			url: props.url,
			source: anchorElement.value,
		}, {
			closed: () => dispose(),
		});
	}
});

const schema = url.protocol;
const hostname = decodePunycode(url.hostname);
const port = url.port;
const pathname = safeURIDecode(url.pathname);
const query = safeURIDecode(url.search);
const hash = safeURIDecode(url.hash);
const attr = self ? 'to' : 'href';
const target = self ? null : '_blank';
</script>

<style lang="scss" module>
.root {
	word-break: break-all;
}

.icon {
	padding-left: 2px;
	font-size: .9em;
}

.self {
	font-weight: bold;
}

.schema {
	opacity: 0.5;
}

.hostname {
	font-weight: bold;
}

.pathname {
	opacity: 0.8;
}

.query {
	opacity: 0.5;
}

.hash {
	font-style: italic;
}
</style>
