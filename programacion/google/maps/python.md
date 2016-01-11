https://github.com/googlemaps/google-maps-services-python
pip install googlemaps

Obtener una clave de google maps javascript api:
https://console.developers.google.com/apis/api/maps_backend/overview

Activar estas APIs
Directions API
Distance Matrix API
Elevation API
Geocoding API
Time Zone API
Roads API


Ejemplo:
gmaps = googlemaps.Client(key='Add Your Key here')

# Geocoding and address
geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

# Look up an address with reverse geocoding
reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

# Request directions via public transit
now = datetime.now()
directions_result = gmaps.directions("Sydney Town Hall",
                                     "Parramatta, NSW",
                                     mode="transit",
                                     departure_time=now)
