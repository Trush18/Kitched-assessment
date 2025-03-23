import React, { useEffect, useRef, useState } from "react";
import CollectionCard from "../../SubComponents/CollectionCardComponent/CollectionCard";
import { searchSuggestions, User, usersData } from "../../../data";
import Avatar from "../../SubComponents/AvatarComponent/Avatar";
import "./SearchComponent.css";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResult, setSearchResult] = useState<User[]>(usersData);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    // const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
    const [suggestionResult, setSuggestionResult] = useState<string[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleFilter = (term: string) => {
        const keyword = term.toLowerCase();
        const results = usersData.filter((user) =>
            [user.name, user.cuisine, user.collectionCategory].some((value) => value.toLocaleLowerCase().includes(keyword))
        );
        setSearchResult(results);
        // setShowSearchbar(false);
        // setShowSuggestions(false);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        const matchedSuggestion = searchSuggestions.filter(suggestion => suggestion.toLowerCase().includes(value))
        setSuggestionResult(matchedSuggestion);
        setShowSuggestions(true);

    };
    // const handleClickSearch = () => {
    //     setShowSuggestions(true);
    // }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                // setShowSearchbar(false);
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        handleFilter(searchTerm)
    }, [searchTerm])
    return (
        <div className="search-page">
            <section>
                <div ref={searchRef} className="searchbar">
                    <input type="text" placeholder="Search recipes..." onChange={(event) => handleInputChange(event)} />
                    <span className="search-icon"><FaSearch /></span>
                    {suggestionResult.length > 0 && showSuggestions ? <div className="suggestions-box">
                        {suggestionResult.map(suggestion =>
                            <div className="search-suggestion-wrapper">
                                <div className="search-suggestion" onClick={() => handleFilter(suggestion)}>
                                    <span><FaSearch /></span>
                                    <span>{suggestion}</span>
                                </div>
                                <span className="search-cancel"><FaX /></span>
                            </div>)}
                    </div> : <></>}
                </div>
                {searchResult.length > 0 ?
                    (
                        <>
                            <div className="collection-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Kitched <span className="kitched-red">Collection</span></h3>
                                    {/* <button className="show-all-button">Show all</button> */}
                                </div>
                                {searchResult.map(item =>
                                    <CollectionCard tiles={true} title={item.collectionCategory} recipeCount={item.recipeCount} />
                                )}
                            </div>
                            <div className="creators-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Cookby <span className="kitched-red">Creator</span></h3>
                                    {/* <button className="show-all-button">Show all</button> */}
                                </div>
                                <div className="creators">
                                    {searchResult.map(creator =>
                                        <Avatar name={creator.name} id={creator.id} image={creator.avatar} />
                                    )}
                                </div>
                            </div>
                            <div className="cuisine-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Cookby <span className="kitched-red">Cuisine</span></h3>
                                    {/* <button className="show-all-button">Show all</button> */}
                                </div>
                                {searchResult.map(item =>
                                    <CollectionCard tiles={false} title={item.cuisine} recipeCount={item.recipeCount} />
                                )}
                            </div>
                        </>
                    )
                    :
                    <div>No results</div>
                }
            </section>
        </div>
    )

}
export default SearchPage;