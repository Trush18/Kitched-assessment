import React from "react";
import "./Avatar.css"

interface UserProps {
    name: string;
    id: number;
    image: string;
}

const Avatar: React.FC<UserProps> = ({ name, id, image }) => {
    return (
        <div className="user-avatar">
            <img src={image} alt={`${name}-${id}`} className="avatar-image" />
            <p className="user-name">{name}</p>
        </div>
    )

}
export default Avatar;