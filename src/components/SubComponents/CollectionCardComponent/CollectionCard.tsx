import React from "react";
import "./CollectionCard.css"

interface CollectionProps {
    title: string;
    recipeCount: number;
    tiles: boolean;
}

const CollectionCard: React.FC<CollectionProps> = ({ title, recipeCount, tiles }) => {
    return (
        <div className="collections-card">
            <div className="image-wrapper">
                <div className="img-col-1">
                    <img src="../../../../images/weekend-dinner-1.png" alt="img1" />
                </div>
                {tiles &&
                    (<div className="img-col-2">
                        <img src="../../../../images/weekend-dinner-2.png" alt="img2" />
                        <img src="../../../../images/weekend-dinner-3.png" alt="img3" />
                    </div>)
                }

            </div>
            <div className="collection-description">
                <h3>{title}</h3>
                <p>{recipeCount} Recipes</p>
            </div>
        </div>
    )
}
export default CollectionCard;