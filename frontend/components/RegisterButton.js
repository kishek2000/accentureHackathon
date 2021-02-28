/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export function RegisterButton({ route }) {
  const [register, setRegister] = useState(false);
  const handleRegister = useCallback(() => {
    setRegister(true);
  }, [register]);

  if (register) {
    const router = useRouter();
    router.push(route);
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0500FF",
        width: 126,
        height: 34,
        borderRadius: 16,
        fontFamily: "Poppins",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
      }}
      onClick={handleRegister}
    >
      {route === "/dashboard" ? "REGISTER" : "NEXT"}
    </div>
  );
}
