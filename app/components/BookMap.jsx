import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = (props) => {
  const API_KEY = "AIzaSyChsu3WT1aG9lRtWA1nXWEMD8FnJmYhQeE";
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 35.6895, // 東京の緯度
    lng: 139.6917, // 東京の経度
  };

  const markers = props.seiti || [];
  console.log(markers);
  console.log(markers[0].position);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {markers.length > 0
          ? markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
                icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              />
            ))
          : null}
      </GoogleMap>
    </LoadScript>
  );
};

const BookMap = (props) => {
  return (
    <>
      <div className="container">
        <MapComponent seiti={props.seiti}></MapComponent>
      </div>
    </>
  );
};

export default BookMap;
