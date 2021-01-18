/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export function LoginButton() {
  const [login, setLogin] = useState(false);
  const handleLogin = useCallback(() => {
    setLogin(true);
  }, [login]);

  if (login) {
    const router = useRouter();
    router.push("/dashboard");
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0500FF",
        width: 126,
        height: 34,
        borderRadius: 36,
        fontFamily: "Poppins",
        color: "white",
        fontWeight: 600,
        cursor: "pointer",
      }}
      onClick={handleLogin}
    >
      LOGIN
    </div>
  );
}
