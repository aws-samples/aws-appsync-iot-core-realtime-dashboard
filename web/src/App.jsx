import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

import MapPage from "./MapPage";

import awsExports from "../amplify_outputs.json";

Amplify.configure(awsExports);

const App = () => {
  return <MapPage />;
};

export default withAuthenticator(App);
