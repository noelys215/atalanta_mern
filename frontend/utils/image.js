import client from './client';
import imageUrlBuilder from '@sanity/image-url';

function urlForThumbnail(source) {
	return imageUrlBuilder(client).image(source).width(300).height(300);
}

function urlFor(source) {
	return imageUrlBuilder(client).image(source).width(1944).height(1944);
}

export { urlForThumbnail, urlFor };
