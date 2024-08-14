import { useState, useEffect } from "react";

export default function Home({ user }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user object is valid to determine login status
        if (user && user.firstname && user.lastname) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);

    return (
        <div className="welcome-container">
            {isLoggedIn ? (
                <div>
                    <h1>Welcome {user.firstname} {user.lastname}</h1>
                    <p>You have successfully logged in. Access your profile and other features using the menu.</p>
                </div>
            ) : (
                <div>
                    <h1>Welcome to Admin Panel</h1>
                    <p>Please log in or register to access your profile and other features.</p>
                </div>
            )}
        </div>
    );
}