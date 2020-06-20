/* eslint-disable no-unused-vars */
import React , {useEffect , useState} from 'react';
import { async } from 'q';
import Recipie from './recipies';
import './App.css';
import Heading from './heading';


const App = ()=>{
    const APP_ID = '94aa7f77';
    const APP_KEY = 'c94236edd90adab70bce04fce6a6db42';

    const [recipies,setrecipies] = useState([]);
    let [search,setSearch] = useState("");
    let [query,setQuery] = useState('Choclate');
    
    
    useEffect(()=>{
       getrecipies();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query]);

    const getrecipies = async ()=>{
        let response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        let data = await response.json();
        setrecipies(data.hits)
        console.log(data);

    }

    const updateSearch = e =>{
            setSearch(e.target.value);
            // console.log(search);
    }

    const updatequery = e =>{
        e.preventDefault();
        setQuery(search)
    }

        return (

            <div className="App">
                <Heading />
                <form className="search-form" onSubmit={updatequery}>
                    <input className="serach-bar" type="text" value={search} onChange={updateSearch} placeholder="Search here  e.g:- Soups, Chicken , pudding, etc" />
                    <input type="submit" value="Search" />
                </form>
                <div className="recipies">

               
                        {recipies.map(recipie=>(
                            <Recipie key = {recipie.recipe.label} title={recipie.recipe.label} image={recipie.recipe.image} calories={recipie.recipe.calories}
                            ingredients ={recipie.recipe.ingredients} />
                        ))}
                 </div>
            </div>
        )
    
}
export default App;
