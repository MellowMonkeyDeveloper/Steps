import Breakdown from "../dropdown/Breakdown";

interface DopamineBreakdownProps{
    data: any;
}
export default function DopamineBreakdown({data}: DopamineBreakdownProps){
    return(
        <Breakdown data={data} type='Dopamine' />
    )
}