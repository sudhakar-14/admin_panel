import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
// import { LocationOn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { LocationOn } from "@mui/icons-material";
// import { useSelector } from "react-redux";

const Map = ({
  markers,
  selectedMarker,
  onSelectMarker,
  notSelect = false,
}) => {
//   const dashboard = useSelector((state) => state?.dashboard);
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const selectedMarkerLat = selectedMarker?.lat ?? 20.146220361679458;
  const selectedMarkerLng = selectedMarker?.lng ?? 40.2568970541965;

  const handleMarkerClick = async ({ lat, lng }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDJC9c-nt6H0NMCq2eBYMxKT_SfIcZTWwo`
      );
        console.log("res", response?.data);
      const { results } = response.data;
      if (results.length > 0) {
        const address = results[0].formatted_address;
        console.log(address)
        onSelectMarker({ lat, lng, address });
      }
    } catch (error) {
      console.log("Error: ", error);
    }

    onSelectMarker({ lat, lng });
  };
  // console.log(selectedMarker,'map')

  // useEffect(() => {
  //   const params = {
  //     // Request parameters
  //     lat: selectedMarkerLat,
  //     long: selectedMarkerLng,
  //     language: "A",
  //     format: "json",
  //     encode: "{string}",
  //   };

  //   console.log("map=> params", params);
  //   $.ajax({
  //     url:
  //       "https://apina.address.gov.sa/NationalAddress/v3.1/Address/address-geocode?" +
  //       $.param(params),
  //     beforeSend: function (xhrObj) {
  //       // Request headers
  //       xhrObj.setRequestHeader("api_key", "{subscription key}");
  //     },
  //     type: "GET",
  //     // Request body
  //     data: "{body}",
  //   })
  //     .done(function (data) {
  //       console.log("map=> data", data);
  //     })
  //     .fail(function (err) {
  //       console.log("map=> err", err);
  //     });
  // }, []);

  return (
    // <div
    //   style={{
    //     height: "100%",
    //     width: "100%",
    //     boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
    //     borderRadius: "15px",
    //   }}
    // >
    <div style={{}} className={class_name.map_box}>
      <GoogleMapReact 
        bootstrapURLKeys={{
          key: "AIzaSyDJC9c-nt6H0NMCq2eBYMxKT_SfIcZTWwo", //AIzaSyCCbOGygkchkcXDrWQwO2yQhFrPhli4z3s AIzaSyDyVm6YYqal5UGMBpVhm6YrdMKquPM9IKQ
        }}
        center={{
          lat:selectedMarkerLat,
          lng:selectedMarkerLng,
        }}
        defaultCenter={{
          lat:20.146220361679458,
          lng:40.2568970541965,
        }}
        defaultZoom={15}
        // options={{styles: mapOptions.styles}}
        onClick={({ lat, lng }) => {
          if (!notSelect) {
            handleMarkerClick({ lat, lng });
          }
        }}
      >
        {selectedMarker && (
          <LocationOn          
            lat={selectedMarkerLat}
            lng={selectedMarkerLng}
            style={{
              color: "#3973a5",
              // color: "Background",
              // fontSize: "50px",
              width: "40px",
              height: "40px",
              position: 'absolute', 
              transform: 'translate(-50%, -100%)'
            }}
          />
        )}
      </GoogleMapReact>
    </div>
    // </div>
  );
};

export default Map;

const useStyles = makeStyles((theme) => ({
  map_box: {
    display: "flex",
    height: "500px",
    width: "100%",
    borderRadius: "15px",
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
    overflow: "hidden",
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  "@media (max-width: 767px)": {
    map_box: {
      height: "250px",
      width: "100%",
      borderRadius: "15px",
      boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
      overflow: "hidden",
    },
  },
}));
