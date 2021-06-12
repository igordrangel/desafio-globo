import { FC } from "react";
import { ChartPropsInterface } from "../chart-props.interface";
import { ResponsiveLine } from '@nivo/line';
import "../chart-styles.css";

export const ChartLine: FC<ChartPropsInterface> = (props) => {
	
	return (
		<div className="chart-content">
			<ResponsiveLine
				data={props.data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					ticksPosition: 'after',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: props.bottomLegend,
					legendOffset: 36,
					legendPosition: 'middle'
				}}
				axisLeft={{
					ticksPosition: 'before',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: props.leftLegend,
					legendOffset: -40,
					legendPosition: 'middle'
				}}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</div>
	);
}
