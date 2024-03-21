import Category from "~/components/Category";
import Navbar from "~/components/Navbar";
import ProtectedPage from "~/utils/protectedRoute";

function Home() {
  return (
    <>
      <Navbar />
      <Category />
    </>
  );
}
export default ProtectedPage(Home);
