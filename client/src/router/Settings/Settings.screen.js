import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

//Styles
import "./style.scss";

//Assets
import LocationMark from "../../assets/images/location-mark.svg";

//hooks
import useSettings from "./hooks";

const Settings = () => {
  const { getSettings, updateSettings } = useSettings();
  const [settingsData, setSettingsData] = useState({
    lng: 39.252349,
    lat: 21.476755,
  });

  useEffect(() => {
    (async () => {
      // console.log("data",getSettings())
      setSettingsData(await getSettings());
    })();
  }, []);

  return (
    <div className="settings-container">
      <h2>الإعدادات</h2>
      <div className="container">
        <h3>
          تغيير مكان المؤسسة <span>قم بتحديد موقع المؤسسة علي الخريطة</span>
        </h3>
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDUZp6H0YLdfkwOA7EZwEv6ndNAkjleN9w",
            }}
            defaultCenter={{
              lat: settingsData.lat,
              lng: settingsData.lng,
            }}
            defaultZoom={16}
            onClick={(ev) => {
              setSettingsData({ lat: ev.lat, lng: ev.lng });
              updateSettings({ lat: ev.lat, lng: ev.lng });
            }}
          >
            <img
              src={LocationMark}
              lat={settingsData.lat}
              lng={settingsData.lng}
              className="mark-img"
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default Settings;
