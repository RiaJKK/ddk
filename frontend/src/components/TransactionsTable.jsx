import React, { useEffect, useState, useContext } from 'react';
import { getTransactions } from '../api/transactions';
import { FilteredValuesContext } from '../../context/FilteredValuesContext';

 
const TransactionsTable = () => {
    const [filteredData, SetFilteredData] = useState([]);
    const [data, setData] = useState([]);

    const {choosenFilters} = useContext(FilteredValuesContext);


    useEffect(() => {
        getTransactions().then((data) => {
            if (choosenFilters.length === 0) {
                SetFilteredData(data);
            } else {
                const filtered = data.filter(item => {
                    return choosenFilters.some(fval => {
                        console.log(choosenFilters)
                        console.log(fval.categories)
                        console.log(item.category)
                        console.log(fval.categories.includes(item.category))
                        return (
                            (fval.categories && item.category && fval.categories.includes(item.category)) ||
                            (fval.subcategory && item.subcategory && fval.subcategory.includes(item.subcategory)) ||
                            (fval.status && item.status && fval.status.includes(item.status)) ||
                            (fval.transaction_type && item.transaction_type && fval.transaction_type.includes(item.transaction_type))
                        );
                    });
                });
                console.log(filtered)
                SetFilteredData(filtered);
            }
        });
    }, [choosenFilters]);

    

    return ( 
    <>
        <div></div>
        <table>
            <thead>
            </thead>
            <tbody>
                {filteredData.map(item => (
                    <tr key={item.id}>
                        <td>{item.status}</td>
                        <td>{item.category}</td>
                        <td>{item.subcategory}</td>
                        <td>{item.transaction_type}</td>
                        <td>{item.comment}</td>
                        <td>{item.amount}</td>
                        <td>{item.created_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </> );
}
 
export default TransactionsTable;