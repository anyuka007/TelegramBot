import fetch from "node-fetch";

export const pingServer = async () => {
    try {
        const url = process.env.APP_URL;
        console.log("pinging server...");
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Server doesn't correspond! status: ${response.status}`);
        } else {
            console.log("Server is again alive!");
        }

    } catch (error) {
        console.log("Error pinging server:", error);
    } 
}
