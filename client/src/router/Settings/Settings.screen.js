import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

//Styles
import "./style.scss";

//Assets
// @ts-ignore
import LocationMark from "../../assets/images/location-mark.svg";

//hooks
import useSettings from "./hooks";

const Settings = () => {
  const { getSettings, updateSettings } = useSettings();
  const [settingsData, setSettingsData] = useState(null);

  useEffect(() => {
    (async () => {
      setSettingsData(await getSettings());
    })();
  }, []);

  useEffect(() => {
    if (settingsData != null) {
      updateSettings(settingsData);
    }
  }, [settingsData]);

  return (
    <div className="settings-container">
      <h2>الإعدادات</h2>
      {settingsData && (
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
              onClick={(value) => {
                setSettingsData({
                  ...settingsData,
                  lat: value.lat,
                  lng: value.lng,
                });
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
          <div className="settings-inputs">
            <div className="info">
              يجب أن يكون الوقت بالساعات من 0 الي 24 والمسافة بالمتر
            </div>
            <div>
              <label>وقت الحضور</label>
              <input
                type="number"
                placeholder="بالساعات"
                max={24}
                min={0}
                value={settingsData.attendanceTime}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    attendanceTime: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>المدة المسموحة لتسجيل الحضور</label>
              <input
                type="number"
                placeholder="بالساعات"
                max={24}
                min={0}
                value={settingsData.allowedAttendanceTime}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    allowedAttendanceTime: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>وقت الانصراف</label>
              <input
                type="number"
                placeholder="بالساعات"
                max={24}
                min={0}
                value={settingsData.leavingTime}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    leavingTime: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>المدة المسموحة لتسجيل الانصراف</label>
              <input
                type="number"
                placeholder="بالساعات"
                max={24}
                min={0}
                value={settingsData.allowedLeavingTime}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    allowedLeavingTime: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>أقصي مسافة مسموحة (بالمتر)</label>
              <input
                type="number"
                placeholder="بالمتر"
                min={0}
                value={settingsData.allowedDistance}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    allowedDistance: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
