import React, { useState } from "react"
import "./TypeFilter.css"

interface IProps {
    types:string[];
    shownTypes: string[] |undefined;
    setShownTypes: any;
}

 const TypeFilter = ({types, shownTypes, setShownTypes}:IProps) => {
    const [isVisible, setVisibility] = useState<boolean>(false);

        const handleTypeToggle = (typeT : string) => {
            console.log("Type: ", typeT);
            console.log("Shown types: ", shownTypes);

            if (shownTypes?.includes(typeT)) {
                setShownTypes(shownTypes!.filter(el => el !== typeT))
                console.log("Removed ", typeT)
            } else {
                setShownTypes([...shownTypes!, typeT]);
                console.log("Added ", typeT)
            }
        }

        return <aside className="TypeFilter__Container">
            <div 
                className="TypeFilter__TopToggler"
                onClick={() => setVisibility(!isVisible)}>
                <h3>Filter</h3>
            </div>
            <div className={`TypeFilter__Dropdown ${!isVisible && "TypeFilter__Dropdown--Hidden"}`}>
                { types.map(type => 
                    <span 
                        className="TypeFilter__TypeSpan" 
                        key={type}
                        onClick={ 
                            () => handleTypeToggle(type)
                        }>
                        <div className={`TypeFilter__TypeYesBox ${shownTypes?.includes(type) && "TypeFilter__TypeYesBox--Yes"} `}> </div>
                        <p className={`TypeFilter__Type ${shownTypes?.includes(type) && "TypeFilter__Type--Yes"} `}>{type}</p>
                    </span>
                )}
            </div>
        </aside>
}

export default TypeFilter;