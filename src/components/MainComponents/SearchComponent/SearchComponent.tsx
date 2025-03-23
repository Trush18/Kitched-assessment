import React, { useCallback, useEffect, useRef, useState } from "react";
import CollectionCard from "../../SubComponents/CollectionCardComponent/CollectionCard";
import { searchSuggestions, User, usersData } from "../../../data";
import Avatar from "../../SubComponents/AvatarComponent/Avatar";
import "./SearchComponent.css";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import useDebounce from "../../../customHooks";

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResult, setSearchResult] = useState<User[]>(usersData);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [suggestionResult, setSuggestionResult] = useState<string[]>([]);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // custom debounce hook for efficient search
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // fitering through data while searching from searchbar
    const handleFilter = useCallback((term: string) => {
        const keyword = term.toLowerCase();
        const results = usersData.filter((user) =>
            [user.name, user.cuisine, user.collectionCategory].some((value) =>
                typeof value === "string" && value.toLowerCase().includes(keyword)
            )
        );
        setSearchResult(results);
        setLoading(false);
    }, []);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setLoading(true);

        const matchedSuggestions = value ? searchSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        ) : [];
        setSuggestionResult(matchedSuggestions);
        setShowSuggestions(!!matchedSuggestions);
    };
    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setLoading(true);
        const matchedResults = usersData.filter((user) =>
            [user.name, user.cuisine, user.collectionCategory].some((value) =>
                typeof value === "string" && value.toLowerCase().includes(suggestion.toLowerCase())
            )
        );
        setSearchResult(matchedResults);
        setLoading(false);
        setShowSuggestions(false);
    };

    useEffect(() => {
        // closing search suggestion dropdown when clicked outside
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleFilter(debouncedSearchTerm);
        } else {
            setSearchResult(usersData); // Reseting to initial data if no search term
            setLoading(false);
        }
    }, [debouncedSearchTerm, handleFilter]);
    return (
        <main className="search-page">
            <section>
                <div ref={searchRef} className="searchbar">
                    <input value={searchTerm} aria-label="search bar" type="text" placeholder="Search recipes..." onChange={(event) => handleInputChange(event)} />
                    <span className="search-icon"><FaSearch /></span>
                    {suggestionResult.length > 0 && showSuggestions && !loading &&
                        (<div className="suggestions-box">
                            {suggestionResult.map((suggestion, index) =>
                                //using index as a value of key while looping is not ideal. However, I don't have any id rightnow so used it temporary.
                                <div key={index} onClick={() => handleSuggestionClick(suggestion)} className="search-suggestion-wrapper">
                                    <div className="search-suggestion">
                                        <span><FaSearch /></span>
                                        <span>{suggestion}</span>
                                    </div>
                                    <span className="search-cancel"><FaX /></span>
                                </div>)}
                        </div>)}
                </div>
                {loading && (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                )}
                {!loading && searchResult.length > 0 ?
                    (
                        <>
                            <section className="collection-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Kitched <span className="kitched-red">Collection</span></h3>
                                </div>
                                {searchResult.map(item =>
                                    <CollectionCard key={item.id} tiles={true} title={item.collectionCategory} recipeCount={item.recipeCount} />
                                )}
                            </section>
                            <section className="creators-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Cookby <span className="kitched-red">Creator</span></h3>
                                </div>
                                <div className="creators">
                                    {searchResult.map(creator =>
                                        <Avatar key={creator.id} name={creator.name} id={creator.id} image={creator.avatar} />
                                    )}
                                </div>
                            </section>
                            <section className="cuisine-wrapper">
                                <div className="header-wrapper">
                                    <h3 className="kitched-heading">Cookby <span className="kitched-red">Cuisine</span></h3>
                                </div>
                                {searchResult.map(item =>
                                    <CollectionCard key={item.id} tiles={false} title={item.cuisine} recipeCount={item.recipeCount} />
                                )}
                            </section>
                        </>
                    )
                    :
                    searchResult.length === 0 && !loading && <div> No results found. Try searching another item</div>
                }
            </section>
        </main>
    )

}
export default SearchPage;