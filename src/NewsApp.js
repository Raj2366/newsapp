import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a CSS file for styling

const API_KEY = "c65745a42f1748929f6091fa31907940";
const url = "https://newsapi.org/v2/everything?q=";

function NewsApp() {
    const [articles, setArticles] = useState([]); // Initialize as an empty array
    const [query, setQuery] = useState('India');
    const [curSelectedNav, setCurSelectedNav] = useState(null);

    useEffect(() => {
        fetchNews(query);
    }, [query]);

    const fetchNews = async (searchQuery) => {
        try {
            const res = await fetch(`${url}${searchQuery}&apiKey=${API_KEY}`);
            const data = await res.json();
            if (data.articles) {
                setArticles(data.articles); // Set articles if the response is valid
            } else {
                setArticles([]); // Set articles to an empty array if the response is invalid
            }
        } catch (error) {
            console.error("Error fetching the news:", error);
            setArticles([]); // Set articles to an empty array in case of an error
        }
    };

    const handleNavItemClick = (id) => {
        setQuery(id);
        setCurSelectedNav(id);
    };

    const handleSearch = () => {
        const searchQuery = document.getElementById("search-text").value;
        if (!searchQuery) return;
        setQuery(searchQuery);
        setCurSelectedNav(null);
    };

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li 
                            id="Politics" 
                            className={curSelectedNav === 'Politics' ? 'active' : ''}
                            onClick={() => handleNavItemClick('Politics')}
                        >
                            Politics
                        </li>
                        <li 
                            id="Business" 
                            className={curSelectedNav === 'Business' ? 'active' : ''}
                            onClick={() => handleNavItemClick('Business')}
                        >
                            Business
                        </li>
                        <li 
                            id="Sports" 
                            className={curSelectedNav === 'Sports' ? 'active' : ''}
                            onClick={() => handleNavItemClick('Sports')}
                        >
                            Sports
                        </li>
                        {/* Add more nav items here */}
                    </ul>
                </nav>
                <div>
                    <input type="text" id="search-text" placeholder="Search news..." />
                    <button id="search-button" onClick={handleSearch}>Search</button>
                </div>
            </header>

            <div id="cards-container">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        article.urlToImage && (
                            <div key={index} className="news-card" onClick={() => window.open(article.url, "_blank")}>
                                <img src={article.urlToImage} alt="news" id="news-img" />
                                <div>
                                    <h3 id="news-title">{article.title}</h3>
                                    <p id="news-desc">{article.description}</p>
                                    <p id="news-source">
                                        {article.source.name} · {new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })}
                                    </p>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <p>No articles available.</p> // Show a message if no articles are available
                )}
            </div>
        </div>
    );
}

export default NewsApp;
