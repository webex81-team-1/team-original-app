import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const API_KEY = "AIzaSyChsu3WT1aG9lRtWA1nXWEMD8FnJmYhQeE";
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

const Map = () => {
  return (
    <>
      <div className="container">
        <p>asdf</p>
        <MapComponent></MapComponent>
      </div>
    </>
  );
};

export default Map;
