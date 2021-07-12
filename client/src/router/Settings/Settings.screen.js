import React from "react";
import GoogleMapReact from "google-map-react";

//Styles
import "./style.scss";

const Settings = ({  lat = 33.363666,
    lng = 44.404379,}) => {
  return (
    <div className="settings-container">
      <h2>الإعدادات</h2>
      <div className="container">
        <h3>تغيير مكان المؤسسة</h3>
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDUZp6H0YLdfkwOA7EZwEv6ndNAkjleN9w",
            }}
            defaultCenter={{
              lat,
              lng,
            }}
            defaultZoom={16}
          >
            {/* <img src={LocationMark} lat={lat} lng={lng} className="mark-img" /> */}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default Settings;
