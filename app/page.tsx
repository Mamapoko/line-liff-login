"use client";
import liff from "@line/liff";
import logout from "@line/liff/logout";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pictureUrl, setPictureUrl] = useState<string | undefined>("");
  const [idToken, setIdToken] = useState<string | null>("");
  const [displayName, setDisplayName] = useState<string | null>("");
  const [statusMessage, setStatusMessage] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | null>("");

  const initLine = () => {
    liff.init(
      { liffId: "2005966035-b9zm7eNm" },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken); // Update idToken state

    liff
      .getProfile()
      .then((profile) => {
        console.log(profile);
        // Update state with profile information
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        setUserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);
  return (
    <main>
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
          <h1>Line</h1>
          {/* {pictureUrl || "/placeholder.png"} */}
          {/* <img src="" > */}

          <Image
            src={pictureUrl || "/placeholder.png"}
            alt="Description of the image"
            width={300}
            height={300}
          />
          <p style={{ textAlign: "left", marginLeft: "20%" }}>
            <b>id token: </b> {idToken}
          </p>
          <p style={{ textAlign: "left", marginLeft: "20%" }}>
            <b>display name: </b> {displayName}
          </p>
          <p style={{ textAlign: "left", marginLeft: "20%" }}>
            <b>status message: </b> {statusMessage}
          </p>
          <p style={{ textAlign: "left", marginLeft: "20%" }}>
            <b>user id: </b> {userId}
          </p>
          <button onClick={() => new logout()}>Logout</button>
        </div>
      </div>
    </main>
  );
}
