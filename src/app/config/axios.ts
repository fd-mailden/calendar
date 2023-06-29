import Axios from 'axios';

import {API_BASE_URL} from 'shared/config/variables';

const axiosInstance = Axios.create({
	baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export const axios = axiosInstance;
