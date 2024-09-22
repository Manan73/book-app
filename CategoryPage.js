import React from 'react';
import { useNavigate } from 'react-router-dom';
import FictionIcon from './images/Fiction.svg';
import DramaIcon from './images/Drama.svg';
import HumourIcon from './images/Humour.svg';
import PoliticsIcon from './images/Politics.svg';
import PhilosophyIcon from './images/Philosophy.svg';
import AdventureIcon from './images/Adventure.svg';
import HistoryIcon from './images/History.svg';
import NextIcon from './images/Next.svg';
import Pattern from './images/Pattern.svg'

const categories = [ { name: 'Fiction', icon: FictionIcon },
    { name: 'Drama', icon: DramaIcon },
    { name: 'Humour', icon:  HumourIcon},
    { name: 'Politics', icon:  PoliticsIcon},
    { name: 'Philosophy', icon: PhilosophyIcon},
    { name: 'Adventure', icon: AdventureIcon},
    { name: 'History', icon: HistoryIcon},
];

const CategoryPage = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

 
    const handleCategoryClick = (cat) => {
        navigate('/books', { state: { category: cat.name } }); // Pass the category name
    };

    return (
   
    <div style={{textAlign:'center',
        backgroundImage: `url(${Pattern})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'}}>
            <h1 style={{color:"#5E56E7", fontFamily:"Montserrat", fontSize:"48px"}}>Gutenberg Project</h1>
            <h3 style={{color:"black", fontFamily:"Montserrat", fontSize:"16px"}}>A social cataloging website that allows you to
freely search its database of books,
annotations, and reviews.</h3>

            <div style={{display: 'grid',
    width: '250px',
    gridTemplateColumns: '1fr',
    //justifyItems: 'center', 
    alignItems: 'center',
    gap: '10px', }}>
                {categories.map((cat) => (
                    <button style={{
                        borderRadius: "4px",  // Corrected property name
                        paddingRight: "10px", // Corrected property name
                        height: "50px",
                        boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
                        fontSize:"20px",
                        fontFamily:"Montserrat bold"
                    }}  key={cat} onClick={() => handleCategoryClick(cat)}>
                          {cat.icon && (
                            <img src={cat.icon} alt={cat.name} style={{ marginRight: '8px', height: '24px', float:'left'}} />
                        )}
                         <span style={{fontSize:'20px', fontWeight:'bold', float:'left'}}>{cat.name}</span>
                         <img src={NextIcon} style={{width:'24px', height:'24px', float:'right'}}/>
                    </button>
                ))}
            </div>
            </div>
        
    );
};

export default CategoryPage;



