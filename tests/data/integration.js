/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ShiftEnter from '@ckeditor/ckeditor5-enter/src/shiftenter';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import List from '@ckeditor/ckeditor5-list/src/list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Table from '@ckeditor/ckeditor5-table/src/table';
import env from '@ckeditor/ckeditor5-utils/src/env';

import Pastefromdocuments from '../../src/pastefromdocuments';
import { generateTests } from '../_utils/utils';

const browsers = [ 'chrome', 'firefox', 'safari', 'edge' ];

describe( 'PasteFromOffice - integration', () => {
	generateTests( {
		input: 'basic-styles',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Heading, Bold, Italic, Underline, Strikethrough, Pastefromdocuments ]
		},
		skip: {
			safari: [ 'italicStartingText', 'multipleStylesSingleLine', 'multipleStylesMultiline' ] // Skip due to spacing issue (#13).
		}
	} );

	generateTests( {
		input: 'image',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Image, Table, Pastefromdocuments ]
		},
		skip: {
			chrome: ( env.isEdge ? [ 'adjacentGroups' ] : [] ),
			firefox: ( env.isEdge ? [ 'adjacentGroups' ] : [] ),
			safari: ( env.isEdge ? [ 'adjacentGroups' ] : [] ),
			edge: ( env.isEdge ? [] : [ 'adjacentGroups' ] )
		}
	} );

	generateTests( {
		input: 'link',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Heading, Bold, Link, ShiftEnter, Pastefromdocuments ]
		},
		skip: {
			safari: [ 'combined' ] // Skip due to spacing issue (#13).
		}
	} );

	generateTests( {
		input: 'list',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Heading, Bold, Italic, Underline, Link, List, Pastefromdocuments ]
		},
		skip: {
			safari: [ 'heading3Styled' ] // Skip due to spacing issue (#13).
		}
	} );

	generateTests( {
		input: 'spacing',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Bold, Italic, Underline, Pastefromdocuments ]
		}
	} );

	generateTests( {
		input: 'google-docs-bold-wrapper',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, Bold, Pastefromdocuments ]
		}
	} );

	generateTests( {
		input: 'google-docs-list',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, List, Pastefromdocuments ]
		}
	} );

	generateTests( {
		input: 'generic-list-in-table',
		type: 'integration',
		browsers,
		editorConfig: {
			plugins: [ Clipboard, Paragraph, List, Table, Bold, Pastefromdocuments ]
		}
	} );
} );
