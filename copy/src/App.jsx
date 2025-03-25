import "./App.css";

//axios api
import axios from "axios";
//moment
import moment from "moment";
import "moment/min/locales";
import "moment/locale/ar";
moment.locale("ar");

//react
import { useEffect, useState } from "react";

//material ui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
//react i18n
import { useTranslation } from "react-i18next";

let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();

  //=========== STATES ===========
  const [dateAndTimeState, setDateAndTimeState] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  const [locale, setLocale] = useState("ar");

  //=========== EVENT HANDLERS ===========
  function handelLanguageClick() {
    if (locale === "ar") {
      i18n.changeLanguage("en");
      setLocale("en");
    } else {
      i18n.changeLanguage("ar");
      setLocale("ar");
    }
  }

  //=========== USE EFFECTS ===========

  useEffect(() => {
    //i18n
    i18n.changeLanguage("ar");
  }, []);

  useEffect(() => {
    //date and time
    setDateAndTimeState(moment().format(" h:mm:ss a"));
    //api call
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.005493&lon=31.477898&appid=996c2f3725dccfa6ec4877052fdb4107",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }), //cancel token
        }
      )
      .then((res) => {
        const responsTemp = Math.round(res.data.main.temp - 272.15);
        const min = Math.round(res.data.main.temp_min - 272.15);
        const max = Math.round(res.data.main.temp_max - 272.15);
        const description = res.data.weather[0].description;
        const responsIcon = res.data.weather[0].icon;
        setTemp({
          number: responsTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responsIcon}@2x.png`,
        });
        console.log(min, max, description);
      })
      .catch((err) => {
        console.log(err);
      });
    //cancel axios clean up
    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <Container maxWidth="sm">
      {/* CONTENT CONTAINER */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* CARD */}
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            width: "100%",
            backgroundColor: "rgb(28 52 91 /36%)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}
        >
          {/*CONTENT*/}
          <div style={{}}>
            {/*CITY & TIME*/}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "srart",
              }}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <Typography
                variant="h2"
                style={{ fontWeight: 600, marginRight: "20px" }}
              >
                {t("cairo")}
              </Typography>
              <Typography variant="h5" style={{ marginRight: "20px" }}>
                {dateAndTimeState}
              </Typography>
            </div>
            {/*=====CITY & TIME======*/}
            <hr />
            {/*CONTAINER .OF. DEGREE + CLOUD.ICON*/}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/*DEGREE & DESCRIPTION*/}
              <div>
                {/*TEMP*/}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h1" style={{ textAlign: "right" }}>
                    {temp.number}
                  </Typography>
                  <img src={"https://openweathermap.org/img/wn/04n@2x.png"} />
                </div>
                {/*=====TEMP====*/}
                <Typography variant="h6">{t(temp.description)}</Typography>
                {/* MIN & MAX */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5>
                    {t("min")} :{temp.min}
                  </h5>
                  <h5 style={{ margin: "0px 10px" }}>|</h5>
                  <h5>
                    {" "}
                    {t("max")}:{temp.max}
                  </h5>
                </div>
                {/*=====MIN & MAX====*/}
              </div>
              {/*=====DEGREE & DESCRIPTION====*/}
              <CloudIcon style={{ fontSize: "200px", color: "white" }} />
            </div>
            {/*=====CONTAINER .OF. DEGREE + CLOUD.ICON====*/}
          </div>
          {/*=====CONTENT====*/}
        </div>
        {/*tRANSLATION CONTAINER*/}
        <div
          dir="rtl"
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginTop: "12px",
          }}
        >
          <Button
            style={{ color: "white" }}
            variant="text"
            onClick={handelLanguageClick}
          >
            {locale === "ar" ? "English" : "عربي"}
          </Button>
        </div>
        {/*=====TRANSLATION CONTAINER====*/}
        {/*==== CARD ====*/}
      </div>
      {/*==== CONTENT CONTAINER===== */}
    </Container>
  );
}

export default App;
