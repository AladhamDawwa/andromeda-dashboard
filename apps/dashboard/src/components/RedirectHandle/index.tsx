import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthAPI } from "@/services";
import { Loader } from "@andromeda/core/components";

const RedirectHandle = ({
  route = "orders",
}: {
  route?: "orders" | "qr-codes" | "items" | "categories";
}) => {
  const navigate = useNavigate();
  const { getUser } = useAuthAPI();
  const { data: userDetails, isLoading, isError } = getUser(true);

  useEffect(() => {
    if (!isLoading && !isError && userDetails) {
      const { restaurantCode, branchCode } = userDetails;
      navigate(`/restaurant/${restaurantCode}/branch/${branchCode}/${route}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, userDetails]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error while Loading</div>;
  }

  return null;
};

export default RedirectHandle;
