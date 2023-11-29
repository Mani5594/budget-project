import dynamic from 'next/dynamic'

const Odometer = dynamic(() => import("react-odometerjs"), {
    ssr: false,
    loading: () => <>0</>,
})

interface AmountDisplayProps {
    value: number;
}

const AmountDisplay: React.FC<AmountDisplayProps>  = ({value}) => {
    return <Odometer value={value} format="ddddd" />;
    // return <Odometer format="(,ddd).dd" duration={1000} value={value} theme='default'  />

}       


export default AmountDisplay;