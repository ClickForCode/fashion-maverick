const { Flex, Heading, Input, Button } = require("@chakra-ui/react");

import { useState } from "react";
import { onboardingSelectors, useOnboardingState } from "state";

const DashboardPageContainer = () => {
  const [name, setName] = useState("");
  const userStateName = useOnboardingState(
    onboardingSelectors.selectStateUserName
  );
  const updateUserStateName = useOnboardingState(
    onboardingSelectors.selectUpdateUserName
  );
  const handleClick = async () => {
    await updateUserStateName(name);
    console.log(userStateName);
    
  };
  return (
    <Flex
      gap="20px"
      direction="column"
      minH="97vh"
      justify="center"
      align="center"
    >
      <Heading>DashboardPageContainer {name}</Heading>
      <Input onChange={(e) => setName(e.target.value)} type="text" w="500px" />
      <Button variant="primary" onClick={() => handleClick()}>
        Submit
      </Button>
    </Flex>
  );
};
export default DashboardPageContainer;
