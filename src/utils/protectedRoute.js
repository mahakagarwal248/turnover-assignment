/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProtectedPage(Component) {
  const Wrapper = (props) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (!userData) {
        void router.push("/login"); // Redirect to login if user is not logged in
      } else {
        setUser(JSON.parse(userData));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // If user is not authenticated yet, don't render anything (or a loading indicator)
    if (!user) {
      return null;
    }

    // If user is authenticated, render the wrapped component
    return <Component {...props} />;
  };

  // Enhance the component display name for debugging and error handling
  Wrapper.displayName = `withAuth(${Component.displayName || Component.name || "Component"})`;

  return Wrapper;
}

export default ProtectedPage;
