/**
 * External dependencies.
 */
import { get, kebabCase } from 'lodash';
import { registerStore, dispatch } from '@wordpress/data';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import store from '@gutenberg/store';
import BlockEdit from '@gutenberg/components/block-edit';
import BlockSave from '@gutenberg/components/block-save';
import transformFieldsToAttributes from '@gutenberg/utils/transform-fields-to-attributes';

/**
 * Register the store.
 */
registerStore('carbon-fields', store);

/**
 * Register the blocks.
 */
let definitions = {};

get(window.cf, 'preloaded.blocks', []).forEach((container) => {
	const name = kebabCase(container.id).replace('carbon-fields-container-', '');
	const attributes = transformFieldsToAttributes(container);

	definitions[name] = container.fields;

	registerBlockType(`carbon-fields/${name}`, {
		category: 'common',
		title: container.title,
		edit: BlockEdit,
		save: BlockSave,
		attributes,
		supports: {
			alignWide: false,
			anchor: false,
			html: false
		}
	});
});

/**
 * Load the definitions in store.
 */
dispatch('carbon-fields').setupFieldDefinitions(definitions);
