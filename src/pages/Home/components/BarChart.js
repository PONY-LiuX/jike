//柱状图组件

//1 功能代码放入组件

//2 可变部分抽象成prop参数


import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title, data_x }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        //渲染后保证dom可用，再进行图表的渲染

        //1.获取需要渲染的dom节点
        const chartDom = chartRef.current;

        //2.图表初始化  生成图表实例
        const myChart = echarts.init(chartDom);

        //3. 准备图标参数
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: data_x
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 40, 70],
                    type: 'bar'
                }
            ]
        };

        //4.使用参数，完成图表的渲染
        option && myChart.setOption(option);

    }, [title, data_x])


    // 渲染需要元素有宽高
    return < div
        ref={chartRef} style={{ width: '500px', height: '400px' }}>
    </div>

}

export default BarChart
