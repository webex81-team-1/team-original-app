// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapComponent = (props) => {
//   const API_KEY = "AIzaSyChsu3WT1aG9lRtWA1nXWEMD8FnJmYhQeE";
//   const containerStyle = {
//     width: "100%",
//     height: "500px",
//   };

//   // 地図の中心を最初のマーカー位置に設定（デフォルトは東京）
//   const center =
//     props.seiti?.length > 0
//       ? props.seiti[0].position
//       : { lat: 35.6895, lng: 139.6917 };

//   const markers = [
//     ...(props.seiti || []),
//     { position: { lat: 35.6895, lng: 139.6917 }, title: "東京駅" },
//     { position: { lat: 35.6586, lng: 139.7454 }, title: "東京タワー" },
//   ];
//   console.log("Markers array:", markers); // デバッグ用ログ

//   return (
//     <LoadScript googleMapsApiKey={API_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//         {markers.map((marker, index) =>
//           marker.position ? (
//             <Marker
//               key={index}
//               position={marker.position}
//               title={marker.title}
//             />
//           ) : null
//         )}
//         <Marker position={center} title="中心地" />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// const BookMap = (props) => {
//   return (
//     <div className="container">
//       <MapComponent seiti={props.seiti} />
//     </div>
//   );
// };

//

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./BookMap.css";

function MapComponent(props) {
  const center =
    props.seiti?.length > 0
      ? props.seiti[0].position
      : { lat: 35.6895, lng: 139.6917 };

  const markers = props.seiti || [];
  console.log("Markers array:", markers); // デバッグ用ログ

  return (
    <div className="MapComponent" style={{ width: "100%", height: "500px" }}>
      <APIProvider apiKey={"AIzaSyChsu3WT1aG9lRtWA1nXWEMD8FnJmYhQeE"}>
        <Map defaultCenter={center} defaultZoom={10}>
          {markers.map((marker, index) =>
            marker.position ? (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
              />
            ) : null
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

const BookMap = (props) => {
  return (
    <div className="container">
      <MapComponent seiti={props.seiti} />
    </div>
  );
};

export default BookMap;
