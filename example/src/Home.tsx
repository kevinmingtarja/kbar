import * as React from "react";
import Widget from "../../src";

export default function Home() {
  return (
    <>
      <Widget apiKey={process.env.HYPERMODE_API_KEY || ""} endpoint={process.env.HYPERMODE_ENDPOINT || ""}  />
    </>
  );
}
