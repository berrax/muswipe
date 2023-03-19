import contentfulInstance from './contentful.instance';

export class ContentfulServices {
	static getContent(query: string) {
		return contentfulInstance.post('/', {
			query,
		});
	}
}
