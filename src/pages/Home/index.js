import BarChart from "./components/BarChart"


const Home = () => {
    return (
        <div>
            <BarChart title={'三大框架满意度'} data_x={['Angular', 'Vue', 'React']} />
            <BarChart title={'三大框架使用度'} data_x={['Vue', 'Angular', 'React']} />
        </div>
    )
}

export default Home