import MealPlanAdder from "../../L2/ElementAdderComponents/MealPlanAdder";
import WorkoutPlanAdder from "../../L2/ElementAdderComponents/WorkoutPlanAdder";
import PageContentWrapper from "../../L2/PageContentWrapper";
import { useState } from "react";
const ElementAdder = ({setImage}) => { 
    const [elementTypeWorkout,setElementTypeWorkout] = useState(true);

    const backgroundImageUrl = require('./../../../addContent.jpg');
    setImage(backgroundImageUrl);
    return (<PageContentWrapper><div>{elementTypeWorkout && <WorkoutPlanAdder/>} <MealPlanAdder/></div></PageContentWrapper>);
    
}

export default ElementAdder;
