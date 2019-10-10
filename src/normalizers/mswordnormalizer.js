/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module paste-from-office/normalizers/mswordnormalizer
 */

import { parseHtml } from '../filters/parse';
import { transformListItemLikeElementsIntoLists } from '../filters/list';
import { replaceImagesSourceWithBase64 } from '../filters/image';
import removeBoldWrapper from '@dolphiq/ckeditor5-paste-from-documents/src/filters/removeboldwrapper'
import UpcastWriter from '@ckeditor/ckeditor5-engine/src/view/upcastwriter';

const msWordMatch1 = /<meta\s*name="?generator"?\s*content="?microsoft\s*word\s*\d+"?\/?>/i;
const msWordMatch2 = /xmlns:o="urn:schemas-microsoft-com/i;
const libreOfficeMatch = /<meta\s*name="?generator"?\s*content="?libreoffice\s*\d+.*?"?\/?>/i

/**
 * Normalizer for the content pasted from Microsoft Word.
 *
 * @implements module:paste-from-office/normalizer~Normalizer
 */
export default class MSWordNormalizer {
	/**
	 * @inheritDoc
	 */
	isActive( htmlString ) {
		return msWordMatch1.test( htmlString ) || msWordMatch2.test( htmlString ) || libreOfficeMatch.test( htmlString );
	}

	/**
	 * @inheritDoc
	 */
	execute( data ) {
		const { body, stylesString } = parseHtml( data.dataTransfer.getData( 'text/html' ) );

		transformListItemLikeElementsIntoLists( body, stylesString );
		replaceImagesSourceWithBase64( body, data.dataTransfer.getData( 'text/rtf' ) );
/*
		console.log(body, body.childNodes);
        for ( const child of body.getChildren() ) {
            console.log('child', child, child.outerHTML, child.nodeValue);
        }*/
		data.content = body;

        // const writer = new UpcastWriter();
        // console.log('data.content', data.content, body.innerHTML);
        // removeBoldWrapper( data.content, writer );


	}
}
