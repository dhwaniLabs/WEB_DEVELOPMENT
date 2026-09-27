
async function fetchData() {

    try {

        const response = await fetch("index.json");

        if (!response.ok) {
            throw new Error("Data could not be loaded");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.log(error);
        return null;

    }
}
