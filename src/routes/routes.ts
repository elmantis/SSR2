export const routes = {
    openWeatherLocation: (zipCode: string, apiKey: string) => `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode}&appid=${apiKey}`,
    timeZoneDB: (lat: string, lon: string, apiKey: string) => `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`,
    home: '/',
    users: '/users',
    user: '/users/:id'
}