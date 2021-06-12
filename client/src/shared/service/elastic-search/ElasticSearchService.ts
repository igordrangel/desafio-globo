import axios from "axios";

export const apiElasticSearch = axios.create({
	baseURL: 'https://run.mocky.io/v3'
});

export class ElasticSearchService {
	
	public getCpuUsage() {
		return apiElasticSearch.get<{
			data: number[];
			labels: string[];
		}>(`/b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f`);
	}
	
	public memoryUsage() {
		return apiElasticSearch.get<{
			data: number[];
			labels: string[];
		}>(`/d23c3262-967e-4567-b7f6-2fd263748811`);
	}
	
	public statusCluster() {
		return apiElasticSearch.get<{status: "green"|"red";}>(`/cab2791c-7c85-4461-b95c-86bc1a12dc72`);
	}
}
