/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useEffect, useRef, useState } from "react";
// import Footer from "../../../Component/Footer/Footer";
import "./boatViewDetails.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { toast } from "react-toastify";
// import IMAGES from "../../Images";
import Map from "./Map";
import Policy from "./Policy";
// import { BoatDetailCard } from "../Card/BoatDetailCard";
// import { single_boat_data_API } from "../../../Service/api";
import CalendarComponent from "./CalendarComponent";
import ImageSlider from "./ImageSlider";
// import { PageHeader } from "../page-header/PageHeader";
import useWindowDimensions from "./useWindowDimensions";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { StarRating } from "./StarRating";
import { easings, useSpring } from "react-spring";
// import {
//   search_boat_id,
//   single_boat_details_store,
// } from "../../../redux/slices";
// import { API } from "../../../Service/constants";
import { Skeleton } from "@mui/material";
import { API } from "../../../api/endPoint";
import IMAGES from "../../../images/Images";
import { useLocation, useNavigate } from "react-router-dom";
import { boat_detail } from "../../../api/api";

const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

const skeletonData = Array(4).fill(null);

const BoatViewDetails = () => {
  const location = useLocation()
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  // const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state?.auth);
//   const dashboard = useSelector((state) => state?.dashboard);
  const { height, width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [boatDetails, setBoatDetails] = useState("");
  const [calendar_1_date, setCalendar_1_date] = useState(moment().format(""));
  const [calendar_2_date, setCalendar_2_date] = useState(
    moment().add(1, "month").format("")
  );
  const boatListContainerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(false);
  const [selectedImageUrl_index, setSelectedImageUrl_index] = useState(false);
  const [selectedImageUrlFullData, setSelectedImageUrlFullData] =
    useState(false);
  const [Image1Spring, Image1Api] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9)", opacity: 0 },
  }));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  useEffect(()=>{
    setIsLoading(true)
    let payload = {
      boat_id: location.state.boat_id
    }
    boat_detail(payload)
    .then((res)=>{
      if(res?.data?.success){
        setBoatDetails(res?.data?.data)
        setIsLoading(false)
      } else { 
        console.log("boatviewdetails error")
        setIsLoading(false)
      }
    })
    .catch((err)=>{
      console.log("boat view detail api err",err)
      setIsLoading(false)
    })
    console.log(boatDetails,'boat details')
  },[])

  // console.log(calendar_1_date,"calendar 1 date",calendar_2_date)

  useEffect(() => {
    Image1Api.start({
      ...{ transform: "scale(1)", opacity: 1 },
      delay: 1000,
      config: { duration: 750 },
    });
  }, [Image1Api]);

  const handleClick = () => {
    const scrollAmount = boatListContainerRef.current.offsetWidth;
    boatListContainerRef.current.scrollLeft += scrollAmount;
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleImageClick = (item, index) => {
    setShowModal(true);
    setSelectedImageUrl(`${API.baseUrls[API.currentEnv]}${item[index]?.path}`);
    setSelectedImageUrlFullData(item);
    setSelectedImageUrl_index(index);
  };

  const goToPrevious = () => {
    handleImageClick(
      boatDetails?.boats_image,
      selectedImageUrl_index > 0
        ? selectedImageUrl_index - 1
        : boatDetails?.boats_image?.length - 1
    );
  };

  const goToNext = () => {
    handleImageClick(
      boatDetails?.boats_image,
      selectedImageUrl_index + 1 < boatDetails?.boats_image?.length
        ? selectedImageUrl_index + 1
        : 0
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#f6f6f6",
        }}
      >
        <div className="show-header-outSide-banner">
          {/* <PageHeader
            showLoginSignUp={auth?.AuthToken ? false : true}
            handle_navigation={handleHeaderCallBack}
            // presentPage={"Home"}
            link1={"Boat Offers"}
            link2={"Scuba Courses/Programs"}
            link3={"Scuba Diving Trips"}
          /> */}
        </div>
        <div className="show-header-inside-banner">
          {/* <PageHeader
            showLoginSignUp={auth?.AuthToken ? false : true}
            handle_navigation={handleHeaderCallBack}
            // presentPage={"Home"}
            link1={"Boat Offers"}
            link2={"Scuba Courses/Programs"}
            link3={"Scuba Diving Trips"}
          /> */}
        </div>

        <div
          className="boatViewDetails"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: '100%'
          }}
        >
          {!isLoading ? (
            <div
              className="view_boat_details_background_img"
              style={{
                height: width > 1000 ? height / 1.5 : "10%",

                backgroundImage: `url(${API.baseUrls[API.currentEnv]}${
                  boatDetails?.background_image
                })`,
              }}
            >
              <div className={class_name.insideBannerImg}>
                <Typography className={class_name.Welcome_txt}>
                  {boatDetails?.boat_name}
                </Typography>
                <Typography className={class_name.sub_titile}>
                  {boatDetails?.boat_type}
                </Typography>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rect"
              width="100%"
              height={width > 1000 ? height / 1.5 : "10%"}
              animation="wave"
            />
          )}

          <div className={class_name.form_container_box}>
            {/* ================== ================== ================== ================== show image'S and booking btn */}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {showModal ? (
                <>
                  <ImageSlider
                    slides={selectedImageUrl}
                    onClose={handleModalClose}
                    item={selectedImageUrlFullData}
                    index={selectedImageUrl_index}
                    goToPrevious={goToPrevious}
                    goToNext={goToNext}
                  />
                </>
              ) : null}
              {!isLoading ? (
                <div className={class_name.show_img}>
                  {boatDetails?.boats_image?.map((item, index) => (
                    <>
                      <div className={class_name.show_boat_imgs_box}>
                        <img
                          src={
                            item?.path
                              ? `${API.baseUrls[API.currentEnv]}${item?.path}`
                              : IMAGES.company_logo
                          }
                          alt="carousal_img"
                          className={class_name.boat_imgs}
                          style={{
                            ...Image1Spring,
                          }}
                          onClick={
                            () =>
                              handleImageClick(boatDetails?.boats_image, index)
                            // boatData?.boats_image
                            // image?.path
                            //   ? `${`http://localhost:3000/`}${image.path}`
                            //   : IMAGES.APP_ICON
                          }
                        />
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <>
                  {skeletonData.map((_, index) => (
                    <Skeleton
                      key={index}
                      width={200}
                      height={200}
                      style={{ marginRight: "1%" }}
                    />
                  ))}
                </>
              )}
              <div className={class_name.booking_box}>
                <div className={class_name.inside_booking_box}>
                  <div className={class_name.start_review_count_row}>
                    {!isLoading ? (
                      <StarRating rating={3} />
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                    <Typography className={class_name.review_count_txt}>
                      {!isLoading ? (
                        "(30 reviews)"
                      ) : (
                        <Skeleton width={100} height={20} />
                      )}
                    </Typography>
                  </div>
                  {!isLoading ? (
                    <Typography className={class_name.label_txt}>
                      {"Estimated Price :"}
                    </Typography>
                  ) : (
                    <Skeleton
                      width={100}
                      height={20}
                      style={{ margin: "5% 0" }}
                    />
                  )}
                  <div
                    className={class_name.start_review_count_row}
                    style={{
                      justifyContent: "flex-start",
                    }}
                  >
                    {!isLoading ? (
                      <Typography className={class_name.price_values_txt}>
                        <>
                          {boatDetails?.price_per_hour}{" "}
                          {boatDetails?.price_currency}
                        </>
                      </Typography>
                    ) : (
                      <Skeleton width={"20%"} height={20} />
                    )}

                    {!isLoading ? (
                      <Typography
                        style={{
                          fontWeight: "bold",
                          marginLeft: "2.5%",
                        }}
                        className={class_name.price_values_txt}
                      >
                        <>{"per hour"}</>
                      </Typography>
                    ) : (
                      <Skeleton
                        width={"20%"}
                        height={20}
                        style={{ marginLeft: "5%" }}
                      />
                    )}
                  </div>
                  {!isLoading ? (
                    <div
                      className={class_name?.send_a_booking_req}
                      // onClick={() => navigate("/boatBookingRequest")}
                    >
                      <Typography
                        className={`${class_name.send_a_booking_req_txt} hoverEffect`}
                      >
                        Send a Book Request
                      </Typography>
                    </div>
                  ) : (
                    <Skeleton width={"100%"} height={100} />
                  )}
                </div>
              </div>

              {/*  ================== ================== ================== ================== show image in modal page */}
            </div>

            <Divider
              variant="fullWidth"
              style={{
                marginTop: "5%",
                backgroundColor: "rgba(66, 70, 81, 0.8)",
                height: "1px",
                border: "solid 0.5px rgba(66, 70, 81, 0.8)",
              }}
            />

            {/* ==========================      profile   details   ========================== */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "mistyrose",
                margin: "5% 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {!isLoading ? (
                  <img
                    src={
                      `${API.baseUrls[API.currentEnv]}${
                        boatDetails?.front_image
                      }` ?? IMAGES.profile_icon
                    }
                    alt="profile"
                    className={class_name.profile_img}
                  />
                ) : (
                  <>
                    <Skeleton
                     className={class_name.loading_profile_icon}
                      // width={"10%"}
                      // height={"100%"}
                      // style={{ borderRadius: "50%" }}
                    />
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "1.5%",
                    width: "100%",
                  }}
                >
                  <Typography className={class_name.owner_name}>
                    {!isLoading ? (
                      boatDetails?.boat_name
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </Typography>

                  <Typography
                    className={class_name.owner_name_txt}
                    style={{
                      fontWeight: "normal",
                    }}
                  >
                    {!isLoading ? (
                      <>{"Boat Owner"}</>
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </Typography>
                </div>
              </div>
              <div className={class_name.show_review_count_and_star}>
                {!isLoading ? (
                  <>
                    <StarRating rating={4} />
                    <Typography className={class_name.greeting_message_txt}>
                      {"(30 reviews)"}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Skeleton width={"20%"} height={20} />
                    <Skeleton width={"20%"} height={20} />
                  </>
                )}
              </div>
              <Typography
                className={class_name.greeting_message_txt}
                // style={{ marginLeft: "10%" }}
              >
                {!isLoading ? (
                  boatDetails?.greeting_message
                ) : (
                  <>
                    <Skeleton width={"100%"} height={20} />
                    <Skeleton width={"100%"} height={20} />
                    <Skeleton width={"100%"} height={20} />
                    <Skeleton width={"100%"} height={20} />
                  </>
                )}
              </Typography>
            </div>

            <Divider
              variant="fullWidth"
              style={{
                marginTop: "5%",
                backgroundColor: "rgba(66, 70, 81, 0.8)",
                height: "1px",
                border: "solid 0.5px rgba(66, 70, 81, 0.8)",
              }}
            />
            {/* ==========================       Boat Details       ========================== */}
            <div className={class_name.Boat_details_and_services}>
              <div className={class_name.show_width_half_or_full}>
                <Typography className={class_name.Boat_details_txt}>
                  Boat Details
                </Typography>
                {!isLoading ? (
                  <>
                    <div
                      className={class_name.boat_details_content_row}
                      style={{ marginTop: "7%" }}
                    >
                      <Typography className={class_name.Boat_details_point_txt}>
                        Type
                      </Typography>
                      <Typography
                        className={class_name.Boat_details_point_ans_txt}
                      >
                        {boatDetails?.boat_type ?? (
                          <Skeleton width={100} height={20} />
                        )}
                      </Typography>
                    </div>
                    <div className={class_name.boat_details_content_row}>
                      <Typography className={class_name.Boat_details_point_txt}>
                        Length
                      </Typography>
                      <Typography
                        className={class_name.Boat_details_point_ans_txt}
                      >
                        {boatDetails?.boat_length ?? (
                          <Skeleton width={100} height={20} />
                        )}{" "}
                        {boatDetails?.boat_length ? " ft" : null}
                      </Typography>
                    </div>
                    <div className={class_name.boat_details_content_row}>
                      <Typography className={class_name.Boat_details_point_txt}>
                        Year
                      </Typography>
                      <Typography
                        className={class_name.Boat_details_point_ans_txt}
                      >
                        {boatDetails?.boat_year ?? (
                          <Skeleton width={100} height={20} />
                        )}
                      </Typography>
                    </div>
                    <div className={class_name.boat_details_content_row}>
                      <Typography className={class_name.Boat_details_point_txt}>
                        Max Capacity
                      </Typography>
                      <Typography
                        className={class_name.Boat_details_point_ans_txt}
                      >
                        {boatDetails?.boat_max_capacity ?? (
                          <Skeleton width={100} height={20} />
                        )}
                      </Typography>
                    </div>
                  </>
                ) : (
                  <div className={class_name.boat_servie_row} style={{}}>
                    <div
                      style={{
                        width: "50%",
                        // display:'flex',
                        // flexDirection:'row',
                        // flexWrap:'wrap'
                        // backgroundColor: "lavender",
                      }}
                    >
                      {skeletonData.map((_, index) => (
                        <Skeleton
                          width={100}
                          height={20}
                          key={index}
                          style={{ marginTop: "5%" }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        width: "50%",
                      }}
                    >
                      {skeletonData.map((_, index) => (
                        <Skeleton
                          width={100}
                          height={20}
                          key={index}
                          style={{ marginTop: "5%" }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* ==========================       Services       ========================== */}
              <div className={class_name.show_width_half_or_full}>
                <Typography className={class_name.Boat_details_txt}>
                  Services
                </Typography>
                <div className={class_name.boat_servie_row} style={{}}>
                  {!isLoading ? (
                    <>
                      {boatDetails?.boats_service?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              width: "50%",
                              //  backgroundColor: "lavender"
                            }}
                          >
                            <FormControlLabel
                              control={
                                <>
                                  <CustomCheckbox
                                    name="email"
                                    checked={true}
                                    // onChange={handleCheckboxChange}
                                    icon={
                                      <span
                                        className={class_name.unChecked_box}
                                      />
                                    }
                                    checkedIcon={
                                      <span className={class_name.checked_box}>
                                        ✓
                                      </span>
                                    }
                                  />
                                </>
                              }
                              label={
                                <Typography
                                  className={class_name.check_box_txt}
                                >
                                  {item.service_label}
                                </Typography>
                              }
                            />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          width: "50%",
                          // backgroundColor: "lavender",
                        }}
                      >
                        {skeletonData.map((_, index) => (
                          <Skeleton
                            key={index}
                            width={100}
                            height={20}
                            style={{ marginTop: "5%" }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          width: "50%",
                        }}
                      >
                        {skeletonData.map((_, index) => (
                          <Skeleton
                            key={index}
                            width={100}
                            height={20}
                            style={{ marginTop: "5%" }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* ==========================       Calendar       ========================== */}
            <div>
              <Typography
                className={class_name.Boat_details_txt}
                style={{ margin: "7% 0 3%" }}
              >
                Check Avaliability
              </Typography>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div className={class_name.first_calendar}>
                  {!isLoading ? (
                    <>
                      <CalendarComponent
                        hideSelectedDayColor={true}
                        calender_no={"1"}
                        showFixedDates={boatDetails?.boats_timeslot}
                        setDay={calendar_1_date}
                        setPrimary_date={setCalendar_1_date}
                        setSecondary_date={setCalendar_2_date}
                        handleShowMonth={calendar_1_date}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: "300px",

                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Skeleton width={"100%"} height={"100%"} />
                    </div>
                  )}
                </div>

                <div className={class_name.second_calendar}>
                  {!isLoading ? (
                    <>
                      <CalendarComponent
                        hideSelectedDayColor={true}
                        showFixedDates={boatDetails?.boats_timeslot}
                        calender_no={"2"}
                        setDay={calendar_2_date}
                        setPrimary_date={setCalendar_2_date}
                        setSecondary_date={setCalendar_1_date}
                        handleShowMonth={calendar_2_date}
                      />
                    </>
                  ) : (
                    <Skeleton width={"100%"} height={"100%"} />
                  )}
                </div>
              </div>
            </div>

            {/* ==========================       map Location       ========================== */}

            <Typography
              className={class_name.Boat_details_txt}
              style={{ margin: "7% 0 2%" }}
            >
              Boat Location
            </Typography>

            {!isLoading ? (
              <Map
                selectedMarker={boatDetails?.latitude ?? ""}
                onSelectMarker={boatDetails?.longtitude ?? ""}
                notSelect={true}
              />
            ) : (
              <>
                {/* <Skeleton
                  width={"100%"}
                  height={"100%"}
                  style={{
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box", // Include padding and borders in width and height
                  }}
                /> */}
                <Skeleton
                  width={"100%"}
                  height={500}
                  style={{ marginTop: "1%" }}
                />
              </>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              {!isLoading ? (
                <>
                  <img
                    src={IMAGES.Location}
                    className={class_name.location_icon_img}
                    alt="location_img"
                  />
                  <div style={{ marginLeft: "5%" }}>
                    <Typography className={class_name.city_nameTxt}>
                      {boatDetails?.marine_city}
                    </Typography>
                    <Typography className={class_name.address_Txt}>
                      {boatDetails?.marine_address}
                    </Typography>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton
                    width={"5%"}
                    height={"120px"}
                    style={{
                      margin: 0,
                      padding: 0,
                      boxSizing: "border-box",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "3%",
                      padding: 0,
                    }}
                  >
                    <Skeleton
                      width={"20%"}
                      height={"30px"}
                      style={{
                        marginLeft: "0%",
                        padding: 0,
                        boxSizing: "border-box",
                      }}
                    />
                    <Skeleton
                      width={"10%"}
                      height={"30px"}
                      style={{
                        marginLeft: "0%",
                        padding: 0,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* ==========================  ==========================      customers       ========================== */}
            {!isLoading ? (
              <>
                {boatDetails?.boats_user_ratings?.length > 0 ? (
                  <div>
                    <Typography
                      className={class_name.Boat_details_txt}
                      style={{ margin: "7% 0 2%" }}
                    >
                      What customers say about this boat
                    </Typography>
                    {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: "red",
                  overflowX: "auto",
                }}
              >
                {client_review?.map((item, index) => {
                  return (
                    <div style={{ marginLeft: index === 0 ? "2%" : ".1%" }}>
                      <Client_review
                        id={1}
                        image={IMAGES?.boat2 ?? IMAGES.PROFILE_ICON}
                        name={"Jagadeesh"}
                        place={"Riyath"}
                        review={"Luxurious! We enjoyed it So much! Thank You"}
                      />
                    </div>
                  );
                })}
                </div> */}

                    <div
                      className="scrollable-row"
                      // ref={scrollableRowRef}
                      style={{ paddingTop: "25px" }}
                    >
                      {boatDetails?.boats_user_ratings?.map((item) => {
                        return (
                          <div key={item.id} className="flex-nowrap">
                            <div
                              className={"review_card"}
                              style={{
                                backgroundColor: "rgba(102, 155, 195, 0.1)",
                              }}
                              data-id={item.id}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                }}
                              >
                                <img
                                  src={IMAGES.profile_icon}
                                  alt="client_img"
                                  className="client-img"
                                  style={{ backgroundColor: "white" }}
                                />
                              </div>
                              <Typography className="client-card-name-txt">
                                {item.name}
                              </Typography>
                              <Typography className="client-card-city-txt">
                                {item.place}
                              </Typography>
                              <Typography
                                style={{ textAlign: "left" }}
                                className="client-card-review-txt"
                              >
                                {item.review}
                              </Typography>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Skeleton
                  width={200}
                  height={200}
                  style={{ marginRight: "1%" }}
                />
                <Skeleton
                  width={200}
                  height={200}
                  style={{ marginRight: "1%" }}
                />
                <Skeleton
                  width={200}
                  height={200}
                  style={{ marginRight: "1%" }}
                />
              </div>
            )}

            {/* ========================== ==========================  Cancellation     Policy       ========================== */}
            <div>
              <Typography
                className={class_name.Boat_details_txt}
                style={{ margin: "7% 0 2%" }}
              >
                Cancellation Policy
              </Typography>

              {!isLoading ? (
                <>
                  {boatDetails?.boats_cancellation_policy?.map(
                    (item, index) => {
                      return (
                        <Policy
                          id={index + 1}
                          policy_statement={item?.policy_statement}
                        />
                      );
                    }
                  )}
                </>
              ) : (
                <>
                  {skeletonData.map((_, index) => (
                    <Skeleton
                      key={index}
                      width={"100%"}
                      height={80}
                      style={{ marginTop: "1%" }}
                    />
                  ))}
                </>
              )}
            </div>
            {isLoading ? (
              <Typography
                className={class_name.owner_name}
                style={{
                  marginTop: "7%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                Other Boats for{" "}
                <Skeleton
                  width={"25%"}
                  height={25}
                  style={{ marginLeft: "3%" }}
                />
              </Typography>
            ) : null}
            {/* ========================== ==========================       boatListData       ========================== */}
            {!isLoading ? (
              <>
                {boatDetails?.boat_list?.length ? (
                  <div>
                    <Typography
                      className={class_name.owner_name}
                      style={{ marginTop: "7%" }}
                    >
                      {/* Other Boats for {boatDetails?.boat_name} */}
                    </Typography>
                    <div
                      style={{}}
                      className={class_name.showing_boat_list_card}
                    >
                      <div
                        ref={boatListContainerRef}
                        className={class_name.showing_boat_list_inner_div}
                        style={{
                          // width: "95%",
                          // overflowX: "auto",
                          // margin: `0px 0px 0px 0px`,
                          // display: "flex",
                          // flexDirection: "row",
                        }}
                      >
                        <Row>
                          <Col xs={11}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {boatDetails?.boat_list?.filter((item, index) => item?.marine_city === boatDetails?.marine_city).map((item,index)=>{
                                // item?.marine_city === boatDetails?.marine_city??
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      margin: "0.1%",
                                      marginBottom: '0.3%'
                                    }}
                                    onClick={() => {
                                      // navigate("/boatViewDetails");
                                      // dispatch(search_boat_id(item?.boat_id));
                                    }}
                                  >
                                    {/* <BoatDetailCard
                                      boatName={item?.boat_name}
                                      marine_city={item?.marine_city}
                                      starRating={3}
                                      priceCurrency={item?.price_currency}
                                      pricePerHour={item?.price_per_hour}
                                      boatMaxCapacity={item?.boat_max_capacity}
                                      profile_image={`${
                                        API.baseUrls[API.currentEnv]
                                      }${item?.front_image}`}
                                      borderRadius={"1px"}
                                    /> */}
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      {boatDetails?.boat_list?.length > 4 ? (
                        <IconButton className={class_name.align_arrow_icon}>
                          {/* <img
                            src={IMAGES.Right_arrow}
                            onClick={handleClick}
                            className={class_name.right_arrow_style}
                            alt="next >>"
                          /> */}
                        </IconButton>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: "rebeccapurple",
                }}
              >
                {skeletonData.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                      // backgroundColor: "rebeccapurple",
                      margin: "1%",
                    }}
                  >
                    <Skeleton
                      variant="rect"
                      width="100%"
                      height={300}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      animation="wave"
                      style={{ marginTop: "10px" }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      animation="wave"
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{}} className={class_name.show_bottom_box_content}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {!isLoading ? (
                  <Typography
                    style={{ color: "rgba(21, 28, 48, 0.6)", margin: "0" }}
                    className={class_name.label_txt}
                  >
                    Estimated Price:
                  </Typography>
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {!isLoading ? (
                  <>
                    <Typography className={class_name.price_values_txt}>
                      {boatDetails?.price_per_hour}{" "}
                      {boatDetails?.price_currency}
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        marginLeft: "2.5%",
                      }}
                      className={class_name.price_values_txt}
                    >
                      {"per hour"}
                    </Typography>
                  </>
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </div>
            </div>
            {!isLoading ? (
              <div
                className={class_name?.send_a_booking_req_outer_box}
                // onClick={() => navigate("/boatBookingRequest")}
              >
                <Typography
                  className={`${class_name.send_a_booking_req_txt_outer_box} hoverEffect`}
                >
                  Send a Book Request
                </Typography>
              </div>
            ) : (
              <Skeleton width={"100%"} height={80} />
            )}
          </div>
          <div className="footer-style-hide">
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoatViewDetails;

const useStyles = makeStyles((theme) => ({
  form_container_box: {
    backgroundColor: "#fff",
    alignSelf: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    border: "solid 0.5px rgba(66, 70, 81, 0.1)",
    padding: "5%",
    paddingTop: "1.5%",
    borderRadius: "2px",
    marginBottom: "5%",
    width: "90%",
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("950")]: {},
  },

  insideBannerImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  Welcome_txt: {
    fontSize: "clamp(14px, 3vw, 65px)", // Adjust the range as needed
    fontWeight: "bolder",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
    // fontSize: '3rem'
  },

  sub_titile: {
    fontSize: "clamp(8px, 2.5vw, 60px)", // Adjust the range as needed
    fontWeight: "500",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },

  profile_img: {
    borderRadius: "100px",
    width: "50px",
    height: "50px",

    [theme.breakpoints.up("sm")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("md")]: {
      width: "75px",
      height: "75px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "90px",
      height: "90px",
    },
  },

  loading_profile_icon: {
    width: 100,
    height: 150,
    borderRadius: '50%',
    [theme.breakpoints.down('768')]: {
      height: 50,
      widht: 30
    },
    [theme.breakpoints.down('480')]: {
      height: 100,
      width: 80
    },
  },

  owner_name: {
    fontSize: "clamp(14px, 3vw, 24px)",
    textAlign: "left",
    color: "#424651",
  },
  owner_name_txt: {
    fontSize: "clamp(14px, 2vw, 20px)",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.8)",
  },
  greeting_message_txt: {
    fontSize: "clamp(12px, 1.5vw, 28px)",
    fontWeight: "lighter",
    textAlign: "left",
    color: "#424651",
    marginTop: "1%",
  },

  boat_servie_row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "7%",
  },

  Course_Program_Schedule_txt: {
    fontSize: "clamp(12px, 3.5vw, 36px)",
    fontWeight: "bold",
    textAlign: "left",
    color: "#424651",
    marginTop: "10%",
  },

  date_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "48%",
    padding: "2% 3%",
    border: "solid 0.5px rgba(66, 70, 81, 0.8)",
    borderRadius: "15px",
    marginTop: "2%",
  },

  days_weeks_txt: {
    fontSize: "clamp(12px, 3.5vw, 30px)",
    fontWeight: "400",
    color: "#424651",
    marginTop: "1.4%",
  },
  day_name: {
    fontSize: "clamp(10px, 2vw, 28px)",
    fontWeight: "400",
    textAlign: "left",
    color: "#424651",
  },
  from_to_txt: {
    fontSize: "clamp(10px, 2vw, 22px)",
    fontWeight: "lighter",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.5)",
  },

  Course_Program_Outline_point_txt: {
    fontSize: "clamp(10px, 2vw, 28px)",
    textAlign: "left",
    color: "#424651",
  },

  circular: {
    marginTop: "10px",
    borderRadius: "50%",
    width: "clamp(20px, 4vw, 50px)",
    height: "clamp(10px, 2vh, 20px)",
    backgroundColor: "#424651",
    marginRight: "3%",
  },

  Boat_details_txt: {
    fontSize: "clamp(12px, 3.5vw, 36px)",
    fontWeight: "bold",
    textAlign: "left",
    color: "#424651",
    marginTop: "1%",
  },

  boat_details_content_row: {
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
  },

  Boat_details_point_txt: {
    fontSize: "clamp(10px, 1.5vw, 26px)",
    fontWeight: "500",
    textAlign: "left",
    color: "#424651",
    width: "50%",
  },

  Boat_details_point_ans_txt: {
    fontSize: "clamp(10px, 1.5vw, 24px)",
    textAlign: "left",
    color: "#424651",
  },

  first_calendar: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    padding: "3%",
  },

  second_calendar: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    padding: "3%",
  },

  location_icon_img: {
    width: "20px",
    height: "30px",

    [theme.breakpoints.up("sm")]: {
      width: "23px",
      height: "35px",
    },
    [theme.breakpoints.up("md")]: {
      width: "23px",
      height: "45px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "33px",
      height: "55px",
    },
  },

  city_nameTxt: {
    fontSize: "clamp(10px, 1.5vw, 28px)",
    fontWeight: "500",
    textAlign: "left",
    color: "#424651",
  },

  address_Txt: {
    fontSize: "clamp(10px, 1.5vw, 22px)",
    textAlign: "left",
    color: "#424651",
  },

  show_review_count_and_star: {
    display: "none",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "5% 0",
  },

  Boat_details_and_services: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
    width: "100%",
  },

  show_width_half_or_full: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "5% 0",
  },

  unChecked_box: {
    border: "1px solid rgba(66, 70, 81, 0.4)",
    borderRadius: "1px",
    width: "22px",
    height: "22px",
  },

  checked_box: {
    color: "#424651",
    borderRadius: "1px",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    width: "clamp(12px, 15vw, 22px)",
    height: "clamp(12px, 10vh, 22px)",
    fontSize: "clamp(10px, 1.5vw, 28px)",
  },

  show_img: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    width: "80%",
  },

  show_boat_imgs_box: {
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `10px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
  },

  boat_imgs: {
    cursor: "pointer",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
      width: "150px",
      height: "123px",
    },
    [theme.breakpoints.up("md")]: {
      width: "200px",
      height: "173px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "225px",
      height: "197px",
    },
  },

  booking_box: {
    height: "auto",
    marginTop: "-5%",
    position: "relative",
    width: "35%",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.24)",
  },

  inside_booking_box: {
    borderRadius: 0,
    padding: "8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
    backgroundColor: `rgba(250, 250, 250, 1)`,
    height: "100%",
  },

  start_review_count_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  review_count_txt: {
    fontSize: "clamp(8px, 1vw, 18px)",
    color: "rgba(66, 70, 81, 0.87)",
  },

  label_txt: {
    fontSize: "clamp(14px, 1vw, 18px)",
    color: "rgba(66, 70, 81, 0.8)",
    margin: "5% 0",
  },

  price_values_txt: {
    fontSize: "clamp(14px, .5vw, 24px)",
    color: "rgba(66, 70, 81, 0.87)",
  },

  send_a_booking_req: {
    marginTop: "5%",
    borderRadius: "10px",
    border: "solid 1px #026b93",
    padding: "5% 10%",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: "#026b93", // Add a smooth transition for the background color
    "&:hover": {
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.24)",
      // Change the background color on hover
      "& $send_a_booking_req_txt": {
        fontWeight: "600",
      },
    },
  },
  send_a_booking_req_txt: {
    fontSize: "clamp(8px, 1vw, 20px)", // Adjust the range as needed
    fontWeight: "400",
    textAlign: "center",
    color: "white",
  },

  align_arrow_icon: {
    width: "5%",
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
  },

  right_arrow_style: {
    width: "clamp(10px, 5vw, 50px)", // Adjust the range as needed
    height: "clamp(10px, 5vh, 51px)", // Adjust the range as needed
  },

  send_a_booking_req_outer_box: { display: "none" },
  show_bottom_box_content: {
    display: "none",
  },

  showing_boat_list_card: {
    width: "100%",
    overflowX: "auto",
    margin: `0px 0px 0px 0px`,
    display: "flex",
    flexDirection: "row",
  },
  showing_boat_list_inner_div: {
    width: "95%",
    overflowX: "auto",
    margin: `0px 0px 0px 0px`,
    display: "flex",
    flexDirection: "row",
  [theme.breakpoints.down('767')]: {
    width: '100%'
  }
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
    form_container_box: {
      backgroundColor: "#f6f6f6",
      width: "100%",
      margin: "0",
      marginBottom: "25%",
    },

    second_calendar: {
      display: "none",
    },
    first_calendar: {
      width: "100%",
      padding: "0",
    },
    show_review_count_and_star: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "5% 0",
    },

    Boat_details_and_services: {
      display: "flex",
      flexDirection: "column",
      height: "auto",
      width: "100%",
    },

    show_width_half_or_full: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    show_bottom_box_content: {
      display: "flex",
      position: "fixed",
      bottom: 0,
      backgroundColor: "white",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: "5%",
      boxShadow: "4px 6px 12px rgba(96, 96, 96, 0.15)",
    },

    send_a_booking_req_outer_box: {
      cursor: "pointer",
      borderRadius: "0px",
      border: "solid 1px rgba(151, 151, 151, 1)",
      padding: "2.5% 10%",
      marginTop: "5%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "#026b93",
    },
    send_a_booking_req_txt_outer_box: {
      fontSize: "clamp(16px, 5vw, 20px)",
      fontWeight: "400",
      textAlign: "center",
      color: "white",
    },
    show_img: {
      width: "100%",
      justifyContent: "center",
    },
    boat_imgs: {
      backgroundColor: "whitesmoke",
      width: "clamp(108px, 25vw, 112.5px)",
      height: "clamp(72px, 20vh, 98px)",
      borderRadius: "5px",
    },
    booking_box: {
      display: "none",
    },
    showing_boat_list_card: {
      width: "100%",
      overflowX: "auto",
      margin: `0px 0px 100px 0px`,
      display: "flex",
      flexDirection: "row",
    },
    align_arrow_icon: {
      width: "5%",
      display: "none",
      alignSelf: "center",
      justifyContent: "center",
    },
  },
}));

