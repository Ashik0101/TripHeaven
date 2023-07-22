import React from "react";
import { Box, Skeleton } from "@chakra-ui/react";
function HeaderLoader() {
  return (
    <div>
      <Box padding="2" boxShadow="lg" bg="white">
        <Skeleton
          margin="auto"
          borderRadius={"15px"}
          height="3rem"
          width="91%"
        />
      </Box>
    </div>
  );
}

export default HeaderLoader;
