// import { Star, StarOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Star, StarOutline } from "@mui/icons-material";

export const StarRating = ({ rating }) => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const filledStars = Math.floor(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div style={{ width: "auto", height: "auto",whiteSpace: 'nowrap' }}>
      {[...Array(filledStars)].map((_, index) => (
        <Star
          key={`filled-${index}`}
          style={{ fill: "gold" }}
          className={class_name.star}
        />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <>
          <StarOutline
            key={`empty-${index}`}
            style={{
              fill: "gold",
            }}
            className={class_name.star}
          />
        </>
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  star: {
    width: "24px",
    height: "24px",
  },
  "@media (max-width: 768px)": {
    star: {
      width: "20px",
      height: "20px",
    },
  },
  "@media (max-width: 480px)": {
    star: {
      width: "17px",
      height: "17px",
    },
  },
}));
