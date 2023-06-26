import WorkoutPlanAdder from "../../L2/ElementAdderComponents/WorkoutPlanAdder";
import PageContentWrapper from "../../L2/PageContentWrapper";
import { useState } from "react";
const ElementAdder = () => { 
    const [elementTypeWorkout,setElementTypeWorkout] = useState(true);
    return (<PageContentWrapper><div>{elementTypeWorkout && <WorkoutPlanAdder/>}</div></PageContentWrapper>);
}

export default ElementAdder;
