import { useParams } from "react-router-dom";

export default function SingleUser() {
  const { id } = useParams();
  return (
    <div>
      THIS WILL DISPLAY A SINGLE USERS PROFILE, SIMILAR TO MY ACCOUNT BUT MAKE
      NEC. CHANGES
    </div>
  );
}
