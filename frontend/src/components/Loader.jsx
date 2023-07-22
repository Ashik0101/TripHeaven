import React from "react";
import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
function Loader() {
  return (
    <div>
      <Box padding="2" boxShadow="lg" bg="white">
        <Skeleton borderRadius={"30px"} height="8rem" width="16.5rem" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="3" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="7" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="3" />
      </Box>
    </div>
  );
}

export default Loader;
