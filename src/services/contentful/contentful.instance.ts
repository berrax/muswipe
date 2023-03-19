import axios from 'axios';

const ContentfulApiClient = () => {
	const defaultOptions = {
		baseURL: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + process.env.CONTENTFUL_DELIVERY_API,
		},
	};
	const instance = axios.create(defaultOptions);

	instance.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			console.log(`Contentful response error`, error);
		},
	);

	return instance;
};

export default ContentfulApiClient();
