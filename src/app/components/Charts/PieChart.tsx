'use client';
import React from 'react';
import {
  CircularChart3D,
  PieSeries3D,
  CircularChartDataLabel3D,
  CircularChartLegend3D,
  CircularChartTooltip3D,
  CircularChartHighlight3D,
  CircularChart3DComponent,
  CircularChart3DSeriesCollectionDirective,
  CircularChart3DSeriesDirective,
  Inject
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

// Sample data for the chart
export let data1 = [
  { x: 'Canada', y: 46, text: 'Canada: 46' },
  { x: 'Hungary', y: 30, text: 'Hungary: 30' },
  { x: 'Germany', y: 79, text: 'Germany: 79' },
  { x: 'Mexico', y: 13, text: 'Mexico: 13' },
  { x: 'China', y: 56, text: 'China: 56' },
  { x: 'India', y: 41, text: 'India: 41' },
  { x: 'Bangladesh', y: 25, text: 'Bangladesh: 25' },
  { x: 'United States', y: 32, text: 'United States: 32' },
  { x: 'Belgium', y: 34, text: 'Belgium: 34' }
];

const SAMPLE_CSS = `
  .control-fluid {
    padding: 0px !important;
  }`;

const PieSeries = () => {
  // Handle chart load event
  const onChartLoad = (args: any) => {
    const chart = document.getElementById('charts');
    if (chart) {
      chart.setAttribute('title', '');
    }
  };

  // Handle chart theme load
  const load = (args: any) => {
    let selectedTheme: string = location.pathname.split('/').slice(-1)[0];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
      .replace(/-dark/i, 'Dark')
      .replace(/contrast/i, 'Contrast');
  };

  return (
    <div className='control-pane text-white'>
      <style>{SAMPLE_CSS}</style>
      <div className='control-section'>
        <CircularChart3DComponent
          id='charts'
          style={{ textAlign: 'center' }}
          legendSettings={{ visible: false }}
          tilt={-45}
          enableRotation={true}
          load={load}
          title='Berlin 2023 Special Olympics Gold Medals'
          loaded={onChartLoad}
          tooltip={{
            enable: true,
            format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>",
            header: ''
          }}
        >
          <Inject services={[
            PieSeries3D,
            CircularChartDataLabel3D,
            CircularChartLegend3D,
            CircularChartTooltip3D,
            CircularChartHighlight3D
          ]} />
          <CircularChart3DSeriesCollectionDirective>
            <CircularChart3DSeriesDirective
              dataSource={data1}
              xName='x'
              yName='y'
              explode={true}
              innerRadius='0%'
              radius={Browser.isDevice ? '45%' : '75%'}
              explodeOffset={Browser.isDevice ? '10%' : '30%'}
              dataLabel={{
                visible: true,
                position: 'Outside',
                name: 'x',
                font: { fontWeight: '600' },
                connectorStyle: {
                  length: Browser.isDevice ? '20px' : '40px'
                }
              }}
            />
          </CircularChart3DSeriesCollectionDirective>
        </CircularChart3DComponent>
      </div>
    </div>
  );
};

export default PieSeries;
