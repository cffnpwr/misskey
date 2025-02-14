<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><MkPageHeader v-model:tab="tab" :actions="headerActions" :tabs="headerTabs"/></template>
	<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
		<FormSuspense :p="init">
			<template v-if="tab === 'block'">
				<MkTextarea v-model="blockedHosts">
					<span>{{ i18n.ts.blockedInstances }}</span>
					<template #caption>{{ i18n.ts.blockedInstancesDescription }}</template>
				</MkTextarea>
			</template>
			<template v-else-if="tab === 'silence'">
				<MkTextarea v-model="silencedHosts">
					<span>{{ i18n.ts.silencedInstances }}</span>
					<template #caption>{{ i18n.ts.silencedInstancesDescription }}</template>
				</MkTextarea>
				<MkTextarea v-model="mediaSilencedHosts">
					<span>{{ i18n.ts.mediaSilencedInstances }}</span>
					<template #caption>{{ i18n.ts.mediaSilencedInstancesDescription }}</template>
				</MkTextarea>
			</template>
			<MkButton primary @click="save"><i class="ti ti-device-floppy"></i> {{ i18n.ts.save }}</MkButton>
		</FormSuspense>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import MkButton from '@/components/MkButton.vue';
import MkTextarea from '@/components/MkTextarea.vue';
import FormSuspense from '@/components/form/suspense.vue';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import { fetchInstance } from '@/instance.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';

const blockedHosts = ref<string>('');
const silencedHosts = ref<string>('');
const mediaSilencedHosts = ref<string>('');
const tab = ref('block');

async function init() {
	const meta = await misskeyApi('admin/meta');
	blockedHosts.value = meta.blockedHosts.join('\n');
	silencedHosts.value = meta.silencedHosts.join('\n');
	mediaSilencedHosts.value = meta.mediaSilencedHosts.join('\n');
}

function save() {
	os.apiWithDialog('admin/update-meta', {
		blockedHosts: blockedHosts.value.split('\n') || [],
		silencedHosts: silencedHosts.value.split('\n') || [],
		mediaSilencedHosts: mediaSilencedHosts.value.split('\n') || [],

	}).then(() => {
		fetchInstance(true);
	});
}

const headerActions = computed(() => []);

const headerTabs = computed(() => [{
	key: 'block',
	title: i18n.ts.block,
	icon: 'ti ti-ban',
}, {
	key: 'silence',
	title: i18n.ts.silence,
	icon: 'ti ti-eye-off',
}]);

definePageMetadata(() => ({
	title: i18n.ts.instanceBlocking,
	icon: 'ti ti-ban',
}));
</script>
