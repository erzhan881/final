// Инициализация карты
const map = L.map('map').setView([48.0196, 66.9237], 5); // Координаты центра Казахстана

// Добавление слоя карты (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Функция для поиска города
async function searchCity() {
    const cityName = document.getElementById('cityInput').value;
    if (!cityName) {
        alert('Введите название города!');
        return;
    }

    try {
        // Используем Nominatim API для получения координат города
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName},Kazakhstan`);
        const data = await response.json();

        if (data.length === 0) {
            alert('Город не найден!');
            return;
        }

        const { lat, lon, display_name } = data[0];
        map.setView([lat, lon], 10); // Увеличиваем масштаб для выбранного города

        // Добавление маркера
        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<b>${display_name}</b>`)
            .openPopup();
    } catch (error) {
        console.error('Ошибка при поиске города:', error);
        alert('Ошибка при поиске. Попробуйте позже.');
    }
}

// Привязка кнопки поиска
document.getElementById('searchButton').addEventListener('click', searchCity);



