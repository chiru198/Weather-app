const fetchdata = async (targetlocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=099eed53ffd1414ca0c83606241910&q=${targetlocation}&aqi=no`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        document.getElementById('locationName').textContent = data.location.name;
        document.getElementById('temperature').textContent = data.current.temp_c;
        document.getElementById('condition').textContent = data.current.condition.text;
        document.getElementById('conditionIcon').src = data.current.condition.icon;
        document.getElementById('location').textContent = data.location.localtime;  
        
        document.getElementById('weather').style.display = 'block';
        document.getElementById('error').textContent = '';
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('error').textContent = 'Error fetching weather data. Please try again.';
        document.getElementById('weather').style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const location = document.getElementById('locationInput').value.trim(); // Trim whitespace
        if (location) {
            fetchdata(location); // Fetch weather data for entered location
        } else {
            document.getElementById('error').textContent = 'Please enter a valid location.';
        }
    });
});
