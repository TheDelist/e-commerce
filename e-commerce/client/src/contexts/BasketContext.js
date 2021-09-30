import React, { createContext, useContext ,useState} from 'react'
import { useEffect } from 'react';
const BasketContext=createContext();
const defaultContext=JSON.parse(localStorage.getItem("basket"))||[];
const BasketProvider=({children})=>{
    const [items, setitems] = useState(defaultContext);
    useEffect(() => {
      localStorage.setItem("basket",JSON.stringify(items));
    }, [items])
    const addToBasket=(data,findItem)=>{
        if(!findItem){
           return setitems((prev)=>[data,...prev]);
        }
        const filtered=items.filter((item)=>item._id!==findItem._id)
        setitems(filtered);
    }
    const removeFromBasket=(data_id)=>{
        const filtered=items.filter((item)=>item._id!==data_id);
       setitems(filtered);
    }
    const emptyBasket=()=>{
        setitems([]);
    }
    const values={
        items,
        setitems,
        addToBasket,
        removeFromBasket,
        emptyBasket,
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}
const useBasket=()=>useContext(BasketContext);
export {
    useBasket,
    BasketProvider
};
