export function removeExtraBreaks( htmlString ) {
    // Run normalizeSafariSpaceSpans() two times to cover nested spans.
    return htmlString//.replace( /<o:p><\/o:p>/g, '' )
        .replace(/<p[^>]*><span[^>]*><\/span><\/p>/gi, '')
            .replace(/<span[^>]*><\/span>/gi, '')
            .replace(/<o:p><\/o:p>/gi, '')
            .replace(/<p[^>]*><i[^>]*><\/i><\/p>/g, '')
            .replace(/<p[^>]*><b[^>]*><\/b><\/p>/g, '')
            .replace(/<\/b><\/p><p[^>]*>/g, '<\/b><br>') // use BR after b line
            .replace(/<\/i><\/p><p[^>]*>/g, '<\/i><br>') // use BR after i line

        + '';
}
