import React, { FC, useEffect, useState } from "react";
import { ChartLine } from "../../shared/components/chart/line";
import "./styles.css";
import { ElasticSearchService } from "../../shared/service/elastic-search/ElasticSearchService";

export const Dashboard: FC = () => {
	const [cpuData, setCpuData] = useState<any[]>([]);
	const [memoryData, setMemoryData] = useState<any[]>([]);
	const [statusClusterData, setStatusClusterData] = useState<'green'|'red'>("red");
	
	useEffect(() => {
		const elasticSearchService = new ElasticSearchService();
		Promise.all([
			elasticSearchService.getCpuUsage(),
			elasticSearchService.memoryUsage(),
			elasticSearchService.statusCluster()
		]).then(([cpuUsageResponse, memoryUsageResponse, statusClusterResponse]) => {
			setCpuData([
				{
					id: 'CPU Usage',
					color: "hsl(212,80%,42%)",
					data: cpuUsageResponse.data.data.map((value, index) => {
						return {
							x: cpuUsageResponse.data.labels[index],
							y: value
						}
					})
				}
			]);
			
			setMemoryData([
				{
					id: 'Memory Usage',
					color: "hsl(212,80%,42%)",
					data: memoryUsageResponse.data.data.map((value, index) => {
						return {
							x: memoryUsageResponse.data.labels[index],
							y: value
						}
					})
				}
			]);
			
			setStatusClusterData(statusClusterResponse.data.status);
		});
	}, [])
	
	return (
		<section>
			<div className="status">
				<h2>Status do Cluster</h2>
				<h3 className={statusClusterData}>{statusClusterData === "green" ? 'ONLINE' : 'OFFLINE'}</h3>
			</div>
			<div className="charts">
				<div className="chart">
					<h2>Uso de CPU</h2>
					<ChartLine data={cpuData} leftLegend="Uso (%)" bottomLegend="Tempo"/>
				</div>
				<div className="chart">
					<h2>Uso de Memória</h2>
					<ChartLine data={memoryData} leftLegend="Uso (%)" bottomLegend="Tempo"/>
				</div>
			</div>
		</section>
	);
}
