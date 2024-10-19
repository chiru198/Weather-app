const fetchdata = async (targetlocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=6e5601cb7fea49eaad5105452241410&q=${targetlocation}&aqi=no`;

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
        document.getElementById('location').textContent=data.location.localtime;  
        
        document.getElementById('weather').style.display = 'block';
        document.getElementById('error').textContent = '';
    } catch (error) {
        // Display error message
        document.getElementById('error').textContent = 'Error fetching weather data. Please try again.';
        document.getElementById('weather').style.display = 'none';
    }
};

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const location = document.getElementById('locationInput').value;
    fetchdata(location); // Fetch weather data for entered location
});
