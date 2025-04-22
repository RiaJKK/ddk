/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const FilteredValuesContext = createContext({});

const FilteredValuesState = ({ children }) => {
  const [choosenFilters, setChosenFilters] = useState([]);
    
    return (
        <FilteredValuesContext.Provider value={{ choosenFilters, setChosenFilters }}>
            {children}
        </FilteredValuesContext.Provider>
    );
};

export default FilteredValuesState;
